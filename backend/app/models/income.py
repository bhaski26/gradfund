from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.session import Base


class Income(Base):
    __tablename__ = "incomes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    amount = Column(
        Float,
        nullable=False
    )

    source = Column(
        String(100),
        nullable=False
    )

    month = Column(
        String(20),
        nullable=False
    )

    year = Column(
        Integer,
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="incomes"
    )