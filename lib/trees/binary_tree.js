/* eslint-disable no-else-return */

'use strict';

const Node = function(val) {
  this.val = val;
  this.left = null;
  this.right = null;
};

const BinaryTree = function() {
  this.root = null;
};

// eslint-disable-next-line max-statements
BinaryTree.prototype.insert = function(val, ptr = this.root) {
  if (!Number.isInteger(val)) {
    return 'Please insert a number';
  }

  if (ptr && ptr.val === val) {
    return 'Tree already contains input number';
  }

  if (!ptr) {
    this.root = new Node(val);

    return this;
  }

  if (val < ptr.val) {
    if (ptr.left) {
      return this.insert(val, ptr.left);
    }
    else {
      ptr.left = new Node(val);

      return this;
    }
  }
  else if (val > ptr.val) {
    if (ptr.right) {
      return this.insert(val, ptr.right);
    }
    else {
      ptr.right = new Node(val);

      return this;
    }
  }
};

BinaryTree.prototype.contains = function(val, ptr = this.root) {
  if (val < ptr.val) {
    return ptr.left ? this.contains(val, ptr.left) : false;
  }
  else if (val > ptr.val) {
    return ptr.right ? this.contains(val, ptr.right) : false;
  }

  return true;
};

module.exports = BinaryTree;
