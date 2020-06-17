// Since a constructor is just a function, it can be called without the new operator,
// and this can lead to unexpected results and errors especially for inexperienced programmers.
//
// Write a constructor function that can be used with or without the new operator,
// and return the same result in either form. Use the code below to check your solution:

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  } else {
    this.first = first;
    this.last = last;
    this.name = this.first + " " + this.last;
  }
}

var name = 'Jane Doe';
var user1 = new User('John', 'Doe');
var user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

// In the constructor function, first check the value of this to see if it is an
// instance of the constructor function. Since, if it's called with the new operator
// JavaScript sets the value of this behind the scenes. Given that, check if it's
// used as a regular function (invoked without the new), if it is invoke itself
// with the new operator and return the result. If it is used as a constructor
// function, run the rest of the code in the function.
