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

};

module.exports = Graph;
