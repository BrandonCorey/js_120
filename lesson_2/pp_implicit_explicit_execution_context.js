// 1. What will the following code output?
// Try to determine the results without running the code.

function func() {
  return this;
}

let context = func();

console.log(context);

// It will log '[global object]'

// 2. What will the following code output?
// Explain the difference, if any,
// between this output and that of problem 1.

let obj = {
  func: function() {
    return this;
  },
};

context = obj.func();

console.log(context);

// It will log {func: [Function: func]} as the context refers to obj


// 3. What will the following code output?

message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); // 'Hello from the global scope!'

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage(); // 'Hello from the function scope'


// We are creating a deliverMessge method inside foo

// What built-in methods have we learned about that we can use to 
// specify a function's execution context explicitly?

// call and apply

foo = {
  a: 1,
  b: 2,
};

bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

let result = bar.add.call(foo);
console.log(result)