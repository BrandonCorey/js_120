let obj1 = {
  banana: 'banana',
  addArr() {
    this.sum = this.values.reduce((a, b) => a + b);
  },
};

let obj2 = {
  values: [100, 145, 2345, 323, 234],
  sum: 0,
};

function add(num) {
  this.sum += num;
}



obj1.addArr.call(obj2);
console.log(obj2.sum); // 3147
add.call(obj2, 5);
console.log(obj2.sum) // 3152

function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
maxi.bark(); // 'Woof!'

maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
console.log(Object.getPrototypeOf(maxi).bark === Dog.prototype.bark); // true
Object.getPrototypeOf(dexter).bark === Dog.prototype.bark; // true
Object.getPrototypeOf(biggie).bark === Dog.prototype.bark; // true