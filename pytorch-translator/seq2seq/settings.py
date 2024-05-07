import torch
SOS_token = 0
EOS_token = 1
UNK_token = 2
MAX_LENGTH = 30

hidden_size = 128
batch_size = 32

base_lang, target_lang = 'eng', 'esp'
# 'esp', 'eng' # 'eng', 'esp'

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("is cuda available? :", torch.cuda.is_available())