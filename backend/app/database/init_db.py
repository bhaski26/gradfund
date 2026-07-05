from app.database.session import engine, Base
from app.models import User, Expense

Base.metadata.create_all(bind=engine)