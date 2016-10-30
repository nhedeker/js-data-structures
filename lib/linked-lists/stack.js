'use strict';

const Node = function(val, next = null) {
  this.val = val;
  this.next = next;
};

const Stack = function() {
  this._top = null;
  this._length = 0;
};

Stack.prototype.size = function() {
  return this._length;
};

Stack.prototype.push = function(val) {
  const newNode = new Node(val);
  const oldTop = this._top;

  this._top = newNode;
  this._top.next = oldTop;
  this._length += 1;
};

Stack.prototype.pop = function() {
  if (this._length <= 0) {
    return;
  }

  const val = this._top.val;

  this._top = this._top.next;
  this._length -= 1;

  return val;
};

Stack.prototype.peek = function() {
  if (this._length <= 0) {
    return;
  }

  return this._top.val;
};

module.exports = Stack;
