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

BinaryTree.prototype.breadthFirstSearch = function() {
  const queue = [this.root];
  const results = [];

  for (let ptr = queue.shift(); ptr; ptr = queue.shift()) {
    results.push(ptr.val);

    if (ptr.left) {
      queue.push(ptr.left);
    }

    if (ptr.right) {
      queue.push(ptr.right);
    }
  }

  return results;
};

BinaryTree.prototype.dFSPreOrder = function() {
  const results = [];

  const search = (ptr) => {
    results.push(ptr.val);

    if (ptr.left) {
      search(ptr.left);
    }

    if (ptr.right) {
      search(ptr.right);
    }
  };

  search(this.root);

  return results;
};

BinaryTree.prototype.dFSInOrder = function() {
  const results = [];

  const search = (ptr) => {
    if (ptr.left) {
      search(ptr.left);
    }

    results.push(ptr.val);

    if (ptr.right) {
      search(ptr.right);
    }
  };

  search(this.root);

  return results;
};

BinaryTree.prototype.dFSPostOrder = function() {
  const results = [];

  const search = (ptr) => {
    if (ptr.left) {
      search(ptr.left);
    }

    if (ptr.right) {
      search(ptr.right);
    }

    results.push(ptr.val);
  };

  search(this.root);

  return results;
};

BinaryTree.prototype.size = function() {
  return this.breadthFirstSearch().length;
};

BinaryTree.prototype.findLowest = function() {
  const search = (ptr) => {
    return ptr.left ? search(ptr.left) : ptr.val;
  };

  return search(this.root);
};

module.exports = BinaryTree;
