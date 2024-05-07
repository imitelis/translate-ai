import os
import re
import json
from fuzzywuzzy import fuzz

CURRENT_PATH = os.getcwd()

def translate(input_sentence, source_lang, target_lang):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(current_dir, f"json-data/{source_lang}-{target_lang}.json")
    # Load the JSON dictionary
    with open(json_path) as json_file:
        translations = json.load(json_file)

    # Preprocess translations
    for key, value in translations.items():
        if isinstance(value, str):
            # Remove unnecessary information using regular expressions
            value = re.sub(
                r";?\s*([A-Z][a-z]+(?: [a-z]+)*)\s+(?:singular|plural)?\s+(?:definite|indefinite)?\s+(?:article|noun|verb)?(?: \w+)*;",
                "",
                value,
            )
            translations[key] = re.sub(r"\s*\([^)]*\)", "", value)

    # Lowercase the input sentence
    input_sentence = input_sentence.lower()

    # Tokenize the input sentence
    input_tokens = input_sentence.split()

    # Thershold tolerance
    MIN_THRESHOLD = 65

    # Function to find the most similar word in the dictionary
    def find_similar_word(word):
        best_score = -1
        best_match = None
        for key in translations.keys():
            score = fuzz.ratio(word, key)
            if score > best_score and score >= MIN_THRESHOLD:
                best_score = score
                best_match = key
        return best_match

    # Translate each word in the input sentence
    translated_tokens = []
    for word in input_tokens:
        translation = translations.get(word)
        if translation is None:
            similar_word = find_similar_word(word)
            if similar_word is not None:
                translation = translations.get(similar_word)
            else:
                translation = word
        if translation is None:
            translation = word
        translated_tokens.append(translation)

    # Join the translated tokens back into a sentence
    translated_sentence = " ".join(translated_tokens)

    # Remove "{f}" and "{m}" along with the preceding whitespace
    translated_sentence = re.sub(r"\s*{[fm]}\s*", " ", translated_sentence)

    # Remove extra leading and trailing spaces and spaces within words
    translated_sentence = re.sub(r"\s+", " ", translated_sentence).strip()

    return translated_sentence