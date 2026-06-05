from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):

    return {
        "success": True,
        "user_id": 1,
        "email": data.email,
        "message": "Login successful"
    }