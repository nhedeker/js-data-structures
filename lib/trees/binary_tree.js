/* eslint-disable no-else-return, curly */

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
    if (ptr.left) queue.push(ptr.left);
    if (ptr.right) queue.push(ptr.right);
  }

  return results;
};

BinaryTree.prototype.dFSPreOrder = function() {
  const results = [];

  const search = (ptr) => {
    if (!ptr) return;

    results.push(ptr.val);
    if (ptr.left) search(ptr.left);
    if (ptr.right) search(ptr.right);
  };

  search(this.root);

  return results;
};

BinaryTree.prototype.dFSInOrder = function() {
  const results = [];

  const search = (ptr) => {
    if (!ptr) return;

    if (ptr.left) search(ptr.left);
    results.push(ptr.val);
    if (ptr.right) search(ptr.right);
  };

  search(this.root);

  return results;
};

BinaryTree.prototype.dFSPostOrder = function() {
  const results = [];

  const search = (ptr) => {
    if (!ptr) return;

    if (ptr.left) search(ptr.left);
    if (ptr.right) search(ptr.right);
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

BinaryTree.prototype.findHighest = function() {
  const search = (ptr) => {
    return ptr.right ? search(ptr.right) : ptr.val;
  };

  return search(this.root);
};

// eslint-disable-next-line max-statements
BinaryTree.prototype.remove = function(val) {
  let ptr = this.root;
  let parent = null;
  let found = false;

  while (ptr && !found) {
    if (val < ptr.val) {
      parent = ptr;
      ptr = ptr.left;
    }
    else if (val > ptr.val) {
      parent = ptr;
      ptr = ptr.right;
    }
    else {
      found = true;
    }
  }

  if (!found) {
    return 'Value not found';
  }

  // No children
  if (!(ptr.left && ptr.right)) {
    if (parent && ptr.val > parent.val) {
      parent.right = null;
    }
    else if (parent && ptr.val < parent.val) {
      parent.left = null;
    }
    else {
      this.root = null;
    }

    return;
  }

  // Two children
  if (ptr.left && ptr.right) {
    let temp = ptr.right;

    while (temp.left !== null) {
      temp = temp.left;
    }

    temp.left = ptr.left;

    if (parent && ptr.val > parent.val) {
      parent.right = ptr.right;
    }
    else if (parent && ptr.val < parent.val) {
      parent.left = ptr.right;
    }
    else {
      this.root = ptr.right;
    }

    return;
  }

  // One child
  if (ptr.left || ptr.right) {
    const child = ptr.right || ptr.left;

    if (parent && ptr.val > parent.val) {
      parent.right = child;
    }
    else if (parent && ptr.val < parent.val) {
      parent.left = child;
    }
    else {
      this.root = child;
    }
  }
};

module.exports = BinaryTree;
