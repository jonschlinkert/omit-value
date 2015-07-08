'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var omit = require('./');

describe('omit', function () {
  it('should omit a value:', function () {
    var obj = {foo: {a: 'b', c: 'd'}, bar: {x: 'y'}};
    omit(obj, 'foo').should.eql({bar: {x: 'y'}});
  });

  it('should omit a nested value:', function () {
    var obj = {foo: {a: 'b', c: 'd'}};
    omit(obj, 'foo', 'a');
    obj.foo.should.eql({c: 'd'});
  });

  it('should omit a deeply nested value:', function () {
    var obj = {foo: {bar: {baz: {a: 'b', c: 'd'}}}}
    omit(obj, 'foo.bar.baz', 'c');
    obj.foo.bar.baz.should.eql({a: 'b'});
  });

  it('should omit multiple deeply nested values:', function () {
    var obj = {foo: {bar: {baz: {a: 'b', c: 'd', e: 'f', g: 'h'}}}}
    omit(obj, 'foo.bar.baz', ['a', 'c', 'g']);
    obj.foo.bar.baz.should.eql({e: 'f'});
  });

  it('should throw an error:', function () {
    (function () {
      omit();
    }).should.throw('omit-value expects the first argument to be an object.');

    (function () {
      omit({});
    }).should.throw('omit-value expects `prop` to be a string.');
  });
});
