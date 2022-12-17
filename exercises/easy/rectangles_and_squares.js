// Create a square subclass from rectangle calss

// OLOO

// let rectanglePrototype = {
//   init(width, length) {
//     this.width = width;
//     this.length = length;
//     return this;
//   },

//   getWidth() {
//     return this.width;
//   },

//   getLength() {
//     return this.length;
//   },

//   getArea() {
//     return this.width * this.length;
//   },
// };

// let squarePrototype = Object.create(rectanglePrototype);
// squarePrototype.init = function init(size) {
//   rectanglePrototype.init.call(this, size, size);
//   return this;
// }

// let olooSquare = Object.create(squarePrototype).init(5);

// console.log(olooSquare.getArea()); // 25

// console.log(olooSquare);

// Factory Function

// function rectangleFactory(length, width) {
//   return {
//     length,
//     width,

//     getWidth() {
//       return this.width;
//     },
  
//     getLength() {
//       return this.length;
//     },
  
//     getArea() {
//       return this.width * this.length;
//     },
//   }
// }

// function squareFactory(side) {
//   return rectangleFactory(side, side);
// }

// let square = squareFactory(5);

// console.log(square.getArea());


// Constructors and prototypes
// function Rectangle(width, length) {
//   this.width = width;
//   this.length = length;
// }


// Rectangle.prototype.getWidth = function() {
//   return this.width;
// }

// Rectangle.prototype.getLength = function() {
//   return this.length;
// }

// Rectangle.prototype.getArea = function() {
//   return this.width * this.length;
// }

// function Square(side) {
//   Rectangle.call(this, side, side);
// }

// Square.prototype = Object.create(Rectangle.prototype);
// Square.prototype.constructor = Square;

// let square = new Square(5);

// console.log(square.getArea());



class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}