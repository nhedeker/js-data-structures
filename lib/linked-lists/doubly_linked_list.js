'use strict';

const Node = function(val, next = null, prev = null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
};

const DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

// eslint-disable-next-line max-statements
DoublyLinkedList.prototype.__getNodeAt = function(index) {
  if (index >= this.length || index < 0) {
    return;
  }

  let goForward;
  let ptr;
  let i;

  // eslint-disable-next-line no-unused-expressions
  index > (this.length / 2) ? goForward = false : goForward = true;

  if (goForward) {
    i = 0;
    ptr = this.head;
  }
  else {
    i = this.length - 1;
    ptr = this.tail;
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
  this.head = null;
  this.tail = null;
  this.length = 0;
};

DoublyLinkedList.prototype.push = function(val) {
  const newNode = new Node(val);

  if (this.length <= 0) {
    this.head = newNode;
  }
  else {
    this.tail.next = newNode;
    newNode.prev = this.tail;
  }

  this.tail = newNode;
  this.length += 1;

  return this;
};

DoublyLinkedList.prototype.pop = function() {
  if (this.length <= 0) {
    return;
  }
  if (this.length === 1) {
    const headVal = this.head.val;

    this.clear();

    return headVal;
  }

  const val = this.tail.val;
  const prevNode = this.tail.prev;

  prevNode.next = null;
  this.tail.prev = null;
  this.tail = prevNode;
  this.length -= 1;

  return val;
};

DoublyLinkedList.prototype.unshift = function(val) {
  if (this.length <= 0) {
    return this.push(val);
  }

  const newNode = new Node(val);

  this.head.prev = newNode;
  newNode.next = this.head;
  this.head = newNode;
  this.length += 1;

  return this;
};

DoublyLinkedList.prototype.shift = function() {
  if (this.length <= 1) {
    return this.pop();
  }

  const val = this.head.val;

  const nextNode = this.head.next;

  nextNode.prev = null;
  this.head.next = null;
  this.head = nextNode;
  this.length -= 1;

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

module.exports = DoublyLinkedList;
