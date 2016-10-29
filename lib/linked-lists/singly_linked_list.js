'use strict';

const Node = function(val, next = null) {
  this.val = val;
  this.next = next;
};

const SinglyLinkedList = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

SinglyLinkedList.prototype.__getNodeAt = function(index) {
  if (index >= this._length || index < 0) {
    return;
  }

  let i = 0;
  let ptr = this._head;

  for (; ptr !== null && i < index; i++) {
    ptr = ptr.next;
  }

  if (!ptr) {
    return;
  }

  return ptr;
};

SinglyLinkedList.prototype.clear = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

SinglyLinkedList.prototype.push = function(val) {
  const newNode = new Node(val);

  // eslint-disable-next-line no-unused-expressions
  this._head ? this._tail.next = newNode : this._head = newNode;

  this._tail = newNode;
  this._length += 1;

  return this;
};

SinglyLinkedList.prototype.pop = function() {
  if (this._length <= 0) {
    return;
  }
  if (this._length === 1) {
    const _headVal = this._head.val;

    this.clear();

    return _headVal;
  }

  const val = this._tail.val;
  const ptr = this.__getNodeAt(this._length - 2);

  this._tail = ptr;
  ptr.next = null;
  this._length -= 1;

  return val;
};

SinglyLinkedList.prototype.unshift = function(val) {
  if (this._length <= 0) {
    return this.push(val);
  }

  const newNode = new Node(val);

  newNode.next = this._head;
  this._head = newNode;
  this._length += 1;

  return this;
};

SinglyLinkedList.prototype.shift = function() {
  if (this._length <= 1) {
    return this.pop();
  }

  const val = this._head.val;
  const nextNode = this._head.next;

  this._head.next = null;
  this._head = nextNode;
  this._length -= 1;

  return val;
};

SinglyLinkedList.prototype.get = function(index) {
  const node = this.__getNodeAt(index);

  // eslint-disable-next-line no-undefined
  return node ? node.val : undefined;
};

SinglyLinkedList.prototype.set = function(index, val) {
  const node = this.__getNodeAt(index);

  if (node) {
    node.val = val;
  }
};

SinglyLinkedList.prototype.remove = function(index) {
  if (index === 0) {
    return this.shift();
  }

  if (index === this._length - 1) {
    return this.pop();
  }

  const prevNode = this.__getNodeAt(index - 1);

  if (prevNode) {
    const val = prevNode.next.val;

    prevNode.next = prevNode.next.next;
    this._length -= 1;

    return val;
  }
};

module.exports = SinglyLinkedList;
