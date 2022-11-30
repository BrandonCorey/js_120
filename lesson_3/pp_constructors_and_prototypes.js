// What does the following code log to the console?
// Try to answer without running the code.
// Can you explain why the code produces the output it does?

let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area); // NaN (context issue, this inside of RECTANGLE is pointing to rectangle based on object method invocation)
console.log(rect1.perimeter); // NaN (context issue, this inside of RECTANGLE is pointing to rectangle based on object method invocation)

// How would you fix the problem in the code from problem 1?

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this); // Using RECTANGLE methods to get area and perimeter
  this.perimeter = RECTANGLE.perimeter.call(this); // Using 'this' as execution context, which will point to newly created object when called with new
}

console.log(rect1.area);
console.log(rect1.perimeter);

// Write a constructor function called Circle that takes a radius as an argument.
// You should be able to call an area method on any objects created by the constructor 
// to get the circle's area. Test your implementation with the following code:

// area = Math.PI * radius ** 2;

function Circle(radius) {
  this.radius = radius;

}

Circle.prototype.area = function() {return Math.PI * this.radius ** 2}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false


// What will the following code log to the console and why?

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swung = 'banana';

Ninja.prototype.swingSword = function() {
  return this.swung; // 
};

console.log(ninja.swingSword() === ninja.swung); // true
console.log(ninja.swingSword() === Ninja.prototype.swung)  // false 
// looks for swingSword in ninja, doesn't find it, looks in Ninja.prototype, finds it, returns this(which points to ninja object method call).swung
// if swung didn't exist in ninga, it would look in Ninja (comment out line 62 to see this)

// What will the following code output and why?
// Try to answer without running the code.
function newNinja() {
  this.swung = true;
}

ninja = new newNinja();

newNinja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

// console.log(ninja.swingSword());
// Replaces prototype object with new object {swingSword: [Function]}
// the __proto__ is still pointing to the old prototype object, which is currently empty
// as a result, we get Uncaught type error: ninja.swingSword is not a function
// Summary: Reassigning prototype property does not change inheriting objects dunder proto reference

// Implement the method described in the comments below:
function newestNinja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
newestNinja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
}

let ninjaA = new newestNinja();
let ninjaB = new newestNinja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`

// In this problem, we'll ask you to create a new instance of an object,
// without having direct access to the constructor function:

let newNinjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  newNinjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let newNinjaB = new newNinjaA.constructor() // newNinjaA.constructor points back to Ninja, so newNinja.constructor() === Ninja()

newNinjaA.constructor === newNinjaB.constructor // => true

// Create a constructor function that works with or without new keyword
function User(first, last) {

  if (!(this instanceof User)) { // If user was not called with new keyword (any object creeated with new would be an instance of User)
    return new User(first, last); // return a call of User with new (recurses creates new object that IS an instance of User, skips to bottom, creates name)
  }
  
  this.name = first + ' ' + last;
 
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe