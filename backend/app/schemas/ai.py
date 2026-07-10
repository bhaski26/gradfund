from pydantic import BaseModel


class AIQuestion(BaseModel):
    question: str


class AIResponse(BaseModel):
    answer: str

class FinancialContext(BaseModel):
    total_income: float
    total_expenses: float
    total_savings: float
    savings_rate: float
    health_score: int
    budget_status: str