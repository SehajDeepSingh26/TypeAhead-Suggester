import nltk
from nltk.corpus import words
import os

# Download the corpus (do this only once)
nltk.download('words')

def generate_vocab_words(letter):
    # Get all words from the NLTK corpus
    all_words = set(word.lower() for word in words.words())

    # Filter words starting with the given letter
    filtered = sorted([word for word in all_words if word.startswith(letter.lower()) and word.isalpha()])

    # Limit to desired count
    final_words = filtered

    # Save to a file
    filename = f"{letter}_words_vocab.txt"
    with open(filename, "w") as f:
        f.write("\n".join(final_words))

    print(f"✅ Saved {len(final_words)} words starting with '{letter}' to: {os.path.abspath(filename)}")

# Example usage

for i in range(26):
    letter = chr(ord('a') + i)  # Converts 0 → 'a', 1 → 'b', ..., 25 → 'z'
    generate_vocab_words(letter)
