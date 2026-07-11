from app.schemas.ai import FinancialContext
from app.services.prompt_builder import (
    build_financial_prompt,
)

context = FinancialContext(
    total_income=60000,
    total_expenses=630,
    total_savings=59370,
    savings_rate=98.95,
    health_score=95,
    budget_status="Within Budget",
)

prompt = build_financial_prompt(
    "How am I doing financially?",
    context,
)

print(prompt)