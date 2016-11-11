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
      assert.strictEqual(cityGraph.vertices[0], 'Chicago');
    });

    test('Properly adds a single vertex to a graph containing vertices', () => {
      cityGraph.addVertex('Chicago');
      cityGraph.addVertex('Seattle');
      cityGraph.addVertex('Denver');
      assert.deepEqual(cityGraph.vvertices, ['Chicago', 'Seattle', 'Denver']);
    });

    test('Properly chains', () => {
      cityGraph.addVertex('Chicago').addVertex('Seattle').addVertex('Denver');
      assert.deepEqual(cityGraph.vvertices, ['Chicago', 'Seattle', 'Denver']);
    });
  });

  suite('Add Edge', () => {

  });

  suite('Size', () => {

  });

  suite('Num Edges', () => {

  });

  suite('Weight', () => {

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
