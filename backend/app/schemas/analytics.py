from pydantic import BaseModel


class MonthlySummaryResponse(BaseModel):
    month: str
    total_income: float
    total_expenses: float
    total_savings: float
    savings_rate: float

class CategoryBreakdown(BaseModel):
    category: str
    amount: float
    percentage: float

class CategoryBreakdownResponse(BaseModel):
    categories: list[CategoryBreakdown]

class TrendPoint(BaseModel):
    label: str
    income: float
    expenses: float
    savings: float


class MonthlyTrendsResponse(BaseModel):
    months: list[TrendPoint]