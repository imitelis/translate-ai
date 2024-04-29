# routers/users.py
from fastapi import APIRouter, Response
import re
from backend.services import Deeplia
from backend.services import GoogleGenia
# models, basesx
# from typing import List
# from models import User
# from bases import UserBase, UserResponse, EditUserBase, EditUserPasswordBase

# EditUserActiveBase, EditPasswordBase,

router = APIRouter()
deepl_service = Deeplia()
google_service = GoogleGenia()
# Basic POST user
@router.get("/translate/deepl")
async def translate_text_deepl(text: str, sl: str = 'es', tl: str = 'en-us'):
    """
    Translate text from one language to another
    """
    response = deepl_service.translate_text(text, source_language=sl, target_language=tl)
    return response
@router.get("/translate/geminia")
async def translate_text_geminia(text: str, tl: str = 'en-us'):
    """
    Translate text from one language to another
    """
    response = google_service.translate_text(text, target_language=tl)
    cleaned_response = re.sub(r'[\\"]', '', response)
    return cleaned_response