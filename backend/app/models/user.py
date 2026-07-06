from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)
from sqlalchemy.sql import func
from app.database.session import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    expenses = relationship(
    "Expense",
    back_populates="user",
    cascade="all, delete-orphan"
)

    budget = relationship(
    "Budget",
    back_populates="user",
    uselist=False,
    cascade="all, delete-orphan"
)

    incomes = relationship(
    "Income",
    back_populates="user",
    cascade="all, delete-orphan"
)