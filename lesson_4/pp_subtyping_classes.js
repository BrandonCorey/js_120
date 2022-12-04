// What would happen if we added a play method to the Bingo class,
// keeping in mind that there is already a method of this name in the Game
// class from which the Bingo class inherits? Explain your answer.
// What do we call it when we define a method like this?

class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

// if we define a play method on the bingo class, then any calls of the play method on an instance of bingo will use that version of the method opposed to the one inside of Game.prototype
// this is called method overriding

// Let's practice creating a class hierarchy.

// Create class Greeting that has a single method name greet
// greet takes string as arg, prints it to console

// create two more classes that inherit from Greeting
// one named Hello with a hi method that takes no args and logs 'hello'
// one named Goodbye that takes no args and logs 'Goodbye'
// use the greet method from Greet when implemeting Hello and Goodbye

let Greet = class {
  greet(string) {
    console.log(string);
  }
};

let Hello = class extends Greet {
  hi() {
    this.greet('Hello');
  }
};

let Goodbye = class extends Greet {
  goodbye() {
    this.greet('Goodbye');
  }
};


let greeter = new Greet();
let helloer = new Hello();
let goodbyeer = new Goodbye();

greeter.greet('string');
helloer.hi();
goodbyeer.goodbye();