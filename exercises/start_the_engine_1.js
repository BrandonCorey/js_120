// Change the following code so that creating a 
// new Truck automatically invokes startEngine.

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year); // Must invoke super to use this keyword in constructor of a subclass
    this.startEngine(); // Can invoke instance methods on instantation by putting a call in the constructor;
  }
  startEngine() {
    console.log('Ready to go!');
  }
}

let truck = new Truck(2003);
console.log(truck.year); // 2003