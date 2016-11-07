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

Trie.prototype.find = function(word, index) {

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

};

module.exports = Trie;
