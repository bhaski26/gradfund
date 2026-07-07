from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.expense import Expense
from app.models.income import Income
from app.models.budget import Budget

from app.schemas.insights import (
    Insight,
    InsightsResponse
)

router = APIRouter(
    prefix="/insights",
    tags=["Insights"]
)

@router.get(
    "/",
    response_model=InsightsResponse
)
def get_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
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

    if total_income > 0:
        savings_rate = (
            (
                total_income - total_expenses
            )
            / total_income
        ) * 100
    else:
        savings_rate = 0

    insights = []

    if savings_rate >= 80:
        insights.append(
            Insight(
                type="success",
                title="Excellent Savings",
                description=(
                    f"You saved "
                    f"{round(savings_rate, 2)}% "
                    f"of your income this month."
                )
            )
        )

        return InsightsResponse(
    insights=insights
)




