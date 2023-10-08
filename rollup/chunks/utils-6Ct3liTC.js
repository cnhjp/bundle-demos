'use strict';

function add(a, b) {
  return a + b;
}

function addPI(a) {
  return a + Math.PI;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  addPI,
  multiply,
};

exports.add = add;
exports.addPI = addPI;
exports.multiply = multiply;
