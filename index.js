/*jshint esversion: 6 */

const R = require('ramda');

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

function height(node) {
  return R.prop('height', node);
}

function degree(node) {
  return R.prop('degree', node);
}

function depth(node) {
  return R.prop('depth', node);
}

function appendChild(parentId, nodeId, tree) {
  const descendantLens = R.lensProp('descendant');
  if (R.equals('root', nodeId)) {
    throw new Error('The id of the node can not be "root", please use another alias for your node.');
  } else if (R.equals('root', parentId)) {
    return R.over(descendantLens, R.append(newNode(nodeId)), tree);
  } else {
    console.log('Todo');
  }
}

function findById(nodeId, tree) {

}

function lengthZero(list) {
  return R.equals(0, R.length(list));
}

function updateLeftRight(currentIndex, currentPath, tree) {
  const currentNodeLens = R.lensPath(currentPath);
  const currentNodeLeftLens = R.lensPath(R.append('left', currentPath));
  const currentNodeRightLens = R.lensPath(R.append('right', currentPath));
  const currentNodeFirstDescendantPath = R.concat(currentPath, ['descendant', 0]);

  const currentNode = R.view(currentNodeLens, tree);
  const newTree = R.set(currentNodeLeftLens, currentIndex, tree);

  //console.log(currentNode);

  if (R.isNil(currentNode)) {
    if (R.equals(2, R.length(currentPath))) {
      console.log('a.1', tree);
      return R.assoc('right', currentIndex, tree);
    } else {
      console.log('a.2', tree);
      const newPath = R.dropLast(2, currentPath);
      const newUpdatedPath = R.adjust(R.inc, lengthMinusOne(newPath), newPath);
      return updateLeftRight(R.inc(currentIndex), newUpdatedPath, tree);
    }
  }
  if (lengthZero(descendant(R.view(currentNodeLens, newTree)))) {
    const updatedTree = R.set(currentNodeRightLens, R.inc(currentIndex), newTree);
    console.log('b', updatedTree);
    const newUpdatedPath = R.adjust(R.inc, lengthMinusOne(currentPath), currentPath);
    return updateLeftRight(R.add(2, currentIndex), newUpdatedPath, updatedTree);
  } else {
    console.log('c', newTree);
    return updateLeftRight(R.inc(currentIndex), currentNodeFirstDescendantPath, newTree);
  }
}

function lengthMinusOne(list) {
  return R.dec(R.length(list));
}

function descendant(node) {
  return R.prop('descendant', node);
}

function appendChildren(listOfChildren, tree) {
  if (lengthZero(listOfChildren)) {
    return updateLeftRight(1, [], tree);
  } else {
    const newTree = appendChild(...R.head(listOfChildren), tree);
    return appendChildren(R.tail(listOfChildren), newTree);
  }
}

function leftRight(node) {
  return R.pick(['left', 'right'], node);
}

function left(node) {
  return R.prop('left');
}

function right(node) {
  return R.prop('right');
}

const children = [
  ['root', 'men'],
  ['root', 'women'],
  ['root', 'children']
];
const mySet = nestedSet();
const newSet = appendChild('root', 'men', mySet);
const anotherNewSet = appendChildren(children, mySet);

//console.log(newSet);
console.log(anotherNewSet);
