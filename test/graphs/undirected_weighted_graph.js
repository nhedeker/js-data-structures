'use strict';

const Graph = require('../../lib/graphs/undirected_weighted_graph');
const { assert } = require('chai');
const { suite, test } = require('mocha');

suite('Undirected Weighted Graph', () => {
  let cityGraph;

  beforeEach(() => {
    cityGraph = new Graph();
  });

  suite('Add Vertex', () => {
    test('Properly adds a single vertex to a new graph', () => {
      cityGraph.addVertex('Chicago');
      assert.strictEqual(cityGraph.vertices[0].val, 'Chicago');
    });

    test('Properly adds a single vertex to a graph containing vertices', () => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
      assert.strictEqual(cityGraph.vertices[0].val, 'Chicago');
      assert.strictEqual(cityGraph.vertices[1].val, 'Seattle');
      assert.strictEqual(cityGraph.vertices[2].val, 'Denver');
    });

    test('Properly chains', () => {
      cityGraph.addVertex('Chicago').addVertex('Seattle').addVertex('Denver');
      assert.strictEqual(cityGraph.vertices[0].val, 'Chicago');
      assert.strictEqual(cityGraph.vertices[1].val, 'Seattle');
      assert.strictEqual(cityGraph.vertices[2].val, 'Denver');
    });
  });

  suite('Add Edge', () => {
    beforeEach(() => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
    });

    test('Properly adds a single edge to a new graph', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.strictEqual(cityGraph.edges[0].first.val, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second.val, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);
    });

    test('Properly adds a single edge to a graph containing edges', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.strictEqual(cityGraph.edges[0].first.val, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second.val, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);

      cityGraph.addEdge('Chicago', 'Denver', 5);
      assert.strictEqual(cityGraph.edges[1].first.val, 'Chicago');
      assert.strictEqual(cityGraph.edges[1].second.val, 'Denver');
      assert.strictEqual(cityGraph.edges[1].weight, 5);

      cityGraph.addEdge('Denver', 'Seattle', 6);
      assert.strictEqual(cityGraph.edges[2].first.val, 'Denver');
      assert.strictEqual(cityGraph.edges[2].second.val, 'Seattle');
      assert.strictEqual(cityGraph.edges[2].weight, 6);
    });

    test('Properly chains', () => {
      cityGraph
        .addEdge('Chicago', 'Seattle', 4)
        .addEdge('Chicago', 'Denver', 5)
        .addEdge('Denver', 'Seattle', 6);

      assert.strictEqual(cityGraph.edges[0].first.val, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second.val, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);

      assert.strictEqual(cityGraph.edges[1].first.val, 'Chicago');
      assert.strictEqual(cityGraph.edges[1].second.val, 'Denver');
      assert.strictEqual(cityGraph.edges[1].weight, 5);

      assert.strictEqual(cityGraph.edges[2].first.val, 'Denver');
      assert.strictEqual(cityGraph.edges[2].second.val, 'Seattle');
      assert.strictEqual(cityGraph.edges[2].weight, 6);
    });
  });

  suite('Size', () => {
    test('Properly returns number of vertices in graph', () => {
      assert.strictEqual(cityGraph.size(), 0);

      cityGraph.addVertex('Chicago');
      assert.strictEqual(cityGraph.size(), 1);

      cityGraph.addVertex('Seattle');
      assert.strictEqual(cityGraph.size(), 2);

      cityGraph.addVertex('Denver');
      assert.strictEqual(cityGraph.size(), 3);
    });
  });

  suite('Num Edges', () => {
    test('Properly returns number of edges in graph', () => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');

      assert.strictEqual(cityGraph.numEdges(), 0);

      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.strictEqual(cityGraph.numEdges(), 1);

      cityGraph.addEdge('Chicago', 'Denver', 5);
      assert.strictEqual(cityGraph.numEdges(), 2);

      cityGraph.addEdge('Denver', 'Seattle', 6);
      assert.strictEqual(cityGraph.numEdges(), 3);
    });
  });

  suite('Weight', () => {
    test('Properly returns the total weight of all edges in graph', () => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');

      assert.strictEqual(cityGraph.weight(), 0);

      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.strictEqual(cityGraph.weight(), 4);

      cityGraph.addEdge('Chicago', 'Denver', 5);
      assert.strictEqual(cityGraph.weight(), 9);

      cityGraph.addEdge('Denver', 'Seattle', 6);
      assert.strictEqual(cityGraph.weight(), 15);
    });
  });

  suite('Find Neighbors', () => {
    beforeEach(() => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
    });
    test('Returns [] when no vertices are connected', () => {
      assert.deepEqual(cityGraph.findNeighbors('Chicago'), []);
      assert.deepEqual(cityGraph.findNeighbors('Seattle'), []);
      assert.deepEqual(cityGraph.findNeighbors('Denver'), []);
    });

    // eslint-disable-next-line max-len
    test('Properly returns all vertices when all vertices are connected', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.deepEqual(cityGraph.findNeighbors('Chicago'), ['Seattle']);

      cityGraph.addEdge('Chicago', 'Denver', 5);
      cityGraph.addEdge('Denver', 'Seattle', 6);

      assert.include(cityGraph.findNeighbors('Chicago'), 'Seattle');
      assert.include(cityGraph.findNeighbors('Chicago'), 'Denver');

      assert.include(cityGraph.findNeighbors('Seattle'), 'Chicago');
      assert.include(cityGraph.findNeighbors('Seattle'), 'Denver');

      assert.include(cityGraph.findNeighbors('Denver'), 'Chicago');
      assert.include(cityGraph.findNeighbors('Denver'), 'Seattle');
    });

    // eslint-disable-next-line max-len
    test('Properly all vertices connected to a given vertex while not all vertices are connected', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);
      cityGraph.addEdge('Chicago', 'Denver', 5);

      assert.include(cityGraph.findNeighbors('Denver'), 'Chicago');
      assert.notInclude(cityGraph.findNeighbors('Denver'), 'Seattle');

      assert.include(cityGraph.findNeighbors('Seattle'), 'Chicago');
      assert.notInclude(cityGraph.findNeighbors('Seattle'), 'Denver');
    });
  });

  suite('Find Orphans', () => {
    beforeEach(() => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
    });

    test('Finds a single vertex not connected to any other vertex', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);

      assert.strictEqual(cityGraph.findOrphans().length, 1);
      assert.strictEqual(cityGraph.findOrphans()[0], 'Denver');
    });

    test('Finds multiple orphan vertices', () => {
      const orphans = cityGraph.findOrphans();

      assert.strictEqual(orphans.length, 3);
      assert.include(orphans, 'Denver');
      assert.include(orphans, 'Chicago');
      assert.include(orphans, 'Seattle');
    });

    test('Properly finds orphans after graph is updated', () => {
      let orphans = cityGraph.findOrphans();

      assert.strictEqual(orphans.length, 3);
      assert.include(orphans, 'Denver');
      assert.include(orphans, 'Chicago');
      assert.include(orphans, 'Seattle');

      cityGraph.addEdge('Chicago', 'Seattle', 4);

      orphans = cityGraph.findOrphans();
      assert.strictEqual(orphans.length, 1);
      assert.strictEqual(orphans[0], 'Denver');
    });
  });

  suite('Find Path', () => {
    beforeEach(() => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
      cityGraph.addVertex('New York');

      cityGraph.addEdge('Chicago', 'Seattle', 4);
      cityGraph.addEdge('Chicago', 'New York', 8);
      cityGraph.addEdge('New York', 'Denver', 10);
    });

    test('Finds & returns the shortest path with one edge', () => {
      const path = cityGraph.findPath('Chicago', 'Seattle');

      assert.strictEqual(path.length, 1);
      assert.strictEqual(path[0].first.val, 'Chicago');
      assert.strictEqual(path[0].second.val, 'Seattle');
    });

    test('Finds & returns the shortest path with multiple edge', () => {
      const path = cityGraph.findPath('Seattle', 'New York');

      assert.strictEqual(path.length, 2);
      assert.strictEqual(path[0].first.val, 'Chicago');
      assert.strictEqual(path[0].second.val, 'Seattle');
      assert.strictEqual(path[1].first.val, 'Chicago');
      assert.strictEqual(path[1].second.val, 'New York');
    });

    test('Finds & returns the shortest path with multiple edge options', () => {
      cityGraph.addEdge('Seattle', 'Denver', 12);

      const path = cityGraph.findPath('Seattle', 'Denver');

      assert.strictEqual(path.length, 1);
      assert.strictEqual(path[0].first.val, 'Seattle');
      assert.strictEqual(path[0].second.val, 'Denver');
    });
  });

  suite('Path Weight', () => {
    beforeEach(() => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
      cityGraph.addVertex('New York');

      cityGraph.addEdge('Chicago', 'Seattle', 4);
      cityGraph.addEdge('Chicago', 'New York', 8);
      cityGraph.addEdge('New York', 'Denver', 10);
    });

    test('Calculates weight of a path with one edge', () => {
      let path = cityGraph.findPath('Chicago', 'Seattle');

      assert.strictEqual(cityGraph.pathWeight(path), 4);

      path = cityGraph.findPath('Chicago', 'New York');

      assert.strictEqual(cityGraph.pathWeight(path), 8);

      path = cityGraph.findPath('New York', 'Denver');

      assert.strictEqual(cityGraph.pathWeight(path), 10);
    });

    test('Calculates weight of a path with multiple edges', () => {
      let path = cityGraph.findPath('Seattle', 'New York');

      assert.strictEqual(cityGraph.pathWeight(path), 12);

      path = cityGraph.findPath('Seattle', 'Denver');

      assert.strictEqual(cityGraph.pathWeight(path), 22);

      path = cityGraph.findPath('Chicago', 'Denver');

      assert.strictEqual(cityGraph.pathWeight(path), 18);
    });
  });

  suite('Print', () => {

  });
});
