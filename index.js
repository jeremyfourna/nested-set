/*jshint esversion: 6 */

const R = require('ramda');
const {
  nestedSet,
  appendChild,
  appendChildren
} = require('./src/nested-set');

const children = [
  ['root', 'men'],
  ['root', 'women'],
  ['men', 'suits']
];
const mySet = nestedSet();
//const newSet = appendChild('root', 'men', mySet);
const anotherNewSet = appendChildren(children, mySet);

//console.log(newSet);
//console.log(anotherNewSet);
