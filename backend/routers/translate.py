# routers/users.py
from fastapi import APIRouter, HTTPException, Depends, Response, status

# models, bases
# from typing import List
# from models import User
# from bases import UserBase, UserResponse, EditUserBase, EditUserPasswordBase

# EditUserActiveBase, EditPasswordBase, 

router = APIRouter()


# Basic POST user
@router.post("/translate")
async def translate_text():
    """
        print(user.national_id)

    db_user = await User.filter(national_id=user.national_id).first()

    if db_user:
        raise HTTPException(status_code=409, detail="National Id already exists")
    
    new_user = User(national_id=user.national_id, full_name=user.full_name, email=user.email)
    await new_user.set_password(user.password)
    await new_user.save()
    """
    
    return {"translate": "text"}