'use strict';

var isObject = require('is-extendable');
var omit = require('object.omit');
var get = require('get-value');
var set = require('set-value');

module.exports = function omitValue(obj, prop, keys) {
  if (!isObject(obj)) {
    throw new TypeError('omit-value expects the first argument to be an object.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('omit-value expects `prop` to be a string.');
  }

  if (typeof keys === 'undefined') {
    return omit(obj, prop);
  }

  var val = get(obj, prop);
  set(obj, prop, omit(val, keys));
  return obj;
};
