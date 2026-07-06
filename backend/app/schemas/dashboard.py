from pydantic import BaseModel


class DashboardResponse(BaseModel):
    monthly_limit: float

    total_income: float

    total_expenses: float

    remaining_budget: float

    net_savings: float

    savings_rate: float

    usage_percentage: float

    health_score: int

    financial_status: str
    
    budget_status: str

    message: str