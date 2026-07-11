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

from app.services.financial_context_service import (
    build_financial_context,
)

from app.services.spending_analysis_service import (
    get_highest_spending_category,
)

from app.services.spending_analysis_service import (
    get_highest_spending_category,
)

from app.services.prompt_builder import (
    build_financial_prompt,
)

from app.services.llm_service import (
    generate_ai_response,
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
        context = build_financial_context(
        db,
        current_user.id,
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

    context = build_financial_context(
    db,
    current_user.id,
)
    highest_category, category_percentage = (
    get_highest_spending_category(
        db,
        current_user.id,
    )
)

#    answer = answer_question(
#        request.question,
#        context,
#        highest_category,
#        category_percentage,
#    )

    prompt = build_financial_prompt(
    request.question,
    context,
)

    answer = generate_ai_response(
    prompt
)

    return AIResponse(
    answer=answer
)

    return AIResponse(
        answer=answer
    )