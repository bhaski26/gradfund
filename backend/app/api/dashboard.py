from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.budget import Budget
from app.models.expense import Expense
from app.models.income import Income

from app.schemas.dashboard import BudgetDashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/", response_model=BudgetDashboard)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id
        )
        .first()
    )

    if not db_budget:
        raise HTTPException(
            status_code=404,
            detail="Budget not found"
        )

    total_expenses = (
        db.query(
            func.sum(Expense.amount)
        )
        .filter(
            Expense.user_id == current_user.id
        )
        .scalar()
    )

    if total_expenses is None:
        total_expenses = 0

    total_income = (
        db.query(
            func.sum(Income.amount)
        )
        .filter(
            Income.user_id == current_user.id
        )
        .scalar()
    )

    if total_income is None:
        total_income = 0

    remaining_budget = (
        db_budget.monthly_limit
        - total_expenses
    )

    net_savings = (
        total_income
        - total_expenses
    )

    usage_percentage = (
        total_expenses
        / db_budget.monthly_limit
    ) * 100

    if total_income > 0:
        savings_rate = (
            net_savings
            / total_income
        ) * 100
    else:
        savings_rate = 0

    if usage_percentage < 80:
        status = "Within Budget"
        message = (
            f"Excellent! You have used only "
            f"{round(usage_percentage, 2)}% "
            f"of your monthly budget."
        )

    elif usage_percentage <= 100:
        status = "Warning"
        message = (
            f"You have already used "
            f"{round(usage_percentage, 2)}% "
            f"of your budget. Spend carefully."
        )

    else:
        status = "Over Budget"
        message = (
            f"You have exceeded your budget "
            f"by ₹{abs(remaining_budget):.2f}."
        )

    return BudgetDashboard(
        monthly_limit=db_budget.monthly_limit,
        total_income=total_income,
        total_expenses=total_expenses,
        remaining_budget=remaining_budget,
        net_savings=net_savings,
        savings_rate=round(savings_rate, 2),
        usage_percentage=round(usage_percentage, 2),
        status=status,
        message=message
    )