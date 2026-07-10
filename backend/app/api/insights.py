from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.expense import Expense
from app.models.income import Income
from app.models.budget import Budget

from app.schemas.insights import (
    InsightsResponse
)

from app.services.insights_service import (
    generate_savings_insight,
    generate_budget_usage_insight,
    generate_spending_insight,
    generate_recommendation_insight,
    generate_achievement_insight
)

from app.services.spending_analysis_service import (
    get_highest_spending_category,
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
    current_user: User = Depends(get_current_user)
):

    # ----------------------------
    # Income
    # ----------------------------

    total_income = (
        db.query(func.sum(Income.amount))
        .filter(Income.user_id == current_user.id)
        .scalar()
    )

    if total_income is None:
        total_income = 0

    # ----------------------------
    # Expenses
    # ----------------------------

    total_expenses = (
        db.query(func.sum(Expense.amount))
        .filter(Expense.user_id == current_user.id)
        .scalar()
    )

    if total_expenses is None:
        total_expenses = 0

    # ----------------------------
    # Savings Rate
    # ----------------------------

    if total_income > 0:
        savings_rate = (
            (total_income - total_expenses)
            / total_income
        ) * 100
    else:
        savings_rate = 0

    insights = []

    # ----------------------------
    # Savings Insight
    # ----------------------------

    insight = generate_savings_insight(
        savings_rate
    )

    if insight:
        insights.append(insight)

    # ----------------------------
    # Budget
    # ----------------------------

    db_budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id
        )
        .first()
    )

    if db_budget and db_budget.monthly_limit > 0:

        usage_percentage = (
            total_expenses
            / db_budget.monthly_limit
        ) * 100

        insight = generate_budget_usage_insight(
            usage_percentage
        )

        if insight:
            insights.append(insight)

    else:
        usage_percentage = 0

    # ----------------------------
    # Highest Spending Category
    # ----------------------------

    highest_category, category_percentage = (
    get_highest_spending_category(
        db,
        current_user.id,
    )
)

    insight = generate_spending_insight(
    highest_category,
    category_percentage
)

    if insight:
        insights.append(insight)

        # ----------------------------
        # Recommendation
        # ----------------------------

    insight = generate_recommendation_insight(
    highest_category
)

    if insight:
        insights.append(insight)

        # ----------------------------
        # Achievement
        # ----------------------------

    insight = generate_achievement_insight(
    savings_rate,
    usage_percentage
    )

    if insight:
        insights.append(insight)

    return InsightsResponse(
        insights=insights
    )