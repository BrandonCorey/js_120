// function Animal(species, family) {
//   this.species = species;
//   this.family = family;
// }

// Animal.prototype.description = function() {
//   console.log(`${this.species} is a ${this.family}, part of the Animal Kingdom`) // putting this inside constructor would give all instances their own versin, which we don't want
// }

// function BigCat(species, family) {
//   Animal.call(this, species, family);
  
//   BigCat.instances.push(this);
  
// }

// BigCat.genus = 'panthera';

// BigCat.prototype.all = function() {
//   console.log(['tiger', 'lion', 'jaugar', 'leopard'].join(', '));
// }

// BigCat.prototype = Object.create(Animal.prototype);

// BigCat.prototype.constructor = BigCat;
// console.log((BigCat.prototype).hasOwnProperty('constructor')); // overwriting inhertied constructor prop from Object.prototype.constuctor with new explicit one to point back to self
// BigCat.instances = [];

// let tiger = new BigCat('panethera tigris', 'mammal');

// let lion = new BigCat('panthera leo', 'mammal')


// tiger.description();
// lion.description();
// console.log(tiger.hasOwnProperty('description'));

// Now do the same thing with ES6 classes


class Animal {
  constructor(species, family) {
    this.species = species;
    this.family = family;

  }
  
  description() {
    console.log(`${this.species} is a ${this.family}, part of the Animal Kingdom`)
  }
}

class BigCat extends Animal {
  constructor(species, family, name) {
    super(species, family);
    
    this.name = name;

    BigCat.instances.push(this);
  }

  static genus = 'panethera'
  static instances = [];

  static all = function() {
    console.log(['tiger', 'lion', 'jaugar', 'leopard'].join(', '));
  }

}

let tiger = new BigCat('panthera tigris', 'mammal', 'tony');

console.log(tiger);
BigCat.all();
tiger.description();