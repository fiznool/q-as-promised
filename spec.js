'use strict';

require('mocha');

var expect = require('expect.js'),
    Q = require('./index.js');

describe('Q-as-promised', function() {
  it('should resolve a promise', function(done) {
    var fn = function(resolve) {
      resolve(1);
    };

    Q.asPromised(fn)
      .done(function(result) {
        expect(result).to.be(1);
        done();
      });
  });

  it('should reject a promise', function(done) {
    var fn = function(resolve, reject) {
      reject(2);
    };

    Q.asPromised(fn)
      .catch(function(err) {
        expect(err).to.be(2);
        done();
      });
  });

  it('should allow a deferred to be passed through', function(done) {
    var fn = function(resolve, reject, deferred) {
      var innerFn = function(deferred) {
        deferred.resolve(3);
      };
      innerFn(deferred);
    };

    Q.asPromised(fn)
      .done(function(result) {
        expect(result).to.be(3);
        done();
      });
  });

});