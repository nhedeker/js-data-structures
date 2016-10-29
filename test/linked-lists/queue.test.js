'use strict';

const Queue = require('../../lib/linked-lists/queue');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Queue', () => {
  let queue;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    queue = new Queue();
  });

  test('Queue initializes as empty', () => {
    assert.strictEqual(queue.size(), 0);
    assert.isUndefined(queue.dequeue);
  });

  test('Can enqueue and dequeue a single item', () => {
    queue.enqueue('I\'m an item');
    assert.strictEqual(queue.size(), 1);
    assert.strictEqual(queue.dequeue(), 'I\'m an item');
    assert.isUndefined(queue.dequeue());
    assert.strictEqual(queue.size(), 0);
  });

  test('Can enqueue and dequeue mulitple items', () => {
    queue.enqueue('Item 1');
    queue.enqueue('Item 2');
    queue.enqueue('Item 3');

    assert.strictEqual(queue.size(), 3);

    assert.strictEqual(queue.dequeue(), 'Item 1');
    assert.strictEqual(queue.dequeue(), 'Item 2');
    assert.strictEqual(queue.dequeue(), 'Item 3');

    assert.isUndefined(queue.dequeue);
    assert.strictEqual(queue.size(), 0);
  });
});
