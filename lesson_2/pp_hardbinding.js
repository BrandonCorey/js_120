// What method can we use to bind a function 
// permanently to a particular execution context?

// The 'bind' method

// What will the following code log to the console?
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
// Nothing because bind returns a function that is bound to obj
// the new function must then be called to log anything

// What will the following code output?
obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let baz = foo.bind(obj);

console.log(foo()); // This should return NaN? or undefined maybe
console.log(baz()); // This will return 5


// What will the code below log to the console?
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function qux() {
  console.log(this.message);
}

let bar = qux.bind(positivity);

negativity.logMessage = qux;
negativity.logMessage();
// Logs javascript makes sense
// bar is a reference to foo function bound to positivity
// we then pass that reference to negativity.logMessage

//5. What will the following code output?
let obj1 = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar1 = foo.bind(obj1);

bar1.call(otherObj);

// This will log 'Amaezbulous' because bar1 is bound to obj1
// Once bound, it cannot be unbound using 'call' or 'apply'