const ItemManager = (() => {
  let items = [];
  function isValid(item) {
    return (item.itemName.split(' ').join('').length > 4) &&
    (item.category.split(' ').length === 1 && item.category.length > 4) &&
    (item.quantity !== undefined);
  }
  function findIndexBy(skuCode) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].skuCode === skuCode) { return i }
    }
    return 'Error: Item not Found';
  }
  function getSkuCode(itemName, category) {
    let name = itemName.split(' ').join('');
    return (name.substring(0, 3) + category.substring(0, 2)).toUpperCase();
  }
  return {
    create(itemName, category, quantity) {
      let item = {
        skuCode: getSkuCode(itemName, category),
        itemName: itemName,
        category: category,
        quantity: quantity,
      };
      if (isValid(item)) {
        items.push(item);
      } else {
        return false;
      }
    },
    update(code, details) {
      let item = items[findIndexBy(code)];
      Object.keys(details).forEach(key => {
        item[key] = details[key];
      });
    },
    delete(code) {
      let index = findIndexBy(code);
      items.splice(index, index);
    },
    items: (function() {
      return items;
    })(),
    inStock() {
      return items.filter(item => item.quantity > 0);
    },
    itemsInCategory(cat) {
      return items.filter(item => {
        return item.category === cat;
      });
    },
    get: function(skuCode) {
      return items[findIndexBy(skuCode)];
    },
  };
})()

const ReportManager = (() => {
  return {
    init(itemManager) {
      this.items = itemManager;
    },
    createReporter(code) {
      let item = this.items.get(code);
      return {
        itemInfo() {
          for (let prop in item) {
            console.log(item[prop]);
          }
        },
      };
    },
    reportInStock() {
      let inStock = this.items.inStock().map(item => {
        return item.itemName;
      }).join(', ');
      console.log(inStock);
    },
  };
})()








ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
console.log("returns list with the 4 valid items");

ReportManager.init(ItemManager);
ReportManager.reportInStock();
console.log("logs soccer ball,football,kitchen pot");

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
console.log("returns list with the item objects for football and kitchen pot");

ReportManager.reportInStock();
console.log("logs football,kitchen pot");

console.log(ItemManager.itemsInCategory('sports'));
console.log("returns list with the item objects for basket ball, soccer ball, and football");

ItemManager.delete('SOCSP');
console.log(ItemManager.items);
console.log("returns list with the remaining 3 valid items (soccer ball is removed from the list)");

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
