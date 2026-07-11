from app.schemas.ai import FinancialContext

def build_financial_prompt(
    question: str,
    context: FinancialContext,
) -> str:
    
    system_prompt = """
    You are GradFund AI,
    a professional financial coach.

    Your role is to provide
    clear,
    friendly,
    motivational,
    and practical financial advice.

    Always use ONLY the financial
    information provided below.

    Never invent numbers.

    Keep responses concise,
    accurate,
    and encouraging.
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

    user_prompt = f"""
    User Question:

    {question}
    """

    prompt = (
    system_prompt
    + "\n"
    + financial_context
    + "\n"
    + user_prompt
)

    return prompt