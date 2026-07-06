from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.budget import Budget
from app.schemas.budget import (
    BudgetCreate,
    BudgetResponse
)
from app.schemas.dashboard import BudgetDashboard
from app.models.expense import Expense
from sqlalchemy import func

router = APIRouter(
    prefix="/budget",
    tags=["Budget"]
)

@router.post("/", response_model=BudgetResponse)
def create_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id
        )
        .first()
    )

    if existing_budget:
        raise HTTPException(
            status_code=400,
            detail="Budget already exists"
        )

    new_budget = Budget(
    monthly_limit=budget.monthly_limit,
    month=budget.month,
    year=budget.year,
    user_id=current_user.id
)

    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)
    
    return new_budget

@router.get("/", response_model=BudgetDashboard)
def get_budget(
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

    total_spent = (
    db.query(
        func.sum(Expense.amount)
    )
    .filter(
        Expense.user_id == current_user.id
    )
    .scalar()
)

    if total_spent is None:
        total_spent = 0

    remaining = (
    db_budget.monthly_limit
    - total_spent
)

    usage_percentage = (
    total_spent
    / db_budget.monthly_limit
) * 100

    if usage_percentage < 80:
        status = "Within Budget"
        message = (
            f"Excellent! You have used only "
            f"{round(usage_percentage,2)}% "
            f"of your monthly budget."
        )

    elif usage_percentage <= 100:
        status = "Warning"
        message = (
            f"You have already used "
            f"{round(usage_percentage,2)}% "
            f"of your budget. Spend carefully."
        )

    else:
        status = "Over Budget"
        message = (
            f"You have exceeded your budget "
            f"by ₹{abs(remaining):.2f}."
        )


    return BudgetDashboard(
    monthly_limit=db_budget.monthly_limit,
    spent=total_spent,
    remaining=remaining,
    usage_percentage=round(
        usage_percentage,
        2
    ),
    status=status,
    message=message
)