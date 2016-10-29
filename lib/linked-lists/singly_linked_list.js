'use strict';

const Node = function(val, next = null) {
  this.val = val;
  this.next = next;
};

const SinglyLinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

SinglyLinkedList.prototype.__getNodeAt = function(index) {
  if (index >= this.length || index < 0) {
    return;
  }

  let i = 0;
  let ptr = this.head;

  for (; ptr !== null && i < index; i++) {
    ptr = ptr.next;
  }

  if (!ptr) {
    return;
  }

  return ptr;
};

SinglyLinkedList.prototype.clear = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

SinglyLinkedList.prototype.push = function(val) {
  const newNode = new Node(val);

  // eslint-disable-next-line no-unused-expressions
  this.head ? this.tail.next = newNode : this.head = newNode;

  this.tail = newNode;
  this.length += 1;

  return this;
};

SinglyLinkedList.prototype.pop = function() {
  if (this.length <= 0) {
    return;
  }
  if (this.length === 1) {
    const headVal = this.head.val;

    this.clear();

    return headVal;
  }

  const val = this.tail.val;
  const ptr = this.__getNodeAt(this.length - 2);

  this.tail = ptr;
  ptr.next = null;
  this.length -= 1;

  return val;
};

SinglyLinkedList.prototype.unshift = function(val) {
  if (this.length <= 0) {
    return this.push(val);
  }

  const newNode = new Node(val);

  newNode.next = this.head;
  this.head = newNode;
  this.length += 1;

  return this;
};

SinglyLinkedList.prototype.shift = function() {
  if (this.length <= 1) {
    return this.pop();
  }

  const val = this.head.val;
  const nextNode = this.head.next;

  this.head.next = null;
  this.head = nextNode;
  this.length -= 1;

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

  if (index === this.length - 1) {
    return this.pop();
  }

  const prevNode = this.__getNodeAt(index - 1);

  if (prevNode) {
    const val = prevNode.next.val;

    prevNode.next = prevNode.next.next;
    this.length -= 1;

    return val;
  }
};

module.exports = SinglyLinkedList;
