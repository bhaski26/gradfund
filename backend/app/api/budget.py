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
from app.schemas.dashboard import DashboardResponse
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

@router.get("/", response_model=BudgetResponse)
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

    return db_budget