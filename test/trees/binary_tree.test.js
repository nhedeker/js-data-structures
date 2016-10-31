'use strict';

const BinaryTree = require('../../lib/trees/binary_tree');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Binary Tree', () => {
  let binTree;

  suite('Insert', () => {
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      binTree = new BinaryTree();
      binTree.insert(5);
      binTree.insert(10);
      binTree.insert(3);
    });

    test('Only accepts numbers', () => {
      // eslint-disable-next-line no-undefined
      ['awesome', null, undefined, [], true, {}, NaN].forEach((element) => {
        assert.strictEqual(binTree.insert(element), 'Please insert a number');
      });
    });
    test('Inserts properly', () => {
      assert.strictEqual(binTree.root.val, 5);
      assert.strictEqual(binTree.root.right.val, 10);
      assert.strictEqual(binTree.root.left.val, 3);
    });
    test('Does not insert duplicates', () => {
      binTree.insert(3);
      binTree.insert(3);
      binTree.insert(3);
      assert.strictEqual(binTree.root.left.val, 3);
      assert.strictEqual(binTree.root.left.left, null);
      assert.strictEqual(binTree.root.left.right, null);
      assert.strictEqual(binTree.insert(3),
        'Tree already contains input number');
    });
  });

  suite('Contains', () => {
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      binTree = new BinaryTree();
      [7, 3, 9, 2, 35, 46, 75].forEach((element) => {
        binTree.insert(element);
      });
    });

    test('Returns true when value is in tree', () => {
      assert.strictEqual(binTree.contains(75), true);
    });

    test('Returns false when value is not in tree', () => {
      assert.strictEqual(binTree.contains(-1), false);
      assert.strictEqual(binTree.contains(1), false);
    });

    test('Finds values in tree with many values', () => {
      [7, 3, 9, 2, 35, 46, 75].forEach((element) => {
        assert.strictEqual(binTree.contains(element), true);
      });
    });
  });

  suite('Breadth First Search', () => {
    test('should search left to right', () => {
      binTree = new BinaryTree();
      [5, 2, 6, 8, 23, 56, 11].forEach((element) => {
        binTree.insert(element);
      });
      assert.deepEqual(binTree.breadthFirstSearch(), [5, 2, 6, 8, 11, 23, 56]);
    });
  });

  suite('Depth First Search', () => {
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      binTree = new BinaryTree();
      [4, 1, 7, 3, 98, 74, 32].forEach((element) => {
        binTree.insert(element);
      });
    });

    suite('Pre-order', () => {
      test('Properly searches', () => {
        assert.deepEqual(binTree.dFSPreOrder(), [4, 1, 7, 3, 98, 74, 32]);
      });
    });

    suite('In-order', () => {
      test('Properly searches', () => {
        assert.deepEqual(binTree.dFSInOrder(), [1, 3, 4, 7, 32, 74, 98]);
      });
    });

    suite('Post-order', () => {
      test('Properly searches', () => {
        assert.deepEqual(binTree.dFSInOrder(), [3, 1, 32, 74, 98, 7, 4]);
      });
    });
  });

  suite('Size', () => {
    test('Returns size of the tree', () => {
      binTree = new BinaryTree();
      [10, 4, 2, 9, 24, 44, 85].forEach((element) => {
        binTree.insert(element);
      });
      assert.strictEqual(binTree.size(), 7);

      binTree.insert(52);
      assert.strictEqual(binTree.size(), 8);

      binTree.insert(-3);
      binTree.insert(21);
      assert.strictEqual(binTree.size(), 10);
    });
  });

  suite('Find Lowest', () => {
    test('Returns lowest value in tree', () => {
      binTree = new BinaryTree();
      [54, 2, 89, -27, -1, 0, 10].forEach((element) => {
        binTree.insert(element);
      });
      assert.strictEqual(binTree.findLowest(), -27);

      binTree.insert(-28);
      assert.strictEqual(binTree.findLowest(), -28);

      binTree.insert(-100);
      assert.strictEqual(binTree.findLowest(), -100);
    });
  });

  suite('Find Highest', () => {
    test('Returns highest value in tree', () => {
      binTree = new BinaryTree();
      [35, 7, 46, -1, 99, 0, -10].forEach((element) => {
        binTree.insert(element);
      });
      assert.strictEqual(binTree.findHighest(), 99);

      binTree.insert(100);
      assert.strictEqual(binTree.findHighest(), 100);

      binTree.insert(234);
      assert.strictEqual(binTree.findHighest(), 234);
    });
  });
});
