from pydantic import BaseModel


class BudgetDashboard(BaseModel):
    monthly_limit: float
    spent: float
    remaining: float
    usage_percentage: float
    status: str
    message: str