var _ = require('underscore');

// JS is not strictly a functional programming language.
// It supports other paradigms:
// 1. Imperative programming
// 2. Prototype-based object-oriented programming
// 3. Metaprogramming

/******************************************************************************/

// Imperative Programming

// IP is categorized by attention to the details of algorithm implementation.
// They are often built around the direct manipulation and inspection of
// program state.

/******************************************************************************/

// Prototype-based object-oriented programming

// JS is similar to Java in that its constructor functions are classes.
// But the method of use is at a lower level. Whereas every instance in a Java
// program is generated from a class serving as its template, JS instances
// use existing objects to serve as prototypes for specialized instances.

// This relates to FP because functions can exist as values of object fields.
// Underscore itself is a perfect illustration:
_.each;

// => function(array, n, guard) {
// ...
// }

// Since JS is oo, it must have semantics for self-references. As it turns out,
// its self-reference semantics conflict with the notion of FP.

var a = {name: "a", fun: function() { return this; }};

a.fun();
// => {name: "a", fun:...};

var bFunc = function() { return this };
var b = {name: "b", fun: bFunc};

b.fun();
// => This return some global object, probably Window

// When a function is created outside of the context of an object instance, its
// this reference points to the global objects.

/******************************************************************************/

// Metaprogramming

// Definition: programming occurs when you write code to do something and
// metaprogramming occurs when you write code that changes the way that something
// is interpreted.

// In the case of JS, the dynamic nature of the this reference can be exploited
// to perform a bit of metaprogramming.

function Point2D(x, y) {
  this._x = x;
  this._y = y;
}

// When used with new, the Point2D function gives a new object instance with the
// proper fields set as you might expect:

var yo = new Point2D(0, 1)
console.log( yo )

// However, if you use Function.call, you can metaprogram a derivation of the
// Point2D constructor behavior for a new Point3D type:
function Point3D(x, y, z) {
  Point2D.call(this, x, y);
  this._z = z;
}

console.log( new Point3D(10, -1, 100) );
