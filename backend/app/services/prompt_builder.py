from app.schemas.ai import FinancialContext
from app.services.chat_memory_service import (
    get_history,
)

def build_financial_prompt(
    question,
    context,
    highest_category,
    category_percentage,
):

    history = get_history()

    conversation = ""

    for message in history:

        conversation += (
            f"{message['role'].title()}: "
            f"{message['content']}\n"
        )
    
    system_prompt = """
    You are GradFund AI,
    an experienced personal financial coach.

    Your responsibility is to help users
    understand their finances.

    Do not simply list the financial numbers.

    Instead:

    • Explain what the numbers mean.
    • Mention strengths.
    • Mention weaknesses.
    • Suggest improvements.
    • Be conversational.
    • Be concise.
    • Use the financial insights provided.
    • Never invent financial information.
    • If information is unavailable,
    say so honestly.
    """

    financial_context = f"""
    User Financial Summary

    Income:
    ₹{context.total_income}

    Expenses:
    ₹{context.total_expenses}

    Savings:
    ₹{context.total_savings}

    Savings Rate:
    {round(context.savings_rate,2)}%

    Health Score:
    {context.health_score}

    Budget Status:
    {context.budget_status}
    """

    insights = f"""
    Financial Insights

    Highest Spending Category:
    {highest_category.category.title()}

    Highest Spending Percentage:
    {round(category_percentage,2)}%

    Budget Usage:
    {round((context.total_expenses / context.total_income) * 100,2) if context.total_income else 0}%

    Savings Recommendation:
    Reducing your highest spending category by 10%
    could save additional money every month.

    Achievement:
    Excellent Financial Discipline
    """

    user_prompt = f"""
    Conversation History

    {conversation}

    Current Question:

    {question}
    """

    prompt = (
    system_prompt
    + "\n"
    + financial_context
    + "\n"
    + insights
    + "\n"
    + user_prompt
)

    return prompt