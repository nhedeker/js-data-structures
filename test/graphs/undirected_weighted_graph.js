'use strict';

require('../../lib/graphs/undirected_weighted_graph');
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
      assert.strictEqual(cityGraph.edges[0].first, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);
    });

    test('Properly adds a single edge to a graph containing edges', () => {
      cityGraph.addEdge('Chicago', 'Seattle', 4);
      assert.strictEqual(cityGraph.edges[0].first, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);

      cityGraph.addEdge('Chicago', 'Denver', 5);
      assert.strictEqual(cityGraph.edges[1].first, 'Chicago');
      assert.strictEqual(cityGraph.edges[1].second, 'Denver');
      assert.strictEqual(cityGraph.edges[1].weight, 5);

      cityGraph.addEdge('Denver', 'Seattle', 6);
      assert.strictEqual(cityGraph.edges[2].first, 'Denver');
      assert.strictEqual(cityGraph.edges[2].second, 'Seattle');
      assert.strictEqual(cityGraph.edges[2].weight, 6);
    });

    test('Properly chains', () => {
      cityGraph
        .addEdge('Chicago', 'Seattle', 4)
        .addEdge('Chicago', 'Denver', 5)
        .addEdge('Denver', 'Seattle', 6);

      assert.strictEqual(cityGraph.edges[0].first, 'Chicago');
      assert.strictEqual(cityGraph.edges[0].second, 'Seattle');
      assert.strictEqual(cityGraph.edges[0].weight, 4);

      assert.strictEqual(cityGraph.edges[1].first, 'Chicago');
      assert.strictEqual(cityGraph.edges[1].second, 'Denver');
      assert.strictEqual(cityGraph.edges[1].weight, 5);

      assert.strictEqual(cityGraph.edges[2].first, 'Denver');
      assert.strictEqual(cityGraph.edges[2].second, 'Seattle');
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

  });

  suite('Find Orphans', () => {

  });

  suite('Find Path', () => {

  });

  suite('Path Weight', () => {

  });

  suite('Print', () => {

  });
});
