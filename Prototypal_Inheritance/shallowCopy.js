// Write a function to provide a shallow copy of an object.
// The object that you copy should share the same prototype chain as
// the original object, and it should have the same own properties that
// return the same values or objects when accessed. Use the code below
// to verify your implementation:

function shallowCopy(object) {
  var result = Object.create(object.getPrototypeOf(object));
  var prop;

  for (prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      result[prop] = object[prop];
    }
  }

  return result;
}

var foo = {
  a: 1,
  b: 2,
};

var bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

var baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
console.log(baz.hasOwnProperty('a'));  // false
console.log(baz.hasOwnProperty('b'));  // false
