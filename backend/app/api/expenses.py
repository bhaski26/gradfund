from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.expense import Expense
from app.schemas.expense import (
    ExpenseCreate,
    ExpenseResponse,
    ExpenseUpdate
)

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

@router.get("/category-summary")
def get_category_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    summary = (
        db.query(
            Expense.category,
            func.sum(
                Expense.amount
            ).label("total")
        )
        .filter(
            Expense.user_id == current_user.id
        )
        .group_by(
            Expense.category
        )
        .all()
    )

    return [
        {
            "category": item.category,
            "total": item.total
        }
        for item in summary
    ]

# ------------------------------------------------------------------
# Deprecated:
# Financial health is now calculated by the Dashboard API
# (GET /dashboard) because it combines Budget, Income and Expenses.
# ------------------------------------------------------------------

@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    db_expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == current_user.id
        )
        .first()
    )

    if not db_expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db_expense.title = expense.title
    db_expense.amount = expense.amount
    db_expense.category = expense.category
    db_expense.expense_date = expense.expense_date

    db.commit()
    db.refresh(db_expense)

    return {
    "id": db_expense.id,
    "title": db_expense.title,
    "amount": db_expense.amount,
    "category": db_expense.category,
    "expense_date": db_expense.expense_date
}