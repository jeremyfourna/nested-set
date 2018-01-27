/*jshint esversion: 6 */

const R = require('ramda');
const {
  lengthZero,
  lengthNotZero
} = require('./utils');
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

function appendChild(ancestorsList, nodeId, tree) {
  if (R.equals('root', nodeId)) {
    throw new Error('The id of the new node can not be "root", please use another alias for your new node.');
  } else if (!R.equals('root', R.head(ancestorsList))) {
    throw new Error('The first value of the ancestors list must be "root"');
  } else {
    const ancestorsPath = R.append('descendant', R.intersperse('descendant', ancestorsList));
    return findPlaceToInsertChild(ancestorsPath, ['root', 'descendant'], nodeId, tree);
  }
}

function findPlaceToInsertChild(ancestorsPath, currentPath, nodeId, tree) {
  console.log(ancestorsPath, currentPath);
  if (lengthNotZero(R.drop(ancestorsPath))) {

  }
  return tree;
}

function appendChildren(listOfChildren, tree) {
  if (lengthZero(listOfChildren)) {
    return tree;
    //return updateLeftRight(1, [], tree);
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
