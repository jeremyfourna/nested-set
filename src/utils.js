/*jshint esversion: 6 */

const R = require('ramda');


function degree(node) {
  return R.prop('degree', node);
}

function depth(node) {
  return R.prop('depth', node);
}

function descendant(node) {
  return R.prop('descendant', node);
}

function height(node) {
  return R.prop('height', node);
}

function left(node) {
  return R.prop('left', node);
}

function nodeId(node) {
  return R.prop('id', node);
}

function leftRightAndId(node) {
  return [nodeId(node), left(node), right(node)];
}

function lengthMinusOne(list) {
  return R.dec(R.length(list));
}

function lengthZero(list) {
  return R.equals(0, R.length(list));
}

function lengthNotZero(list) {
  return R.gt(R.length(list), 0);
}

function right(node) {
  return R.prop('right', node);
}

exports.descendant = descendant;
exports.leftRightAndId = leftRightAndId;
exports.lengthMinusOne = lengthMinusOne;
exports.lengthNotZero = lengthNotZero;
exports.lengthZero = lengthZero;
