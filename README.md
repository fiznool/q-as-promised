# Q-as-promised

A simple wrapper around the awesome [Q promise library](https://github.com/kriskowal/q), making working with deferreds a little easier.

## Usage

When working with [Q's deferreds](https://github.com/kriskowal/q#using-deferreds), you'll typically do this:

``` js
var deferred = Q.defer();
FS.readFile("foo.txt", "utf-8", function (error, text) {
  if (error) {
    deferred.reject(new Error(error));
  } else {
    deferred.resolve(text);
  }
});
return deferred.promise;
```

With `q-as-promised`, you'll instead do this:

``` js
return Q.asPromised(function(resolve, reject) {
  FS.readFile("foo.txt", "utf-8", function (error, text) {
    if (error) {
      reject(new Error(error));
    } else {
      resolve(text);
    }
  });
});
```

If you need the deferred for any reason (e.g. you'd like to pass it down to another function for use) it is available as the third argument.

``` js
var loadDynamicModule = function(somePath) {
  return Q.asPromised(function(resolve, reject, deferred) {
    try {
      var module = require(somePath);  // This could throw an exception if path is invalid
      module.doStuff(deferred);   // The module accepts a deferred to resolve and reject itself
    } catch(error) {
      reject(new Error(error));
    }
  });
};
```

## Other Stuff

This really is just a thin wrapper around Q, adding one extra function. So you can still use everything that Q gives you.

## Gotchas

Currently only works for node.js or CommonJS environments.

## Running tests

`npm install && npm test`

## With thanks

Inspired by [rsvp.js](https://github.com/tildeio/rsvp.js/).

## License

MIT.