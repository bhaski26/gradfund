def calculate_total_savings(
    total_income: float,
    total_expenses: float,
) -> float:
    return total_income - total_expenses


def calculate_savings_rate(
    total_income: float,
    total_expenses: float,
) -> float:

    if total_income <= 0:
        return 0

    total_savings = (
        total_income
        - total_expenses
    )

    return round(
        (
            total_savings
            / total_income
        ) * 100,
        2
    )

def calculate_budget_usage(
    monthly_limit: float,
    total_expenses: float,
) -> float:

    if monthly_limit <= 0:
        return 0

    return round(
        (
            total_expenses
            / monthly_limit
        ) * 100,
        2
    )