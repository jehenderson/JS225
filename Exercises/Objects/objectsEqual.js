// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

function objectsEqual(a, b) {
  if (a === b) { return true }
  if (Object.keys(a).length !== Object.keys(b).length) { return false };

  let keys = Object.keys(a);
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (a[key] !== b[key] || !(b.hasOwnProperty(key))) { return false };
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
