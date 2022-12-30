

// Fix this code so it outputs the correct values on multiple invocations
// let item = {
//   name: 'Foo',
//   description: 'Fusce consequat dui est, semper.',
//   price: 50,
//   quantity: 100,
//   discount: function(percent) {
//     let discount = this.price * percent / 100;
//     this.price -= discount;
    
//     return this.price;
//   },
// };

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let discountedPrice = this.price - discount;

    return discountedPrice;
  },
};