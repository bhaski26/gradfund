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

    db_budget = (
    db.query(Budget)
    .filter(
        Budget.user_id == current_user.id
    )
    .first()
)

    if db_budget:
        usage_percentage = (
        total_expenses
        / db_budget.monthly_limit
    ) * 100
    else:
        usage_percentage = 0

    if db_budget:
        insights.append(
            Insight(
                type="info",
                title="Budget Usage",
                description=(
                    f"You have used "
                    f"{round(usage_percentage, 2)}% "
                    f"of your monthly budget."
                )
            )
    )

    if db_budget and db_budget.monthly_limit > 0:
        usage_percentage = (
        total_expenses
        / db_budget.monthly_limit
    ) * 100
    else:
        usage_percentage = 0

    category_summary = (
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

    if category_summary:
        highest_category = max(
            category_summary,
            key=lambda item: item.total
        )

    category_percentage = (
        highest_category.total
        / total_expenses
    ) * 100

    insights.append(
        Insight(
            type="spending",
            title="Highest Spending Category",
            description=(
                f"{highest_category.category.title()} "
                f"accounts for "
                f"{round(category_percentage, 2)}% "
                f"of your total expenses."
            )
        )
    )  

    potential_saving = highest_category.total * 0.10

    insights.append(
    Insight(
        type="recommendation",
        title="Savings Opportunity",
        description=(
            f"Reducing "
            f"{highest_category.category.title()} "
            f"expenses by 10% could save "
            f"approximately ₹{round(potential_saving, 2)} "
            f"this month."
        )
    )
)

    if savings_rate >= 80 and usage_percentage <= 50:
        insights.append(
        Insight(
        type="achievement",
        title="Financial Discipline",
        description=(
            "Congratulations! You maintained excellent "
            "savings and stayed well within your monthly "
            "budget this month."
        )
    )
) 

    return InsightsResponse(
    insights=insights
)




