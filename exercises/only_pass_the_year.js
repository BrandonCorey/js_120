// Using the following code,
// allow Truck to accept a second argument upon instantiation.
// Name the parameter bedType and implement the modification 
// so that Car continues to only accept one argument.


class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year); // Only use super when we want modify contructor for sub class. If subclass has all same stuff, no need for constructor
    this.bedType = bedType;
  }
}

class Car extends Vehicle {}

let truck1 = new Truck(2003, 'Short');
console.log(truck1.year);
console.log(truck1.bedType);


// In the solution, we added constructor method to Truck instead of modifying 
// constructor in Vehicle because we didn't want Car to accept the bedType parameter.