// Using the following code, create two classes 
// - Truck and Car - that both inherit from Vehicle.

class Vehicle {
  constructor(year) {
    this.year = year;
  }

  greet() {
    console.log('hello')
  }
}

class Truck extends Vehicle{
  constructor(year) {
    super(year);
  }
}


class Car extends Vehicle {
  constructor(year) {
    super(year);
  }
}

let truck = new Truck(2003);
console.log(truck.year); // 2003

let car = new Car(2015);
console.log(car.year); // 2015


truck.greet();

//OLOO

// let Vehcile = {
//   init(year) {
//     this.year = year;
//     return this;
//   }
// }

// let Car = Object.create(Vehicle).init(2003);
// let Truck = Object.create(Vehicle).init(2015);