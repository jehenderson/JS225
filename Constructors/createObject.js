// Create a function that can create an object with a given object as its prototype, without using Object.create.

function createObject(obj) {
  function Temporary() {}
  Temporary.prototype = obj;
  return new Temporary();
}

var foo = {
  a: 1
};

var bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true

// You could work through the __proto__ property, but a better solution is to
// create a "temporary" function, and set its prototype to the given object,
// then use the function to create objects. You don't have to worry about
// browser compatibility with this solution.
