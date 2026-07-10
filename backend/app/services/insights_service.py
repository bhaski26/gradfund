from app.schemas.insights import Insight

# ----------------------------
# Savings Insight
# ----------------------------

def generate_savings_insight(
    savings_rate: float,
):
    if savings_rate >= 80:
        return Insight(
            type="success",
            title="Excellent Savings",
            description=(
                f"You saved "
                f"{round(savings_rate, 2)}% "
                f"of your income this month."
            )
        )

    return None

# ----------------------------
# Budget
# ----------------------------

def generate_budget_usage_insight(
    usage_percentage: float,
):
    return Insight(
        type="info",
        title="Budget Usage",
        description=(
            f"You have used "
            f"{round(usage_percentage, 2)}% "
            f"of your monthly budget."
        )
    )

# ----------------------------
# Highest Spending Category
# ----------------------------

def generate_spending_insight(
    highest_category,
    category_percentage: float
):
    return Insight(
        type="spending",
        title="Highest Spending Category",
        description=(
            f"{highest_category.category.title()} "
            f"accounts for "
            f"{round(category_percentage, 2)}% "
            f"of your total expenses."
        )
    )


# ----------------------------
# Recommendation
# ----------------------------

def generate_recommendation_insight(
    highest_category
):
    potential_saving = (
        highest_category.total * 0.10
    )

    return Insight(
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

# ----------------------------
# Achievement
# ----------------------------

def generate_achievement_insight(
    savings_rate: float,
    usage_percentage: float
):
    if (
        savings_rate >= 80
        and usage_percentage <= 50
    ):
        return Insight(
            type="achievement",
            title="Financial Discipline",
            description=(
                "Congratulations! You maintained "
                "excellent savings and stayed well "
                "within your monthly budget this month."
            )
        )

    return None

def generate_spending_summary(
    highest_category,
    category_percentage: float,
) -> str:

    return (
        f"Your highest spending category is "
        f"{highest_category.category.title()}, "
        f"accounting for "
        f"{round(category_percentage, 2)}% "
        f"of your total expenses."
    )

def generate_savings_recommendation(
    highest_category,
) -> str:

    potential_saving = (
        highest_category.total * 0.10
    )

    return (
        f"Reducing "
        f"{highest_category.category.title()} "
        f"expenses by 10% could save "
        f"approximately "
        f"₹{round(potential_saving, 2)} "
        f"this month."
    )