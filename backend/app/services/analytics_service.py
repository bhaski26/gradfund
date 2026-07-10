from app.schemas.analytics import (MonthlySummaryResponse)
from app.schemas.analytics import (CategoryBreakdown,CategoryBreakdownResponse)
from app.services.financial_metrics_service import (calculate_total_savings,calculate_savings_rate)
from app.schemas.analytics import (TrendPoint,MonthlyTrendsResponse)


def generate_monthly_summary(
    month: str,
    total_income: float,
    total_expenses: float,
):
    total_savings = calculate_total_savings(
    total_income,
    total_expenses
)

    savings_rate = calculate_savings_rate(
    total_income,
    total_expenses
)
    
    return MonthlySummaryResponse(
        month=month,
        total_income=total_income,
        total_expenses=total_expenses,
        total_savings=total_savings,
        savings_rate=round(
            savings_rate,
            2
        )
    )

def generate_category_breakdown(
    category_summary,
    total_expenses: float
):
    categories = []

    for item in category_summary:

        percentage = (
            item.total
            / total_expenses
        ) * 100

        categories.append(
            CategoryBreakdown(
                category=item.category.title(),
                amount=item.total,
                percentage=round(
                    percentage,
                    2
                )
            )
        )

    return CategoryBreakdownResponse(
        categories=categories
    )

def generate_monthly_trends(
    label: str,
    total_income: float,
    total_expenses: float
):
    savings = calculate_total_savings(
        total_income,
        total_expenses
    )

    return MonthlyTrendsResponse(
        months=[
            TrendPoint(
                label=label,
                income=total_income,
                expenses=total_expenses,
                savings=savings
            )
        ]
    )