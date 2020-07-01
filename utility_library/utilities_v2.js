(function() {
  var _ = function(element) {
    u = {
      // first, return the first element in an array.
      first: function() {
        return element[0];
      },
      // last, return the last element in an array.
      last: function() {
        return element[element.length - 1];
      },
      // without, return a new array that does not contain the value passed to it.
      without: function(...values) {
        return element.filter(el => !values.includes(el));
      },
      // lastIndexOf, return the last index of the supplied value.
      lastIndexOf: function(value) {
        var idx = -1;
        for (var i = element.length - 1; i >= 0 ; i--) {
          if (element[i] === value) {
            idx = i;
            break;
          }
        }
        return idx;
      },
      // sample, return a single value from an array when no argument is supplied.
      // Return an array of multiple, non-repeated elements when a quantity is supplied.
      sample: function(qty) {
        var sampled = [],
            copy = element.slice(),
            get = function() {
              var idx = Math.floor(Math.random() * copy.length),
                  el = copy [idx];
                  copy.splice(idx, 1);
              return el;
            };

        if (qty === undefined) { return get(); }
        while (qty > 0) {
          sampled.push(get());
          qty -= 1;
        }

        return sampled;
      },
      // findWhere, return the first object with properties that match the supplied
      // object. If no objects match all the supplied properties, undefined is returned.
      findWhere: function(props) {
        var match;

        element.some(obj => {
          var allMatch = true;

          for (var prop in props) {
            if (!(prop in obj) || obj[prop] !== props[prop]) {
              allMatch = false;
            }
          }

          if (allMatch) {
            match = obj;
            return true;
          }
        });

        return match;
      },
      // where, return an array of all objects with properties that match the supplied object.
      where: function(props) {
        return element.filter(obj => {
          var allMatch = true;

          for (var prop in props) {
            if (!(prop in obj) || obj[prop] !== props[prop]) {
              allMatch = false;
            }
          }

          return allMatch;
        });
      },
      // pluck, return an array of the values that match the supplied key from a
      // collection of objects.
      pluck: function(key) {
        return element.filter(obj => {
          return obj[key];
        }).map(obj => obj[key]);
      },
      // keys, return an array of the keys from an object.
      keys: function() {
        return Object.keys(element);
      },
      // values, return an array of the values from an object.
      values: function() {
        return Object.values(element);
      },
      // pick, return a new object with the passed in properties taken from the
      // old object. Accepts one or more arguments.
      pick: function(...props) {
        let newObj = {};

        for (var i = 0; i < props.length; i++) {
          let prop = props[i];
          newObj[prop] = element[prop];
        }

        return newObj;
      },
      // omit, return a new object with any passed in properties omitted.
      omit: function(exclude) {
        let newObj = {};

        for (var prop in element) {
          if (prop !== exclude) { newObj[prop] = element[prop] }
        }

        return newObj;
      },
      // has, return true when the property passed in exists, false if it doesn't.
      has: function(prop) {
        return Object.keys(element).includes(prop);
      },
    };

    (["isElement", "isArray", "isObject", "isFunction",
    "isBoolean", "isString", "isNumber"]).forEach(method => {
      u[method] = () => _[method].call(u, element);
    });

    return u;
  };
  // range, return an array of values starting at 0 when a single number is supplied.
  // If two arguments are supplied, returns an array of values that start with the
  // first argument and ends with the one number less than the second argument.
  _.range = function(start, end) {
    let r = [];
    if (end !== undefined) {
      for (let i = start; i < end; i++) {
        r.push(i);
      }
    } else {
      for (let i = 0; i < start; i++) {
        r.push(i);
      }
    }

    return r;
  };
  // extend, takes two or more objects, taking the properties and values from
  // the last argument and adding them to the argument before it. Object
  // extensions occur recursively from last argument to first. The first
  // argument ends up being modified to include all properties and values
  // from the other objects passed in.
  _.extend = function(...objects) {
    var args = objects,
        oldObj = args.pop(),
        newObj = args[args.length - 1];

    for (var prop in oldObj) {
      newObj[prop] = oldObj[prop];
    }

    return args.length === 1 ? newObj : _.extend.apply(_, args);
  };
  // isElement, return true if argument is a DOM element.
  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };
  // isArray, return true if argument is an array.
  _.isArray = function(obj) {
    return obj && Array.isArray(obj);
  };
  // isObject, return true if argument is an object or a function.
  _.isObject = function(obj) {
    return obj && (typeof obj === 'object' || typeof obj === 'function');
  };
  // isFunction, return true if argument is a function.
  _.isFunction = function(obj) {
    return obj && typeof obj === 'function';
  };
  // isString, return true if argument is a string.
  _.isString = function(obj) {
    return toString.call(obj) === '[object String]';
  };
  // isNumber, return true if argument is a number. Also returns true for
  // objects created with the Number constructor.
  _.isNumber = function(obj) {
    return toString.call(obj) === '[object Number]';
  };
  // isBoolean, return true if argument is a boolean. Also returns true for
  // objects created with the Boolean constructor.
  _.isBoolean = function(obj) {
    return toString.call(obj) === '[object Boolean]';
  };

  window._ = _;
})();
