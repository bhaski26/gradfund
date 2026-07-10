from app.schemas.ai import (FinancialContext)
from app.schemas.ai import Intent


def detect_intent(
    question: str
) -> Intent:

    question = question.lower()

    if any(
        word in question
        for word in [
            "health",
            "healthy",
            "score"
        ]
    ):
        return Intent.HEALTH

    if any(
        word in question
        for word in [
            "save",
            "saving",
            "savings"
        ]
    ):
        return Intent.SAVINGS

    if any(
        word in question
        for word in [
            "budget",
            "limit",
            "overspend"
        ]
    ):
        return Intent.BUDGET

    if any(
        word in question
        for word in [
            "expense",
            "expenses",
            "spend",
            "spending",
            "spent",
            "category",
            "food"
        ]
    ):
        return Intent.SPENDING

    return Intent.GENERAL

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

def answer_question(
    question: str,
    context: FinancialContext
) -> str:

    intent = detect_intent(question)

    if intent == Intent.HEALTH:
        if context.health_score >= 90:
            return (
            f"Your financial health score is "
            f"{context.health_score}. "
            "Excellent financial discipline!"
    )

        elif context.health_score >= 75:
            return (
            f"Your financial health score is "
            f"{context.health_score}. "
            "Your financial health is good."
    )

        else:
            return (
            f"Your financial health score is "
            f"{context.health_score}. "
            "There is room for improvement."
    )

    elif intent == Intent.SAVINGS:
        return (
        f"You have saved "
        f"{context.savings_rate}% "
        f"of your income "
        f"({context.total_savings:.2f}) "
        "this month."
)

    elif intent == Intent.BUDGET:
        return (
        f"Your current budget status is "
        f"{context.budget_status}. "
        "Keep monitoring your spending."
)

    elif intent == Intent.SPENDING:
        return (
        "Your highest spending category "
        "can be viewed in the Analytics section. "
        "We'll soon provide personalized "
        "category recommendations here."
)

    return generate_financial_advice(
    context
)