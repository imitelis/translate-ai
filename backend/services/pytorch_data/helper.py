import time
import math

def asMinutes(s):
    m = math.floor(s / 60)
    s -= m * 60
    return '%dm %ds' % (m, s)

def timeSince(since, percent):
    now = time.time()
    s = now - since
    es = s / (percent)
    rs = es - s
    return '%s (- %s)' % (asMinutes(s), asMinutes(rs))

def find_indexes_of_value(arr, value):
    return [i for i, x in enumerate(arr) if x == value]

def save_words_at_indexes(sentence, indexes):
    words = sentence.split()
    selected_words = [words[i] for i in indexes if i < len(words)]
    return selected_words

def insert_words(sentence, words, indexes):
    for word, idx in zip(words, indexes):
        sentence.insert(idx, word)
    return sentence