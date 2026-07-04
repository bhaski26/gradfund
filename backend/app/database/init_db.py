from app.database.session import engine, Base
from app.models import User

Base.metadata.create_all(bind=engine)