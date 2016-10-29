'use strict';

const DoublyLinkedList = require('../../lib/linked-lists/doubly_linked_list');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Doubly Linked List', () => {
  let list;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  suite('Push', () => {
    test('Properly updates the length', () => {
      assert.strictEqual(list.length, 0);

      list.push(9);
      assert.strictEqual(list.length, 1);

      list.push(5);
      assert.strictEqual(list.length, 2);
    });

    test('Properly updates the head', () => {
      list.push(5);
      assert.strictEqual(list.head.val, 5);
      assert.isNull(list.head.next);
      assert.isNull(list.head.prev);

      list.push(3);
      assert.strictEqual(list.head.val, 5);
      assert.strictEqual(list.head.next.val, 3);
      assert.isNull(list.head.prev);

      list.push(9);
      assert.strictEqual(list.head.val, 5);
      assert.strictEqual(list.head.next.val, 3);
      assert.isNull(list.head.prev);
    });

    test('Properly updates the tail', () => {
      list.push(7);
      assert.strictEqual(list.tail.val, 7);
      assert.isNull(list.tail.next);
      assert.isNull(list.tail.prev);

      list.push(1);
      assert.strictEqual(list.tail.val, 1);
      assert.isNull(list.tail.next);
      assert.strictEqual(list.tail.prev.val, 7);

      list.push(45);
      assert.strictEqual(list.tail.val, 45);
      assert.isNull(list.tail.next);
      assert.strictEqual(list.tail.prev.val, 1);
    });

    test('Returns self so chaining works', () => {
      assert.strictEqual(list.length, 0);
      list.push(1).push(2);
      assert.strictEqual(list.length, 2);
    });
  });
});
