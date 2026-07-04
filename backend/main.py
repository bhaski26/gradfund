from fastapi import FastAPI
from app.database.init_db import *
from app.api.user import router as user_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="GradFund API",
    version="1.0.0"
)

app.include_router(user_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to GradFund 🚀"
    }