// Create an object named account that represents a bank account. It should
// contain a balance property that stores the account's current balance.

// function makeAccount(number) {
//   var number;
//   var balance = 0;
//   var transactions = [];
//   return {
//     number: function() {
//       return number;
//     },
//     balance: function() {
//       return balance;
//     },
//     transactions: function() {
//       return transactions;
//     },
//     deposit: function(amount) {
//       transactions.push({type: 'deposit', amount: amount});
//       balance += amount;
//       return balance;
//     },
//     withdraw: function(amount) {
//       if (amount > balance) {
//         amount = balance;
//       }
//       this.transactions.push({type: 'withdrawal', amount: amount});
//       this.balance -= amount;
//       return this.balance;
//     },
//     send: function(amount) {
//       if (amount > this.balance) {
//         console.log("Insufficient funds!");
//         return;
//       } else {
//         this.transactions.push({type: 'transfer', amount: amount});
//         this.balance -= amount;
//         return this.balance;
//       }
//     },
//     receive: function(amount) {
//       this.transactions.push({type: 'transfer', amount: amount});
//       this.balance += amount;
//       return this.balance;
//     },
//   };
// }

// Add a deposit method to the account object that takes a single argument,
// the value of the deposit. Add the value of the deposit to the account's balance,
// and then return it.

// console.log(account.balance);
// // = 0
// console.log(account.deposit(42));
// // = 42
// console.log(account.balance);
// // = 42

// Add a withdraw method to the account object that takes a single argument,
// the amount to withdraw. It should subtract the amount from the account's
// balance and return the amount subtracted.

// console.log(account.balance);
// // = 100
// console.log(account.withdraw(19));
// // = 19
// console.log(account.balance);
// // = 81

// Each account should have a record of every deposit and withdrawal
// applied to it. To do this, add a property named transactions to account
// that contains an array of transactions, each of which is an object with
// type and amount properties.

// account.deposit(23);
// // = 23
// account.transactions;
// // = [{...}]
// account.transactions[0];
// // = {type: "deposit", amount: 23}

// We want to create more than one account. Move the account creation code to
// a function named makeAccount that returns a new account object.

// var account = makeAccount();
// console.log(account.deposit(15));
// // = 15
// console.log(account.balance);
// // = 15
// var otherAccount = makeAccount();
// console.log(otherAccount.balance);
// // = 0

// We also need an object to manage accounts: a bank. Create a function that
// returns an object that represents a bank. The bank should have a property
// named accounts that represents a list of accounts.

function makeBank() {
  return {
    accounts: [],
    openAccount: function() {
      var number = this.accounts.length + 101;
      var account = makeAccount(number);
      this.accounts.push(account);
      return account;
    },
    transfer: function(source, destination, funds) {
      source.send(funds);
      destination.receive(funds);
      return funds;
    },
  };
}

// var bank = makeBank();
// bank.accounts;
// // = []

// Add a new method named openAccount to the object returned by makeBank.
// It should create a new account, add it to the bank's accounts collection,
// and return the new account. Each new account should have a unique account
// number, starting at 101; each account number should be one greater than the
// previous account created.

// var bank = makeBank();
// var account = bank.openAccount();
// console.log(account.number);
// // = 101
// console.log(bank.accounts);
// // = [{...}]
// console.log(bank.accounts[0]);
// // = {number: 101, balance: 0, transactions: Array[0]}
// var secondAccount = bank.openAccount()
// console.log(secondAccount.number);
// // = 102

// Add a new method to the bank object that transfers money from one
// account to another.

// var bank = makeBank();
// var source = bank.openAccount();
// console.log(source.deposit(10));
// // = 10
// var destination = bank.openAccount();
// console.log(bank.transfer(source, destination, 7));
// // = 7
// console.log(source.balance);
// // = 3
// console.log(destination.balance);
// // = 7

// Change the code so that users can access the account balance, account number,
// and transactions list by calling methods, but not by directly accessing those
// properties.

var bank = makeBank();
var account = bank.openAccount();
account.balance();
// = 0
account.deposit(17);
// = 17
var secondAccount = bank.openAccount();
secondAccount.number();
// = 102
account.transactions();
// > [Object]

function makeBank() {
  var accounts = [];

  function makeAccount(number) {
    var balance = 0;
    var transactions = [];

    return {
      deposit: function(amount) {
        transactions.push({type: "deposit", amount: amount});
        balance += amount;
        return amount;
      },

      withdraw: function(amount) {
        if (amount > balance) {
          amount = balance;
        }

        transactions.push({type: "withdraw", amount: amount});
        balance -= amount;
        return amount;
      },

      balance: function() {
        return balance;
      },

      number: function() {
        return number;
      },

      transactions: function() {
        return transactions;
      },
    };
  }

  return {
    openAccount: function() {
      var number = accounts.length + 101;
      var account = makeAccount(number);
      accounts.push(account);
      return account;
    },

    transfer: function(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    },
  };
}
