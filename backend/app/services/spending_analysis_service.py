from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.expense import Expense

def get_highest_spending_category(
    db: Session,
    user_id: int,
):
    category_summary = (
    db.query(
        Expense.category,
        func.sum(
            Expense.amount
        ).label("total")
    )
    .filter(
        Expense.user_id == user_id
    )
    .group_by(
        Expense.category
    )
    .all()
)

    if not category_summary:
        return None, 0

    highest_category = max(
    category_summary,
    key=lambda item: item.total
)

    total_expenses = sum(
    item.total
    for item in category_summary
)

    category_percentage = (
    highest_category.total
    / total_expenses
) * 100

    return (
    highest_category,
    category_percentage,
)