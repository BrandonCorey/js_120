// Consider the following

function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// What happens in each of the following cases? Try to answer without running the code.
let hello = new Hello();
hello.hi();
// Logs hello, hello.hi --> hello.hi calls hello.greet --> Hello.prototype.greet (not found) --> Greeting.prototype.greet (found!)

hello = new Hello();
hello.bye();
// Type error, hello.bye is not a function. bye is defined in Goodbye.prototype, which Hello does not have access to as it is further down the prototype chain

hello = new Hello();
hello.greet();
// Will log undefined. Hello has access to greet as it is in Hello.prototype.__proto__ (Greeting.prototype) but no arguments are passed, so undefined is printed

hello = new Hello();
hello.greet('Goodbye');
// Will log 'Goodbye'

Hello.hi();
// Type error, Hello.hi is not a function