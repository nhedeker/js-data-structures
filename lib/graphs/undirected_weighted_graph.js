'use strict';

const Vertex = function(val) {
  this.val = val;
};

const Edge = function(first, second, weight) {
  this.first = first;
  this.second = second;
  this.weight = weight;
};

// undirected weighted graph
const Graph = function() {
  this.vertices = [];
  this.edges = [];
};

Graph.prototype.__findVertex = function(val) {
  for (let i = 0; i < this.vertices.length; i++) {
    if (this.vertices[i].val === val) {
      return this.vertices[i];
    }
  }

  return null;
};

Graph.prototype.addVertex = function(val) {
  if (this.__findVertex(val) !== null) {
    return;
  }
  this.vertices.push(new Vertex(val));
};

module.exports = Graph;
