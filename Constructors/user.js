// Since a constructor is just a function, it can be called without the new
// operator, and this can lead to unexpected results and errors especially
// for inexperienced programmers.
//
// Write a constructor function that can be used with or without the new operator,
// and return the same result in either form. Use the code below to check your
// solution:

function User(first, last) {
  if (this instanceof User) {
    let obj = {};
    obj.name = `${first} ${last}`;
    return obj;
  } else {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
