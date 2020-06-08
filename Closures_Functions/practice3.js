var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum);

// Implement a function countdown that uses an IIFE to generate the desired output.

function countdown(timer) {
  return (function(n) {
    for (var i = n; i >= 0; i--) {
      console.log(i);
    }
    console.log('Done!');
  })(timer);
}

countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!
