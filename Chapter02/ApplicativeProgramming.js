var _ = require('underscore');

// Applicative Programming

/******************************************************************************/

// Up to this point only "applicative programming" has been discussed.
// Three canonical examples are map, reduce, and filter.

/******************************************************************************/

// Collection-Centric Programming

// FP is useful for operations that happen on many items in a collection. But
// what about objects?

_.map({a: 1, b: 2}, _.identity);
// => [1,2]

_.map({a: 1, b:2}, function(v, k) {
  return [k, v];
});
// => [['a', 1], ['b', 2]]

// This author emphasizes the notion of empowering data through the use of
// generic functions built on a collection-centric philosophy.

/******************************************************************************/

// Other examples of Applicative Programming

/******************************************************************************/

// Defining a Few Applicative Functions

// Define a function that takes a function and then calls it. A simple function
// that takes some number of arguments and concats them is NOT applicative:

function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

// Instead this is applicative:

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}
