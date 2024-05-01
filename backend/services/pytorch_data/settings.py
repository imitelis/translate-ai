import torch
SOS_token = 0
EOS_token = 1
UNK_token = -1
MAX_LENGTH = 30

hidden_size = 256
batch_size = 64

base_lang, target_lang = 'esp', 'eng' # 'eng', 'esp'

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# print("is cuda available? :", torch.cuda.is_available())