from pydantic import BaseModel
from datetime import date
from app.constants.expense_categories import (
    ExpenseCategory
)


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: ExpenseCategory
    expense_date: date


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: ExpenseCategory
    expense_date: date

    class Config:
        from_attributes = True


class ExpenseUpdate(BaseModel):
    title: str
    amount: float
    category: ExpenseCategory
    expense_date: date