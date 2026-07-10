from fastapi import FastAPI
from app.database.init_db import *
from app.api.user import router as user_router
from app.api.auth import router as auth_router
from app.api.expenses import router as expense_router
from app.api.budget import router as budget_router
from app.api.income import router as income_router
from app.api.dashboard import router as dashboard_router
from app.api.insights import router as insights_router
from app.api.analytics import router as analytics_router
from app.api.ai import router as ai_router

app = FastAPI(
    title="GradFund API",
    version="1.0.0"
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(expense_router)
app.include_router(budget_router)
app.include_router(income_router)
app.include_router(dashboard_router)
app.include_router(insights_router)
app.include_router(analytics_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to GradFund 🚀"
    }