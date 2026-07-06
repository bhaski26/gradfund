from pydantic import BaseModel, Field


class BudgetCreate(BaseModel):
    monthly_limit: float = Field(gt=0)
    month: str
    year: int


class BudgetResponse(BaseModel):
    id: int
    monthly_limit: float
    month: str
    year: int

    class Config:
        from_attributes = True