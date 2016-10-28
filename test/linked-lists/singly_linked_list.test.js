'use strict';

const SinglyLinkedList = require('../../lib/linked-lists/singly_linked_list');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Singly Linked List', () => {
  let list;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  suite('Push', () => {
    test('Properly updates the length', () => {
      list.push(4);
      assert.strictEqual(list.length, 1);

      list.push(6);
      assert.strictEqual(list.length, 2);

      list.push(-1);
      assert.strictEqual(list.length, 3);
    });

    test('Properly updates the head', () => {
      list.push(5);
      assert.strictEqual(list.head.val, 5);
      assert.isNull(list.head.next);

      list.push(3);
      assert.strictEqual(list.head.val, 5);
      assert.strictEqual(list.head.next.val, 3);

      list.push(9);
      assert.strictEqual(list.head.val, 5);
      assert.strictEqual(list.head.next.val, 3);
    });

    test('Properly updates the tail', () => {
      list.push(7);
      assert.strictEqual(list.tail.val, 7);
      assert.isNull(list.tail.next);

      list.push(1);
      assert.strictEqual(list.tail.val, 1);
      assert.isNull(list.tail.next);

      list.push(45);
      assert.strictEqual(list.tail.val, 45);
      assert.isNull(list.tail.next);
    });

    test('Returns self so chaining works', () => {
      assert.strictEqual(list.length, 0);
      list.push(1).push(2);
      assert.strictEqual(list.length, 2);
    });
  });

  suite('Pop', () => {
    test('Returns undefined when called on an empty list', () => {
      assert.isUndefined(list.pop());
    });

    test('Returns the value at the end of the list', () => {
      list.push(5).push(6).push(7).push(8);
      assert.strictEqual(list.pop(), 8);
      assert.strictEqual(list.pop(), 7);
      assert.strictEqual(list.pop(), 6);
      assert.strictEqual(list.pop(), 5);
      assert.isUndefined(list.pop());
    });

    test('Properly updates the length', () => {
      list.push(5).push(6).push(7).push(8);

      list.pop();
      assert.strictEqual(list.length, 3);

      list.pop();
      assert.strictEqual(list.length, 2);

      list.pop();
      assert.strictEqual(list.length, 1);

      list.pop();
      assert.strictEqual(list.length, 0);

      list.pop();
      assert.strictEqual(list.length, 0);
    });

    test('Properly updates the tail', () => {
      list.push(5).push(6).push(7).push(8);

      list.pop();
      assert.strictEqual(list.tail.val, 7);

      list.pop();
      assert.strictEqual(list.tail.val, 6);

      list.pop();
      assert.strictEqual(list.tail.val, 5);

      list.pop();
      assert.isNull(list.tail);
    });

    test('Properly updates the head', () => {
      list.push(1).push(2);
      assert.strictEqual(list.head.val, 1);

      list.pop();
      assert.strictEqual(list.head.val, 1);

      list.pop();
      assert.isNull(list.head);
    });
  });

  suite('Unshift', () => {
    test('Properly updates the length', () => {
      assert.strictEqual(list.length, 0);

      list.unshift(5);
      assert.strictEqual(list.length, 1);

      list.unshift(8);
      assert.strictEqual(list.length, 2);

      list.unshift(2);
      assert.strictEqual(list.length, 3);
    });

    test('Properly updates the head', () => {
      list.unshift(6);
      assert.strictEqual(list.head.val, 6);
      assert.isNull(list.head.next);

      list.unshift(1);
      assert.strictEqual(list.head.val, 1);
      assert.strictEqual(list.head.next.val, 6);

      list.unshift(9);
      assert.strictEqual(list.head.val, 9);
      assert.strictEqual(list.head.next.val, 1);
    });

    test('Properly updates the tail', () => {
      list.unshift(4);
      assert.strictEqual(list.tail.val, 4);
      assert.isNull(list.tail.next);

      list.unshift(3);
      assert.strictEqual(list.tail.val, 4);
      assert.isNull(list.tail.next);

      list.unshift(8);
      assert.strictEqual(list.tail.val, 4);
      assert.isNull(list.tail.next);
    });
  });

  suite('Shift', () => {
    test('Removes a value from the front of the list', () => {
      list.push(4).push(2);
      assert.strictEqual(list.length, 2);
      assert.strictEqual(list.shift(), 4);
      assert.strictEqual(list.length, 1);
      assert.strictEqual(list.shift(), 2);
      assert.strictEqual(list.length, 0);
    });
  });

  suite('Get', () => {
    test('Gets a value from the list given an index', () => {
      list.push(5).push(6).push(7).push(8).push(9);
      assert.strictEqual(list.length, 5);
      assert.strictEqual(list.get(3), 8);
      assert.strictEqual(list.get(0), 5);
      assert.strictEqual(list.get(2), 7);
    });
  });

  suite('Set', () => {
    test('Sets a value in the list given an index', () => {
      list.push(3).push(4).push(5).push(6).push(7);
      assert.strictEqual(list.length, 5);

      list.set(4, 76);
      assert.strictEqual(list.pop(), 76);

      list.set(0, 67);
      assert.strictEqual(list.shift(), 67);

      assert.strictEqual(list.length, 3);
    });
  });

  suite('Remove', () => {
    test('Removes a value in the list given an index', () => {
      list.push(1).push(2).push(3).push(4).push(5);
      assert.strictEqual(list.length, 5);
      assert.strictEqual(list.remove(2), 3);
      assert.strictEqual(list.length, 4);
      assert.strictEqual(list.remove(0), 1);
      assert.strictEqual(list.length, 3);
      assert.strictEqual(list.remove(1), 4);
      assert.strictEqual(list.length, 2);
    });
  });
});
