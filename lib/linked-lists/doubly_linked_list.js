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

module.exports = DoublyLinkedList;
