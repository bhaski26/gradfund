from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.budget import Budget
from app.schemas.budget import BudgetCreate, BudgetResponse


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
            Budget.user_id == current_user.id,
            Budget.month == budget.month,
            Budget.year == budget.year,
        )
        .first()
    )

    if existing_budget:
        raise HTTPException(
            status_code=400,
            detail="Budget already exists for this month and year"
        )

    new_budget = Budget(
        monthly_limit=budget.monthly_limit,
        month=budget.month,
        year=budget.year,
        user_id=current_user.id,
    )

    db.add(new_budget)

    try:
        db.commit()
        db.refresh(new_budget)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Budget already exists for this month and year"
        )

    return new_budget


@router.get("/", response_model=list[BudgetResponse])
def get_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budgets = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id
        )
        .order_by(
            Budget.year.desc(),
            Budget.id.desc()
        )
        .all()
    )

    return budgets


@router.put("/{budget_id}", response_model=BudgetResponse)
def update_budget(
    budget_id: int,
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_budget = (
        db.query(Budget)
        .filter(
            Budget.id == budget_id,
            Budget.user_id == current_user.id,
        )
        .first()
    )

    if not db_budget:
        raise HTTPException(
            status_code=404,
            detail="Budget not found"
        )

    duplicate_budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id,
            Budget.month == budget.month,
            Budget.year == budget.year,
            Budget.id != budget_id,
        )
        .first()
    )

    if duplicate_budget:
        raise HTTPException(
            status_code=400,
            detail="Budget already exists for this month and year"
        )

    db_budget.monthly_limit = budget.monthly_limit
    db_budget.month = budget.month
    db_budget.year = budget.year

    try:
        db.commit()
        db.refresh(db_budget)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Budget already exists for this month and year"
        )

    return db_budget


@router.delete("/{budget_id}")
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_budget = (
        db.query(Budget)
        .filter(
            Budget.id == budget_id,
            Budget.user_id == current_user.id,
        )
        .first()
    )

    if not db_budget:
        raise HTTPException(
            status_code=404,
            detail="Budget not found"
        )

    db.delete(db_budget)
    db.commit()

    return {
        "message": "Budget deleted successfully"
    }