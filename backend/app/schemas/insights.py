from pydantic import BaseModel


class Insight(BaseModel):
    type: str
    title: str
    description: str


class InsightsResponse(BaseModel):
    insights: list[Insight]