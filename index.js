'use strict';

var Q = require('q');

Q.asPromised = function(fn) {
  var deferred = Q.defer();
  fn(deferred.resolve, deferred.reject, deferred);
  return deferred.promise;
};

module.exports = Q;