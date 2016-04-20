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

/******************************************************************************/

// Functions as units of abstraction

function parseAge(age) {
  if (!_.isString(age)) throw new Error("Expecting a string");
  var a;

  console.log("Attempting to parse an age");

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    console.log(["Could not parse age:", age].join(' '));
    a = 0;
  }

  return a;
}

// parseAge("42");
// parseAge(42);

// A better approach is to abstract the notion of errors, info and warnings into
// other functions

function fail(thing) {
  throw new Error(thing);
}

function warn(thing) {
  console.log(["Warning:", thing].join(' '));
}

function note(thing) {
  console.log(["NOTE:", thing].join(' '));
}

// Using these functions, parseAge can be rewritten:

function parseAge(age) {
  if (!_.isString(age)) fail("Expecting a string");
  var a;

  note("Attempting to parse an age");

  if (_.isNaN(a)) {
    warn(["Could not parse age:", age].join(' '));
    a = 0;
  }

  return a;
}

// Behavior is contained within a single function.

/******************************************************************************/

// Encapsulation and Hiding

// The term 'encapsulation' in OOP refers to a way of packaging certain pieces
// of data with the very operations that manipulate them.

// JS provides an object system that does indeed allow you to encapsulate data
// with its manipulators. However, sometimes encapsulation is used to restrict
// the visibility of certain elements, and this act is know as data hiding.

// JS object system does not provide a way to hide data directly, so data is
// hidden with closures.

// By using functional techniques involving closures, you achieve data hiding
// that is as effective as the same capability offered by most object-oriented
// languages.

/******************************************************************************/

// Functions as Units of Behavior

// Hiding data and behavior is just one way that functions can be units of
// abstraction. Another is to provide an easy way to store and pass around
// discrete units of basic behavior.

var letters = ['a', 'b', 'c'];

letters[1];

function naiveNth(a, index) {
  return a[index];
}

// This function will fail if given something unexpected.

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1))
    fail("Index value is out of bounds");
  return a[index];
}

// nth(letters, 1);

// Just as nth abstraction was built out of an indexed abstraction, a second
// abstraction can be built

function second(a) {
  return nth(a, 1);
}

/******************************************************************************/

// Data as Abstraction

/******************************************************************************/

// A Taste of Functional JavaScript

function existy(x) { return x != null }

console.log(existy(null))

console.log( existy(undefined) );

console.log( existy({}.notHere) );

console.log( existy((function(){})()) );

console.log( existy(0) );

console.log( existy(false) );

function truthy(x) { return (x !== false) && existy(x) }

function doWhen(cond, action) {
  if (truthy(cond))
    return action();
  else
    return undefined;
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log(['The result is', result].join(' '));
    return result;
  });
}

// The definition of an abstraction for "existence" in the guise of a function
// The definition of an abstraction for "truthiness" built from existing functions
// The use of said functions by other functions via parameter passing to achieve
// some behavior

/******************************************************************************/

// Summary

// Identify an abstraction and build a function for it
// Using existing functions to build more complex abstractions
// Passing existing functions to other functions to build even more complex funcs

// However, functions aren't enough. FP very often works best when implemented
// in convert with powerful data abstractions. 
