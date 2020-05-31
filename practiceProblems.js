// Start by creating a new object, invoices. The object requires a property
// named unpaid; unpaid should be an array that is initially empty.

var invoices = {
  unpaid: [],
};

// Write a method named add for the invoices object. This method should take two
// arguments: a string for the client name and a number for the amount they owe.
// The method should create a new object with these two arguments as properties,
// then push it onto the unpaid array. The object should look like
// { name: "Starbucks", amount: 300 }. Be sure to use the this keyword to
// reference the unpaid array in your method.

invoices.add = function(clientName, amountOwed) {
  this.unpaid.push({name: clientName, amount: amountOwed});
};

// Now that we have a way to store our unpaid invoices, we should have a way to
// compute the total amount of all unpaid invoices. Create a method on the
// invoices object named totalDue that iterates over the unpaid array and computes
// the total amount for its contents. Return the total at the end of the method.

invoices.totalDue = function() {
  return this.unpaid.reduce((acc, invoice) => {
    return acc + invoice.amount;
  }, 0);
};

invoices.add("Due North Development", 250);
invoices.add("Moonbeam Interactive", 187.50);
invoices.add("Slough Digital", 300);

console.log(invoices.totalDue());

// Now that we have some invoices, we need to add a way to mark invoices as paid.
// Add a paid property to the invoices object and initialize it as an empty Array;
// we will use this property to store the paid invoices.
//
// Now, create a method named payInvoice that takes a client name as an argument.
// Your method should loop over the unpaid invoices and check the name of each
// invoice. If the name matches, push the invoice object to the paid property.
// If the name does not match, push the invoice object to a new array defined as
// a local variable in your method. When the loop ends, replace the existing
// unpaid property with the newly created array of remaining unpaid invoices.

invoices.paid = [];
invoices.payInvoice = function(clientName) {
  for (let i = 0; i < this.unpaid.length; i++) {
    if (this.unpaid[i].name === clientName) {
      this.paid.push(this.unpaid.splice(i, 1)[0]);
      return;
    }
  }
};

// Create a method that is functionally identical to the totalDue method, but
// that computes and returns the total of the paid invoices. Name this new
// method totalPaid.

invoices.totalPaid = function() {
  return this.paid.reduce((acc, invoice) => {
    return acc + invoice.amount;
  }, 0);
}

// Call the payInvoice method twice, once with "Due North Development" as the
// argument, and once with "Slough Digital" as the argument. Then call totalPaid
// and totalDue, and log the results of both methods; they should be 550 and
// 187.50, respectively.

invoices.payInvoice("Due North Development");
invoices.payInvoice("Slough Digital");

console.log(invoices.totalPaid());
console.log(invoices.totalDue());
