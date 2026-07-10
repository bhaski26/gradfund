from app.schemas.ai import (FinancialContext)


def generate_financial_advice(
    context: FinancialContext,
) -> str:

    if context.budget_status == "Over Budget":
        return (
            "You have exceeded your monthly budget. "
            "Review your highest spending categories "
            "and reduce discretionary expenses."
        )

    if context.health_score >= 90:
        return (
            "Excellent financial discipline! "
            "You are saving a large percentage of your income "
            "while staying comfortably within budget."
        )

    if context.health_score >= 75:
        return (
            "Your financial health is good. "
            "Continue tracking your expenses and maintain "
            "your current savings habit."
        )

    if context.health_score >= 50:
        return (
            "Your spending is increasing. "
            "Monitor your budget closely and identify "
            "areas where you can reduce expenses."
        )

    return (
        "Your financial health needs attention. "
        "Focus on reducing expenses and increasing "
        "your monthly savings."
    )