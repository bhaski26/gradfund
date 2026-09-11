from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.session import Base


class Budget(Base):
    __tablename__ = "budgets"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "month",
            "year",
            name="uq_budget_user_month_year",
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    monthly_limit = Column(
        Float,
        nullable=False,
    )

    month = Column(
        String(20),
        nullable=False,
    )

    year = Column(
        Integer,
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    user = relationship(
        "User",
        back_populates="budget",
    )