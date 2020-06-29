let Account = (() => {
  let userEmail;
  let userPw;
  let userFirst;
  let userLast;
  let displayName;
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

  function randInt(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  function anonymize() {
    let letter;
    let name = [];
    let capitalized;

    for (var i = 0; i < 16; i++) {
      letter = ALPHABET[randInt(26)];
      capitalized = randInt(2) === 0;
      capitalized ? name.push(letter) : name.push(letter.toUpperCase());
    }

    return name.join('');
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPw = password;
      userFirst = firstName;
      userLast = lastName;
      displayName = anonymize();
      return this;
    },
    reanonymize(pw) {
      if (pw === userPw) {
        displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    resetPassword(prevPw, newPw) {
      if (prevPw === userPw) {
        userPw = newPw;
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    firstName(pw) {
      return pw === userPw ? userFirst : 'Invalid Password';
    },
    lastName(pw) {
      return pw === userPw ? userLast : 'Invalid Password';
    },
    email(pw) {
      return pw === userPw ? userEmail : 'Invalid Password';
    },
    displayName() { return displayName; },
  };
})();


const fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName());                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

const displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
