// Create walkMixin with walk method that prints
// "Let's go for a walk!"

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

let walkMixin = {
  walk() {
    console.log("Let's go for a walk!");
  }
}

Object.assign(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());