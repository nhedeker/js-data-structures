'use strict';

const SinglyLinkedList = require('./singly_linked_list');

const Queue = function() {
  this.queue = new SinglyLinkedList();
};

Queue.prototype.size = function() {
  return this.queue.length;
};

Queue.prototype.enqueue = function(val) {
  this.queue.unshift(val);
};

Queue.prototype.dequeue = function() {
  return this.queue.pop();
};

module.exports = Queue;
