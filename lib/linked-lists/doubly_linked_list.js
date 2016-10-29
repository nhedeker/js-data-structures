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

DoublyLinkedList.prototype.__getNodeAt = function(index) {
  if (index >= this.length || index < 0) {
    return;
  }

  let goForward;
  let ptr;
  let i;

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

module.exports = DoublyLinkedList;
