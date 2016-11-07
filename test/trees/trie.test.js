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

      assert.isOk(bChar);

      const eChar = bChar.characters.e;

      assert.isOk(eChar);
      assert.deepEqual(eChar.characters, {});
    });

    test('Learns an extension of a word', () => {
      trie.learn('be');
      trie.learn('begin');
      const eChar = trie.characters.b.characters.e;

      assert.isTrue(eChar.isWord);

      const nChar = eChar.characters.g.characters.i.characters.n;

      assert.isOk(nChar);
    });

    test('Learns a prefix of a word', () => {
      trie.learn('begin');
      trie.learn('be');
      const eChar = trie.characters.b.characters.e;

      assert.isTrue(eChar.isWord);

      const nChar = eChar.characters.g.characters.i.characters.n;

      assert.isTrue(nChar.isWord);
    });
  });

  suite('Find', () => {
    test('Returns undefined for a nonexistent string', () => {
      assert.isUndefined(trie.find('nope'));
    });

    test('Returns the correct character given a single character', () => {
      trie.learn('begin');
      assert.deepEqual(trie.find('b'), trie.characters.b);
    });

    test('Returns the last node for a given word', () => {
      trie.learn('begin');
      trie.learn('began');
      const expected = trie.characters.b.characters.e.characters.g;

      assert.deepEqual(trie.find('beg'), expected);
    });
  });

  suite('Get Words', () => {
    test('Returns an empty array if no words in trie', () => {
      assert.deepEqual(trie.getWords(), []);
    });

    test('When one word in trie returns the correct word', () => {
      trie.learn('begin');
      assert.deepEqual(trie.getWords(), ['begin']);
    });

    test('When multiple words in trie returns all words properly', () => {
      trie.learn('begin');
      trie.learn('start');
      assert.deepEqual(trie.getWords(), ['begin', 'start']);

      trie.learn('began');
      assert.deepEqual(trie.getWords(), ['begin', 'start', 'began']);

      trie.learn('beginner');
      assert.deepEqual(trie.getWords(),
        ['begin', 'start', 'began', 'beginner']);
    });
  });

  suite('Auto Complete', () => {
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      trie.learn('be');
      trie.learn('began');
      trie.learn('begin');
      trie.learn('beginner');
    });

    test('Returns an empty array when no completetions', () => {
      assert.deepEqual(trie.autoComplete('a'), []);
    });

    test('Returns a completetion for a whole word', () => {
      assert.deepEqual(trie.autoComplete('began'), ['began']);
      assert.deepEqual(trie.autoComplete('beginner'), ['beginner']);
    });

    test('Returns a single completetion for a prefix', () => {
      assert.deepEqual(trie.autoComplete('bega'), ['began']);
      assert.deepEqual(trie.autoComplete('beginner'), ['beginn']);
    });

    test('Returns many completetions for a prefix', () => {
      assert.deepEqual(trie.autoComplete('be'),
        ['be', 'began', 'begin', 'beginner']);
      assert.deepEqual(trie.autoComplete('beg'),
        ['began', 'begin', 'beginner']);
    });
  });
});
