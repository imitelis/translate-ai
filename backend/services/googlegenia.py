import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')


class GoogleGenia:
    """
    GoogleGenia service class.
    """
    def __init__(self):
        self.translator = genai.configure(api_key=GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')

    def translate_text(self, text, target_language):
        """
        Translate a string to a target language.
        """
        try:
            response = self.model.generate_content('Translate the following text: "{0}" into the following language {1}.'
                                                   'Use the formal language and avoid using slang.'
                                                   .format(text, target_language))
        except Exception as e:
            return str(e)

        return response.text
