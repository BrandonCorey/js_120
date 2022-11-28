function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    setPrice(price) {
      if (price >= 0) this.price = price;
      else console.log('Error: Invalid Price!');
    },

    describe() {
      for (let prop in this) {
        if (typeof this[prop] !== 'function') {
          console.log(
            `=> ${prop[0].toUpperCase()}${prop.slice(1)}: ${this[prop]}`
          );
        }
      }
    }
  };
}

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);


scissors.setPrice(1)
scissors.describe();