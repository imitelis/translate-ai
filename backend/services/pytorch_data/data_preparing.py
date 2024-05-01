import torch
import numpy as np
from torch.utils.data import TensorDataset, DataLoader, RandomSampler

from settings import EOS_token, UNK_token, MAX_LENGTH, base_lang, target_lang, device
from data_filtering import prepareData

input_lang, output_lang, pairs = prepareData(base_lang, target_lang, True)
# print(random.choice(pairs))

# Preparing training data
def indexesFromSentence(lang, sentence):
    # return [lang.word2index[word] for word in sentence.split(' ')]
    # return 0
    # return [lang.word2index.get(word, UNK_token) for word in sentence.split(' ')]
    return [lang.word2index[word] for word in sentence.split(' ') if word in lang.word2index]

def tensorFromSentence(lang, sentence):
    indexes = indexesFromSentence(lang, sentence)
    indexes.append(EOS_token)
    return torch.tensor(indexes, dtype=torch.long, device=device).view(1, -1)

def tensorsFromPair(pair):
    input_tensor = tensorFromSentence(input_lang, pair[0])
    target_tensor = tensorFromSentence(output_lang, pair[1])
    return (input_tensor, target_tensor)

def get_dataloader(batch_size):
    n = len(pairs)
    input_ids = np.zeros((n, MAX_LENGTH), dtype=np.int32)
    target_ids = np.zeros((n, MAX_LENGTH), dtype=np.int32)

    for idx, (inp, tgt) in enumerate(pairs):
        inp_ids = indexesFromSentence(input_lang, inp)
        tgt_ids = indexesFromSentence(output_lang, tgt)
        inp_ids.append(EOS_token)
        tgt_ids.append(EOS_token)
        input_ids[idx, :len(inp_ids)] = inp_ids
        target_ids[idx, :len(tgt_ids)] = tgt_ids

    train_data = TensorDataset(torch.LongTensor(input_ids).to(device),
                               torch.LongTensor(target_ids).to(device))

    train_sampler = RandomSampler(train_data)
    train_dataloader = DataLoader(train_data, sampler=train_sampler, batch_size=batch_size)
    return input_lang, output_lang, train_dataloader