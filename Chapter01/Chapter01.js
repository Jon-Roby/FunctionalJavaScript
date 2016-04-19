var _ = require('underscore');

/******************************************************************************/

// Example of a function that returns another function

function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
}

var addArrayElements = splat(function(x, y) { return x + y });

// console.log( addArrayElements([1,2]) );

/******************************************************************************/

// A function may be called with any number of arguments of any type, at any
// time.

function unsplat(fun) {
  return function() {
    return fun.call(null, _.toArray(arguments));
  };
}

var joinElements = unsplat(function(array) { return array.join(' ') });

// console.log( joinElements(1, 2) );
// console.log( joinElements('-', '$', '/', '!', ':') );
