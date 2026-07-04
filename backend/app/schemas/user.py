from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True