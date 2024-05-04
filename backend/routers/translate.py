from fastapi import APIRouter
import re
from services import Deeplia
from services import GoogleGenia
from services.json_translator import translate
from services import extract_score
from typing import List
from pydantic import BaseModel

router = APIRouter()
deepl_service = Deeplia()
google_service = GoogleGenia()


class TranslationsText(BaseModel):
    translations: List[str]


class Params(BaseModel):
    text: str
    sl: str
    tl: str

# Basic POST translates
@router.post("/translate/json")
async def translate_text_json(text: str, sl: str = 'es', tl: str = 'en'):
    """
    Translate text from one language to another
    """
    response = translate(input_sentence=text, source_lang=sl, target_lang=tl)
    return response

@router.post("/translate/deepl")
async def translate_text_deepl(params: Params):
    """
    Translate text from one language to another
    """
    text = params.text
    sl = params.sl
    tl = params.tl
    response = deepl_service.translate_text(text, source_language=sl, target_language=tl)
    return response

@router.post("/translate/geminia")
async def translate_text_geminia(params: Params):
    """
    Translate text from one language to another
    """
    text = params.text
    tl = params.tl
    response = google_service.translate_text(text, target_language=tl)
    cleaned_response = re.sub(r'[\\"]', '', response)
    return cleaned_response

# Basic POST sentiment analysis
@router.post("/sentiment")
async def sentiment(translations: TranslationsText):
    """
    Extract sentiment score from text
    """
    translations_history = translations.dict()['translations']
    return extract_score(translations_history)