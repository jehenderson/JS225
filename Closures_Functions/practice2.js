// Write a function named greet that takes two arguments and logs a greeting:

function greet(salutation, name) {
  var capSal = salutation[0].toUpperCase()+salutation.slice(1);
  var message = `${capSal}, ${name}!`;
  console.log(message);
}

greet('howdy', 'Joe');
// Howdy, Joe!
greet('good morning', 'Sue');
// Good morning, Sue!

// Use the partial function shown above and your solution to problem 1 to
// create sayHello and sayHi functions that work like this:

function sayHello(name) {
  return greet('hello', name);
}

function sayHi(name) {
  return greet('hi', name);
}

sayHello('Brandon');
// Hello, Brandon!
sayHi('Sarah');
// Hi, Sarah!
