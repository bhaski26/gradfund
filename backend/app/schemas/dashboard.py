from pydantic import BaseModel


class BudgetDashboard(BaseModel):
    monthly_limit: float

    total_income: float

    total_expenses: float

    remaining_budget: float

    net_savings: float

    savings_rate: float

    usage_percentage: float

    status: str

    message: str