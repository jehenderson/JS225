// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) { return true; };
  if (Object.keys(obj1).length !== Object.keys(obj2).length) { return false; };

  let aKeys = Object.getOwnPropertyNames(obj1);
  let bKeys = Object.getOwnPropertyNames(obj2);

  for (let i = 0; i < Object.keys(obj1).length; i++) {
    if (obj1[aKeys[i]] !== obj2[bKeys[i]]) { return false; };
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
