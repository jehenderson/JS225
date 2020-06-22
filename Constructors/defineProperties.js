var obj = {
  name: 'Obj',
};

Object.defineProperties(obj, {
  age: {
    value: 30,
    writable: false,
  },
});

console.log(obj.age); // => 30
obj.age = 32;
console.log(obj.age); // => 30

// Using this method, create a function that constructs a new object with a
// log method that is read-only. The log method will use console.log to output
// the name property on itself.

function newPerson(name) {
  var obj = {name: name};
  Object.defineProperties(obj, {
    log: {
      value: function() {
        console.log(this.name);
      },
      writable: false,
    },
  });
  return obj;
}

var me = newPerson('Shane Riley');
me.log();     // => Shane Riley
me.log = function() { console.log('Amanda Rose'); };
me.log();     // => Shane Riley
