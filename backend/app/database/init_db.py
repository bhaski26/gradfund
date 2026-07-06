from app.database.session import engine, Base
from app.models import User, Expense, Budget

Base.metadata.create_all(bind=engine)