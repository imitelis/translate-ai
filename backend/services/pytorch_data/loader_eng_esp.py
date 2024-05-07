import os
import re
import torch
from .encoder_rnn import EncoderRNN
from .attndecoder_rnn import AttnDecoderRNN

from .data_preparing import get_dataloader
from .data_evaluator import evaluate

from .settings import hidden_size, batch_size, device, base_lang, target_lang


# Current total dir with os
current_dir = os.path.dirname(os.path.abspath(__file__))

# For eng-to-esp translator

# Initialize input language, output language and data loader
output_lang, input_lang, train_dataloader = get_dataloader(batch_size)

# Encoder and decoder saved paths
encoder_path = os.path.join(current_dir, f"./models/{base_lang}-to-{target_lang}-encoder.pth")
decoder_path = os.path.join(current_dir, f"./models/{base_lang}-to-{target_lang}-decoder.pth")

# Initialize new encoder and decoder instances
encoder = EncoderRNN(output_lang.n_words, hidden_size).to(device)
decoder = AttnDecoderRNN(hidden_size, input_lang.n_words).to(device)

# Load the saved state dictionaries into the models
encoder.load_state_dict(torch.load(encoder_path))
decoder.load_state_dict(torch.load(decoder_path))

# Set models to evaluation mode
encoder.eval()
decoder.eval()

def translate(input_sentence):
    # Remove unneccesary whitespaces from the sentence
    input_sentence = re.sub(r'\s+', ' ', input_sentence).strip()

    # Define punctuation marks to split the sentence
    punctuation_marks = [';', ',', '.', ':']
    
    # Split the input sentence into chunks based on punctuation marks
    chunks = [input_sentence.lower()]
    for mark in punctuation_marks:
        new_chunks = []
        for chunk in chunks:
            new_chunks.extend(chunk.split(mark))
        chunks = new_chunks

    # Translate each chunk separately
    translated_chunks = []
    for chunk in chunks:
        output_words, attentions = evaluate(encoder, decoder, chunk, input_lang, output_lang)
        translated_chunks.append(' '.join(output_words))

    # Reconstruct the translated sentence while preserving punctuation marks
    translated_sentence = ''
    for i, chunk in enumerate(chunks):
        translated_sentence += translated_chunks[i]
        if i < len(chunks) - 1:
            translated_sentence += input_sentence[len(chunk)] + ' '

    # output_words, attentions = evaluate(encoder, decoder, input_sentence, input_lang, output_lang)
    # return ' '.join(output_words)
    
    final_sentence = translated_sentence.replace("SOS", "")
    final_sentence = re.sub(r'\s+', ' ', final_sentence).strip()
    return final_sentence