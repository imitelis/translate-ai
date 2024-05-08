import os

import deepl
from dotenv import load_dotenv

load_dotenv()
DEEPL_API_KEY = os.getenv('DEEPL_API_KEY')


class Deeplia:
    """
    Deeplia service class.
    """

    def __init__(self):
        self.translator = deepl.Translator(DEEPL_API_KEY)

    def translate_text(self, text, source_language, target_language):
        """
        Translate a string to a target language.
        """
        try:
            response = self.translator.translate_text(text, source_lang=source_language, target_lang=target_language)
            return response.text

        except Exception as e:
            return "An error occurred. Please try again."


def get_languages(self):
    """
    Get a list of supported languages.
    """
    try:
        source_languages = [language.name for language in self.translator.get_source_languages()]
        target_languages = [language.name for language in self.translator.get_target_languages()]
    except Exception as e:
        return str(e)

    return {"source_languages": source_languages, "target_languages": target_languages}
