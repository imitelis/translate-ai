import torch
SOS_token = 0
EOS_token = 1
MAX_LENGTH = 10

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("cuda or cudan't:", torch.cuda.is_available())