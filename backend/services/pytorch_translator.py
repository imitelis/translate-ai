from .pytorch_data.loader_eng_esp import translate as translate_eng_esp
from .pytorch_data.loader_eng_esp import translate as translate_esp_eng

# print(translate_eng_esp("hello there my name is David"))
# print(translate_esp_eng("el caballo se alza sobre el mar"))

def translate(input_sentence, source_lang, target_lang):
    if source_lang == 'en' and target_lang == 'es':
        return translate_eng_esp(input_sentence)
    elif source_lang == 'es' and target_lang == 'en':
        return translate_esp_eng(input_sentence)