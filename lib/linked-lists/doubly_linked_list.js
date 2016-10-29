'use strict';

const Node = function(val, prev = null, next = null) {
  this.val = val;
  this.prev = prev;
  this.next = next;
};

const DoublyLinkedList = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

// eslint-disable-next-line max-statements
DoublyLinkedList.prototype.__getNodeAt = function(index) {
  if (index >= this._length || index < 0) {
    return;
  }

  let goForward;
  let ptr;
  let i;

  // eslint-disable-next-line no-unused-expressions
  index > (this._length / 2) ? goForward = false : goForward = true;

  if (goForward) {
    i = 0;
    ptr = this._head;
  }
  else {
    i = this._length - 1;
    ptr = this._tail;
  }

  while (i !== index) {
    if (goForward) {
      ptr = ptr.next;
      i += 1;
    }
    else {
      ptr = ptr.prev;
      i -= 1;
    }
  }

  return ptr;
};

DoublyLinkedList.prototype.clear = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

DoublyLinkedList.prototype.push = function(val) {
  const newNode = new Node(val);

  if (this._length <= 0) {
    this._head = newNode;
  }
  else {
    this._tail.next = newNode;
    newNode.prev = this._tail;
  }

  this._tail = newNode;
  this._length += 1;

  return this;
};

DoublyLinkedList.prototype.pop = function() {
  if (this._length <= 0) {
    return;
  }
  if (this._length === 1) {
    const _headVal = this._head.val;

    this.clear();

    return _headVal;
  }

  const val = this._tail.val;
  const prevNode = this._tail.prev;

  prevNode.next = null;
  this._tail.prev = null;
  this._tail = prevNode;
  this._length -= 1;

  return val;
};

DoublyLinkedList.prototype.unshift = function(val) {
  if (this._length <= 0) {
    return this.push(val);
  }

  const newNode = new Node(val);

  this._head.prev = newNode;
  newNode.next = this._head;
  this._head = newNode;
  this._length += 1;

  return this;
};

DoublyLinkedList.prototype.shift = function() {
  if (this._length <= 1) {
    return this.pop();
  }

  const val = this._head.val;

  const nextNode = this._head.next;

  nextNode.prev = null;
  this._head.next = null;
  this._head = nextNode;
  this._length -= 1;

  return val;
};

DoublyLinkedList.prototype.get = function(index) {
  const node = this.__getNodeAt(index);

  // eslint-disable-next-line no-undefined
  return node ? node.val : undefined;
};

DoublyLinkedList.prototype.set = function(index, val) {
  const node = this.__getNodeAt(index);

  if (node) {
    node.val = val;
  }
};

DoublyLinkedList.prototype.remove = function(index) {
  if (index === 0) {
    return this.shift();
  }

  if (index === this._length - 1) {
    return this.pop();
  }

  const node = this.__getNodeAt(index);

  if (node) {
    const val = node.val;
    const prevNode = node.prev;
    const nextNode = node.next;

    nextNode.prev = prevNode;
    prevNode.next = nextNode;
    node.prev = null;
    node.next = null;
    this._length -= 1;

    return val;
  }
};

DoublyLinkedList.prototype.insert = function(index, val) {
  if (index < 0 || index > this._length) {
    return;
  }

  if (index === 0) {
    return this.unshift(val);
  }

  if (index === this._length) {
    return this.push(val);
  }

  const nextNode = this.__getNodeAt(index);
  const prevNode = nextNode.prev;
  const newNode = new Node(val, prevNode, nextNode);

  prevNode.next = newNode;
  nextNode.prev = newNode;
  this._length += 1;

  return this;
};

module.exports = DoublyLinkedList;
