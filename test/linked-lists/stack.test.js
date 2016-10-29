'use strict';

const Stack = require('../../lib/linked-lists/stack');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Stack', () => {
  let stack;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    stack = new Stack();
  });

  test('Stack initializes as empty', () => {
    assert.strictEqual(stack.size(), 0);
    assert.isUndefined(stack.pop());
    assert.isUndefined(stack.peek());
  });

  test('Can push and pop a single item', () => {
    stack.push('I\'m an item');
    assert.strictEqual(stack.size(), 1);
    assert.strictEqual(stack.peek(), 'I\'m an item');
    assert.strictEqual(stack.pop(), 'I\'m an item');
    assert.isUndefined(stack.pop());
    assert.isUndefined(stack.peek());
    assert.strictEqual(stack.size(), 0);
  });

  test('Can push and pop mulitple items', () => {
    stack.push('Item 1');
    assert.strictEqual(stack.peek(), 'Item 1');
    stack.push('Item 2');
    assert.strictEqual(stack.peek(), 'Item 2');
    stack.push('Item 3');
    assert.strictEqual(stack.peek(), 'Item 3');

    assert.strictEqual(stack.size(), 3);

    assert.strictEqual(stack.pop(), 'Item 3');
    assert.strictEqual(stack.peek(), 'Item 2');
    assert.strictEqual(stack.pop(), 'Item 2');
    assert.strictEqual(stack.peek(), 'Item 1');
    assert.strictEqual(stack.pop(), 'Item 1');

    assert.isUndefined(stack.pop());
    assert.isUndefined(stack.peek());
    assert.strictEqual(stack.size(), 0);
  });
});
