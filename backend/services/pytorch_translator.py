import os
import re
import torch
from pytorch_data.encoder_rnn import EncoderRNN
from pytorch_data.attndecoder_rnn import AttnDecoderRNN

from pytorch_data.data_preparing import get_dataloader
from pytorch_data.data_evaluator import evaluate

from pytorch_data.settings import hidden_size, batch_size, device

base_lang, target_lang = 'esp', 'eng'

# Current folder 
current_dir = os.path.dirname(os.path.abspath(__file__))

# Encoder and decoder saved paths
esp_to_eng_encoder_path = os.path.join(current_dir, f"pytorch_data/{base_lang}-to-{target_lang}-encoder.pth")
esp_to_eng_decoder_path = os.path.join(current_dir, f"pytorch_data/{base_lang}-to-{target_lang}-decoder.pth")

# Initialize input language, output language and data loader
input_lang, output_lang, train_dataloader = get_dataloader(batch_size)

# Initialize new encoder and decoder instances
esp_to_eng_encoder = EncoderRNN(input_lang.n_words, hidden_size).to(device)
esp_to_eng_decoder = AttnDecoderRNN(hidden_size, output_lang.n_words).to(device)

# Load the saved state dictionaries into the models
esp_to_eng_encoder.load_state_dict(torch.load(esp_to_eng_encoder_path))
esp_to_eng_decoder.load_state_dict(torch.load(esp_to_eng_decoder_path))

# Set models to evaluation mode
esp_to_eng_encoder.eval()
esp_to_eng_decoder.eval()

def translate(input_sentence):
    # Remove unneccesary whitespaces from the sentence
    input_sentence = re.sub(r'\s+', ' ', input_sentence).strip()

    # Define punctuation marks to split the sentence
    punctuation_marks = [';', ',', '.', ':']
    
    # Split the input sentence into chunks based on punctuation marks
    chunks = [input_sentence]
    for mark in punctuation_marks:
        new_chunks = []
        for chunk in chunks:
            new_chunks.extend(chunk.split(mark))
        chunks = new_chunks
    
    # Translate each chunk separately
    translated_chunks = []
    for chunk in chunks:
        output_words, attentions = evaluate(esp_to_eng_encoder, esp_to_eng_decoder, chunk.strip(), input_lang, output_lang)
        translated_chunks.append(' '.join(output_words))
    
    # Reconstruct the translated sentence while preserving punctuation marks
    translated_sentence = ''
    for i, chunk in enumerate(chunks):
        translated_sentence += translated_chunks[i]
        if i < len(chunks) - 1:
            translated_sentence += input_sentence[len(chunk)]
    
    return translated_sentence

print(translate("si suspendes este examen, tendrás que repetir curso."))