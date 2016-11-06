'use strict';

const Trie = require('../../lib/trees/trie');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Trie', () => {
  let trie;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    trie = new Trie();
  });

  suite('Learn', () => {
    test('Learns a new word character by character', () => {
      trie.learn('be');
      const bChar = trie.characters.b;

      assert.isNotNull(bChar);
      assert.isNotNaN(bChar);
      assert.isDefined(bChar);
      assert.isNotOk(bChar.isWord);

      const eChar = bChar.characters.e;

      assert.isNotNaN(eChar);
      assert.isDefined(eChar);
      assert.isOk(eChar.isWord);
      assert.deepEqual(eChar.characters, {});
    });
  });
});
