// Implement makeCheckEven below, such that the last line of the code
// returns an array [2, 4].

var numbers = [1, 2, 3, 4];
function makeCheckEven() {
  return function(num) {
    return num % 2 === 0;
  }
}

var checkEven = makeCheckEven();

console.log(numbers.filter(checkEven)); // [2, 4]


// Implement execute below, such that the return values for the two
// function invocations match the commented values.

function execute(func, operand) {
  return func(operand);
}

console.log(execute(function(number) {
  return number * 2;
}, 10)); // 20

console.log(execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy')); // "HEY THERE BUDDY"

// Implement makeListTransformer below such that timesTwo's return value
// matches the commented return value.

function makeListTransformer(func) {
  return function(collection) {
    return collection.map(func);
  };
}

var timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

console.log(timesTwo([1, 2, 3, 4])); // [2, 4, 6, 8]

// Create a makeCounterLogger function that takes a number as an argument and
// returns a function. When we invoke the returned function with a second number,
// it should count up or down from the first number to the second number,
// logging each number to the console:

function makeCounterLogger(start) {
  return function(finish) {
    var i;

    if (start > finish) {
      for (i = start; i >= finish; i--) {
        console.log(i);
      }
    } else {
      for (i = start; i <= finish; i++) {
        console.log(i);
      }
    }
  };
}

var countlog = makeCounterLogger(5);
countlog(8);
// 5
// 6
// 7
// 8
countlog(2);
// 5
// 4
// 3
// 2

// We'll build a simple todo list program using the techniques we've seen in
// this assignment. Write a makeList function that returns a new function that
// implements a todo list. The returned function should have the
// following behavior:
//
// When called with an argument that is not already on the list, it adds
// that argument to the list.
// When called with an argument that is already on the list, it removes the
// element from the list.
// When called without arguments, it logs all items on the list. If the list
// is empty, it logs an appropriate message.
function makeList() {
  var list = [];
  var index;
  return function(item) {
    if (item === undefined) {
      console.log(list.length === 0 ? 'The list is empty.' : list.join('\n'));
    } else {
      index = list.indexOf(item);
      if (index < 0) {
        list.push(item);
        console.log(`${item} added!`);
      } else {
        list.splice(index, 1);
        console.log(`${item} removed!`);
      }
    }
  };
}

var list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book

// Write a function named makeMultipleLister that, when invoked and
// passed a number, returns a function that logs every positive integer
// multiple of that number less than 100. Usage looks like this:

function makeMultipleLister(num) {
  return function() {
    var i = 1;
    while (num * i < 100) {
      console.log(num * i);
      i++;
    }
  };
}

var lister = makeMultipleLister(13);
lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91

// Write a program that uses two functions, add and subtract, to manipulate a
// running total value. When you invoke either function with a number, it should
// add or subtract that number from the running total and log the new total to
// the console. Usage looks like this:

var totalValue = 0;

function add(num) {
  totalValue += num;
  console.log(totalValue);
}

function subtract(num) {
  totalValue -= num;
  console.log(totalValue);
}

add(1);
// 1
add(42);
// 43
subtract(39);
// 4
add(6);
// 10

// Write a function named later that takes two arguments: a function and an
// argument for that function. The return value should be a new function that
// calls the input function with the provided argument, like this:

function later(func, arg) {
  return function() {
    func(arg);
  };
}

var logWarning = later(console.log, 'The system is shutting down!');
logWarning();
// The system is shutting down!
