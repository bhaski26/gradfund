from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.budget import Budget
from app.models.expense import Expense
from app.models.income import Income

from app.schemas.dashboard import DashboardResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/", response_model=DashboardResponse)
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

    if usage_percentage <= 50:
        health_score = 95

    elif usage_percentage <= 80:
        health_score = 80

    elif usage_percentage <= 100:
        health_score = 60

    else:
        health_score = 30

    if health_score >= 90:
        financial_status = "Excellent"

    elif health_score >= 75:
        financial_status = "Good"

    elif health_score >= 50:
        financial_status = "Warning"

    else:
        financial_status = "Critical"

    if total_income > 0:
        savings_rate = (
            net_savings
            / total_income
        ) * 100
    else:
        savings_rate = 0

    if usage_percentage < 80:
        budget_status = "Within Budget"
        message = (
            f"{financial_status} financial health. "
            f"You have used only {round(usage_percentage, 2)}% of your monthly budget."
    )

    elif usage_percentage <= 100:
        budget_status = "Near Budget Limit"
        message = (
            f"{financial_status} financial health. "
            f"You have already used {round(usage_percentage, 2)}% of your monthly budget."
    )

    else:
        budget_status = "Over Budget"
        message = (
            f"{financial_status} financial health. "
            f"You have exceeded your monthly budget by ₹{abs(remaining_budget):.2f}."
    )

    return DashboardResponse(
        monthly_limit=db_budget.monthly_limit,
        total_income=total_income,
        total_expenses=total_expenses,
        remaining_budget=remaining_budget,
        net_savings=net_savings,
        savings_rate=round(savings_rate, 2),
        usage_percentage=round(usage_percentage, 2),
        health_score=health_score,
        financial_status=financial_status,
        budget_status=budget_status,
        message=message
)