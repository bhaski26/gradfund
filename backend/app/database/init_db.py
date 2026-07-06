from app.database.session import engine, Base
from app.models import User, Expense, Budget, Income

Base.metadata.create_all(bind=engine)