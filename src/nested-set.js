/*jshint esversion: 6 */

const R = require('ramda');
const { lengthZero } = require('./utils');
const { updateLeftRight } = require('./update-left-right');

function nestedSet() {
  return newNode('root');
}

function newNode(id) {
  return {
    id,
    descendant: [],
    degree: 0,
    left: 1,
    right: 2,
    level: 0,
    height: 0,
    depth: 0
  };
}

function appendChild(parentId, nodeId, tree) {
  const descendantLens = R.lensProp('descendant');

  if (R.equals('root', nodeId)) {
    throw new Error('The id of the node can not be "root", please use another alias for your node.');
  } else if (R.equals('root', parentId)) {
    return R.over(descendantLens, R.append(newNode(nodeId)), tree);
  } else {
    const parentPosition = findById(parentId, tree);
    (nodeId === 'suits') ? console.log(parentId, nodeId, tree, parentPosition): console.log('#');
    const parentPath = findPathByLeftRight(parentPosition, [], tree);
    return tree;
  }
}

function appendChildren(listOfChildren, tree) {
  if (lengthZero(listOfChildren)) {
    return updateLeftRight(1, [], tree);
  } else {
    const newTree = appendChild(...R.head(listOfChildren), tree);
    return appendChildren(R.tail(listOfChildren), newTree);
  }
}

function findById(nodeId, tree) {
  return R.path(['findById', nodeId], tree);
}

function findPathByLeftRight(nodeLeftRight, currentPath, tree) {
  //console.log(nodeLeftRight, currentPath, tree);
}

exports.nestedSet = nestedSet;
exports.appendChild = R.curry(appendChild);
exports.appendChildren = R.curry(appendChildren);
