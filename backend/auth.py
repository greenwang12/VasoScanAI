from fastapi import APIRouter
from pydantic import BaseModel

from database import SessionLocal
from models import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class RegisterRequest(BaseModel):
    email: str
    password: str

    age: int
    gender: str

    height: float
    weight: float

    smoking: str
    activity: str

    conditions: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(data: RegisterRequest):

    db = SessionLocal()

    try:

        existing = (
            db.query(User)
            .filter(User.email == data.email)
            .first()
        )

        if existing:
            return {
                "success": False,
                "message": "Email already exists"
            }

        user = User(
            email=data.email,
            password=data.password,

            age=data.age,
            gender=data.gender,

            height=data.height,
            weight=data.weight,

            smoking=data.smoking,
            activity=data.activity,

            conditions=data.conditions
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "success": True,
            "user_id": user.id,
            "message": "Account created successfully"
        }

    finally:
        db.close()


@router.post("/login")
def login(data: LoginRequest):

    db = SessionLocal()

    try:

        user = (
            db.query(User)
            .filter(User.email == data.email)
            .first()
        )

        if not user:
            return {
                "success": False,
                "message": "User not found"
            }

        if user.password != data.password:
            return {
                "success": False,
                "message": "Invalid password"
            }

        return {
            "success": True,
            "user_id": user.id,
            "email": user.email,

            "age": user.age,
            "gender": user.gender,

            "height": user.height,
            "weight": user.weight,

            "smoking": user.smoking,
            "activity": user.activity,

            "conditions": user.conditions,

            "message": "Login successful"
        }

    finally:
        db.close()