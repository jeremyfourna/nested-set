/*jshint esversion: 6 */

const R = require('ramda');
const {
  leftRightAndId,
  lengthMinusOne,
  lengthZero,
  descendant
} = require('./utils');

function setNodeInsideFindById(node, tree) {
  return R.assocPath(['findById', R.head(node)], R.tail(node), tree);
}

function ascendPath(path) {
  const newPath = R.dropLast(2, path);

  return R.adjust(R.inc, lengthMinusOne(newPath), newPath);
}

function movePathNextSibling(path) {
  return R.adjust(R.inc, lengthMinusOne(path), path);
}

function closeIndexOnRoot(index, tree) {
  return R.assoc('right', index, tree);
}

function updateLeftRight(currentIndex, currentPath, tree) {
  const currentNodeLens = R.lensPath(currentPath);
  const currentNodeLeftLens = R.lensPath(R.append('left', currentPath));
  const currentNodeRightLens = R.lensPath(R.append('right', currentPath));
  const currentNodeFirstDescendantPath = R.concat(currentPath, ['descendant', 0]);

  const currentNode = R.view(currentNodeLens, tree);
  const newTree = R.set(currentNodeLeftLens, currentIndex, tree);

  // Check if we are out of the tree
  if (R.isNil(currentNode)) {
    // If yes check if we are on the first level
    if (R.equals(2, R.length(currentPath))) {
      // If yes update the root's right and exit
      return closeIndexOnRoot(currentIndex, tree);
    } else {
      // If no ascend 1 level and update left and right again
      return updateLeftRight(R.inc(currentIndex), ascendPath(currentPath), tree);
    }
  } else if (lengthZero(descendant(R.view(currentNodeLens, newTree)))) {
    // Define the right value for the current node
    const updatedTree = R.set(currentNodeRightLens, R.inc(currentIndex), newTree);
    // Update the path to go to the next sibling
    const newUpdatedPath = movePathNextSibling(currentPath);
    // Save the current node left right at the top for the findById function
    const currentNodeLeftRightAndId = leftRightAndId(R.view(currentNodeLens, updatedTree));
    const newUpdatedTree = setNodeInsideFindById(currentNodeLeftRightAndId, updatedTree);

    return updateLeftRight(R.add(2, currentIndex), newUpdatedPath, newUpdatedTree);
  } else {
    return updateLeftRight(R.inc(currentIndex), currentNodeFirstDescendantPath, newTree);
  }
}

exports.updateLeftRight = R.curry(updateLeftRight);
