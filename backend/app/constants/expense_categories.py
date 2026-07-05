from enum import Enum


class ExpenseCategory(str, Enum):
    FOOD = "FOOD"
    TRANSPORT = "TRANSPORT"
    EDUCATION = "EDUCATION"
    SHOPPING = "SHOPPING"
    ENTERTAINMENT = "ENTERTAINMENT"
    HEALTH = "HEALTH"
    BILLS = "BILLS"
    OTHER = "OTHER"