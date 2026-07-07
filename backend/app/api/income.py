from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.income import Income
from app.schemas.income import (
    IncomeCreate,
    IncomeResponse,
    IncomeUpdate
)

router = APIRouter(
    prefix="/income",
    tags=["Income"]
)

@router.post("/", response_model=IncomeResponse)
def create_income(
    income: IncomeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    existing_income = (
    db.query(Income)
    .filter(
        Income.user_id == current_user.id,
        Income.source == income.source,
        Income.month == income.month,
        Income.year == income.year
    )
    .first()
)
    if existing_income:
        raise HTTPException(
        status_code=409,
        detail="Income already exists for this source and month."
    )

    new_income = Income(
    amount=income.amount,
    source=income.source,
    month=income.month,
    year=income.year,
    user_id=current_user.id
)

    db.add(new_income)
    db.commit()
    db.refresh(new_income)

    return new_income

@router.get(
    "/",
    response_model=list[IncomeResponse]
)
def get_income(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    incomes = (
        db.query(Income)
        .filter(
            Income.user_id == current_user.id
        )
        .all()
    )

    return incomes

@router.put(
    "/{income_id}",
    response_model=IncomeResponse
)
def update_income(
    income_id: int,
    income: IncomeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_income = (
    db.query(Income)
    .filter(
        Income.id == income_id,
        Income.user_id == current_user.id
    )
    .first()
)
    if not db_income:
        raise HTTPException(
        status_code=404,
        detail="Income not found"
    )

    existing_income = (
    db.query(Income)
    .filter(
        Income.user_id == current_user.id,
        Income.source == income.source,
        Income.month == income.month,
        Income.year == income.year,
        Income.id != income_id
    )
    .first()
)

    if existing_income:
        raise HTTPException(
            status_code=409,
            detail="Income already exists for this source and month."
        )

    db_income.amount = income.amount
    db_income.source = income.source
    db_income.month = income.month
    db_income.year = income.year

    db.commit()
    db.refresh(db_income)

    return db_income

@router.delete("/{income_id}")
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_income = (
    db.query(Income)
    .filter(
        Income.id == income_id,
        Income.user_id == current_user.id
    )
    .first()
)
    if not db_income:
        raise HTTPException(
        status_code=404,
        detail="Income not found"
    )

    db.delete(db_income)
    db.commit()

    return {
    "message": "Income deleted successfully"
}