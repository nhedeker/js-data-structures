'use strict';

const Node = function(val, next = null) {
  this.val = val;
  this.next = next;
};

const Queue = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

Queue.prototype.__getNodeAt = function(index) {
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

Queue.prototype.clear = function() {
  this._head = null;
  this._tail = null;
  this._length = 0;
};

Queue.prototype.size = function() {
  return this._length;
};

Queue.prototype.enqueue = function(val) {
  const newNode = new Node(val);

  if (this._length <= 0) {
    this._tail = newNode;
  }
  else {
    newNode.next = this._head;
  }

  this._head = newNode;
  this._length += 1;

  return this;
};

Queue.prototype.dequeue = function() {
  if (this._length <= 0) {
    return;
  }
  if (this._length === 1) {
    const headVal = this._head.val;

    this.clear();

    return headVal;
  }

  const val = this._tail.val;
  const ptr = this.__getNodeAt(this._length - 2);

  this._tail = ptr;
  ptr.next = null;
  this._length -= 1;

  return val;
};

module.exports = Queue;
