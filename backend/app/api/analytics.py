from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.income import Income
from app.models.expense import Expense

from app.schemas.analytics import (
    MonthlySummaryResponse
)

from app.services.analytics_service import (
    generate_monthly_summary
)

from app.schemas.analytics import (
    MonthlySummaryResponse,
    CategoryBreakdownResponse
)

from app.services.analytics_service import (
    generate_monthly_summary,
    generate_category_breakdown
)

from app.schemas.analytics import (
    MonthlySummaryResponse,
    CategoryBreakdownResponse,
    MonthlyTrendsResponse
)

from app.services.analytics_service import (
    generate_monthly_summary,
    generate_category_breakdown,
    generate_monthly_trends
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get(
    "/monthly-summary",
    response_model=MonthlySummaryResponse
)
def get_monthly_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

        month = datetime.now().strftime(
        "%B %Y"
    )

        return generate_monthly_summary(
        month,
        total_income,
        total_expenses
    )


@router.get(
    "/category-breakdown",
    response_model=CategoryBreakdownResponse
)
def get_category_breakdown(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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

        if total_expenses == 0:
            return CategoryBreakdownResponse(
            categories=[]
        )

        return generate_category_breakdown(
        category_summary,
        total_expenses
    )

@router.get(
    "/monthly-trends",
    response_model=MonthlyTrendsResponse
)
def get_monthly_trends(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

    label = datetime.now().strftime(
    "%B %Y"
)

    return generate_monthly_trends(
    label,
    total_income,
    total_expenses
)



        