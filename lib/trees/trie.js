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

Trie.prototype.getWords = function(words, currentWord) {

};

Trie.prototype.autoComplete = function(prefix) {

};

module.exports = Trie;
