def insert_words(sentence, words, indexes):
    for word, idx in zip(words, indexes):
        sentence.insert(idx, word)
    return sentence

# Example usage:
existing_sentence = ["The", "quick", "brown", "fox"]
new_words = ["lazy", "dog"]
insert_indexes = [1, 3]
modified_sentence = insert_words(existing_sentence, new_words, insert_indexes)
print(modified_sentence)
