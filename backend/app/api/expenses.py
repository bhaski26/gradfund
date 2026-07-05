from sqlalchemy import func
from app.schemas.expense import (
    ExpenseCreate,
    ExpenseResponse
)
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.post("/")
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        expense_date=expense.expense_date,
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {
        "id": new_expense.id,
        "title": new_expense.title,
        "amount": new_expense.amount,
        "category": new_expense.category,
        "expense_date": new_expense.expense_date
    }

@router.get(
    "/",
    response_model=list[ExpenseResponse]
)
def get_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id
        )
        .all()
    )

    return expenses

@router.get("/summary")
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    total_expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id
        )
        .count()
    )

    total_amount = (
        db.query(
            func.sum(Expense.amount)
        )
        .filter(
            Expense.user_id == current_user.id
        )
        .scalar()
    )

    if total_amount is None:
        total_amount = 0

    return {
        "total_expenses": total_expenses,
        "total_amount": total_amount
    }