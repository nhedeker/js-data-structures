'use strict';

const Trie = function() {
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index = 0) {
  if (index === word.length) {
    this.isWord = true;
  }
  else if (index < word.length) {
    const char = word[index];
    const subTrie = this.characters[char] || new Trie();

    subTrie.learn(word, index + 1);
    this.characters[char] = subTrie;
  }

  return this;
};

Trie.prototype.find = function(word, index = 0) {
  const char = word[index];

  if (index < word.length - 1 && this.characters[char]) {
    index += 1;

    return this.characters[char].find(word, index);
  }

  // eslint-disable-next-line no-else-return
  else {
    return this.characters[char];
  }
};

Trie.prototype.getWords = function(words = [], currentWord = '') {
  if (this.isWord) {
    words.push(currentWord);
  }

  for (const char in this.characters) {
    const nextWord = currentWord + char;

    this.characters[char].getWords(words, nextWord);
  }

  return words;
};

Trie.prototype.autoComplete = function(prefix) {
  const subTrie = this.find(prefix);

  if (subTrie) {
    return subTrie.getWords([], prefix);
  }

  // eslint-disable-next-line no-else-return
  else {
    return [];
  }
};

module.exports = Trie;
