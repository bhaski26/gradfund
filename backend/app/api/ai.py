from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.income import Income
from app.models.expense import Expense
from app.models.budget import Budget

from app.schemas.ai import (
    AIQuestion,
    AIResponse,
    FinancialContext
)

from app.services.ai_service import (
    generate_financial_advice,
    answer_question
)

from app.services.financial_metrics_service import (
    calculate_total_savings,
    calculate_savings_rate,
    calculate_budget_usage
)

router = APIRouter(
    prefix="/ai",
    tags=["AI Coach"]
)

@router.get(
    "/advice",
    response_model=AIResponse
)
def get_financial_advice(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
        total_income = (
        db.query(
            func.sum(Income.amount)
        )
        .filter(
            Income.user_id == current_user.id
        )
        .scalar()
    ) or 0

        total_expenses = (
        db.query(
            func.sum(Expense.amount)
        )
        .filter(
            Expense.user_id == current_user.id
        )
        .scalar()
    ) or 0

        budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id
        )
        .first()
    )

        total_savings = calculate_total_savings(
        total_income,
        total_expenses
    )

        savings_rate = calculate_savings_rate(
        total_income,
        total_expenses
    )

        if budget:
            budget_usage = calculate_budget_usage(
            budget.monthly_limit,
            total_expenses
        )
        else:
            budget_usage = 0

        if budget_usage <= 50:
            health_score = 95

        elif budget_usage <= 80:
            health_score = 80

        elif budget_usage <= 100:
            health_score = 60

        else:
            health_score = 30

        if budget_usage < 80:
            budget_status = "Within Budget"

        elif budget_usage <= 100:
            budget_status = "Warning"

        else:
            budget_status = "Over Budget"

        context = FinancialContext(
        total_income=total_income,
        total_expenses=total_expenses,
        total_savings=total_savings,
        savings_rate=savings_rate,
        health_score=health_score,
        budget_status=budget_status
    )

        advice = generate_financial_advice(
        context
    )

        return AIResponse(
        answer=advice
    )


@router.post(
    "/chat",
    response_model=AIResponse
)
def chat(
    request: AIQuestion,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    total_income = (
    db.query(
        func.sum(Income.amount)
    )
    .filter(
        Income.user_id == current_user.id
    )
    .scalar()
) or 0

    total_expenses = (
    db.query(
        func.sum(Expense.amount)
    )
    .filter(
        Expense.user_id == current_user.id
    )
    .scalar()
) or 0

    budget = (
    db.query(Budget)
    .filter(
        Budget.user_id == current_user.id
    )
    .first()
)

    total_savings = calculate_total_savings(
    total_income,
    total_expenses
)

    savings_rate = calculate_savings_rate(
    total_income,
    total_expenses
)

    if budget:
        budget_usage = calculate_budget_usage(
        budget.monthly_limit,
        total_expenses
    )
    else:
        budget_usage = 0

    if budget_usage <= 50:
        health_score = 95

    elif budget_usage <= 80:
        health_score = 80

    elif budget_usage <= 100:
        health_score = 60

    else:
        health_score = 30

    if budget_usage < 80:
        budget_status = "Within Budget"

    elif budget_usage <= 100:
        budget_status = "Warning"

    else:
        budget_status = "Over Budget"

    context = FinancialContext(
    total_income=total_income,
    total_expenses=total_expenses,
    total_savings=total_savings,
    savings_rate=savings_rate,
    health_score=health_score,
    budget_status=budget_status
)

    answer = answer_question(
    request.question,
    context
)

    return AIResponse(
    answer=answer
)