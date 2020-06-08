// Reimplement makeList, so that it returns an Object that provides the
// interface shown above, including add, list, and remove methods.

function makeList() {
  var items = [];
  var index;
  return {
    add: function(item) {
      index = items.indexOf(item);
      if (index === -1) {
        items.push(item);
        console.log(`${item} added!`);
      }
    },
    list: function() {
      if (items.length === 0) {
        console.log('The list is empty!');
      } else {
        console.log(items.join('\n'));
      }
    },
    remove: function(item) {
      index = items.indexOf(item);
      if (index === -1) {
        console.log('Item not found in list.');
      } else {
        items.splice(index, 1);
        console.log(`${item} removed from list!`);
      }
    }
  };
}

var list = makeList();
list.list();
// The list is empty.
list.add('make breakfast');
// make breakfast added!
list.add('read book');
// read book added!
list.list();
// make breakfast
// read book
list.remove('make breakfast');
// make breakfast removed!
list.list();
// read book
