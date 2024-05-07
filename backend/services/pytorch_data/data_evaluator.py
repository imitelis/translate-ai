import torch
import random

from .settings import SOS_token, EOS_token, UNK_token
from .data_preparing import tensorFromSentence
from .helper import find_indexes_of_value, save_words_at_indexes, insert_words

# Data evaluation
def evaluate(encoder, decoder, sentence, input_lang, output_lang):
    with torch.no_grad():
        input_tensor = tensorFromSentence(input_lang, sentence)
        encoder_outputs, encoder_hidden = encoder(input_tensor)
        decoder_outputs, decoder_hidden, decoder_attn = decoder(encoder_outputs, encoder_hidden)

        word_indexes = find_indexes_of_value(input_tensor[0], UNK_token)
        selected_words = save_words_at_indexes(sentence, word_indexes)
        
        _, topi = decoder_outputs.topk(1)
        decoded_ids = topi.squeeze()

        decoded_words = []
        for idx in decoded_ids:
            if idx.item() == SOS_token:
                decoded_words.append(' ')
            if idx.item() == UNK_token:
                decoded_words.append('UNK')
            if idx.item() == EOS_token:
                # decoded_words.append('<EOS>')
                break
            decoded_words.append(output_lang.index2word[idx.item()])
        final_decoded = insert_words(decoded_words, selected_words, word_indexes)
    return final_decoded, decoder_attn