// Chapter 02 First Class Functions and Applicative Programming

/******************************************************************************/

// Functions as First-Class Things

// Almost every relative definition of FP seems to agree on one point:
// a functional programming language is one facilitating the use and creation
// of first-class functions.

// Typically, this point is accompanied by other qualifications including
// static typing, pattern matching, immutability, purity, etc. Those may be too
// specific.

// For this book, "first-class" means that something is just a value. A
// first-class function is one that can go anywhere that any other value can go.
// There are few to no restrictions. A number in JS is a first-class thing, and
// therefore a first-class function has a similar nature.

// A number can be stored in a variable and so can a function:
var fortytwo = function() { return 42 };

// A number can be stored in an array slot and so can a function:
var fortytwos = [42, function() { return 42}];

// A number can be stored in an object field and so can a function:
var fortytwos = {number: 42, fun: function() { return 42}};

// A number can be created as needed and so can a function:
42 + (function() { return 42})();

// A number ca be passed to a function and so can a function:
function weirdAdd(n, f) { return n + f() }

weirdAdd(42, function() { return 42 });

// A number can be returned from a function and so can a function:
return 42;

return function() { return 42 };

// The last two points define by example what we would call a higher-order
// function. A higher-order function can do one or both of the following:
// 1. Take a function as an assignment
// 2. Return a function as a result

// An example of a HOF:
_.each(['whiskey', 'tango', 'foxtrot'], function(word) {
  console.log(word.charAt(0).toUpperCase() + word.substr(1));
});
