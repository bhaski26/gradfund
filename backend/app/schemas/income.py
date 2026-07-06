from datetime import datetime
from pydantic import BaseModel, Field


class IncomeCreate(BaseModel):
    amount: float = Field(gt=0)
    source: str
    month: str
    year: int


class IncomeUpdate(BaseModel):
    amount: float = Field(gt=0)
    source: str
    month: str
    year: int


class IncomeResponse(BaseModel):
    id: int
    amount: float
    source: str
    month: str
    year: int
    created_at: datetime

    class Config:
        from_attributes = True