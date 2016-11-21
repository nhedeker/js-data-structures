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

  return this;
};

Graph.prototype.addEdge = function(firstVal, secondVal, weight) {
  const first = this.__findVertex(firstVal);
  const second = this.__findVertex(secondVal);

  if (first === null || second === null) {
    return;
  }

  this.edges.push(new Edge(first, second, weight));

  return this;
};

Graph.prototype.size = function() {
  return this.vertices.length;
};

Graph.prototype.numEdges = function() {
  return this.edges.length;
};

Graph.prototype.weight = function() {
  return this.edges.reduce(function(result, element) {
    return (result += element.weight);
  }, 0);
};

module.exports = Graph;
