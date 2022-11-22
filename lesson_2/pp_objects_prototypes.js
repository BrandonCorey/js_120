// // 1. What will the following code log to the console? 
// // Explain why it logs that value. 
// // Try to answer without running the code.

// let qux;
// let baz;

// qux = { foo: 1 };
// baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

// // This will log 2 to the console.
// // We are adding the value 1 together twice

// // 2. What will the following code log to the console?
// // Explain why it logs that value.
// // Try to answer without running the code.

// qux = { foo: 1 };
// baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);
// // This will log 3
// // We are giving baz its own foo property
// // - This means JS does not need to search up the prototype chain
// // Since qux is unaffected, it results in 2 + 1

// delete baz.foo // Doing this to get rid of foo property for next problem

// // What will the following code log to the console?
// // Explain why it logs that value.
// // Try to answer without running the code.

// qux = { foo: 1 };
// baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);

// 3. This will log 4
// quz is the prototype of baz and we are changing it's foo to 2
// Since baz inherits the foo property, it is 2 + 2

// Write a function that searches the prototype chain of 
// an object for a given property and assigns it a new value. 
// If the property does not exist in any of the prototype objects, 
// the function should do nothing. 
// The following code should work as shown:

const assignProperty = (obj, prop, newVal) => {
  let proto;

  while (obj) {
   
    if (obj.hasOwnProperty(prop)) obj[prop] = newVal
    obj = Object.getPrototypeOf(obj);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

// Consider the following two loops:

// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });

// If foo is an arbitrary object,
// will these loops always log the same results to the console?
// Explain why they do or do not.
// If they don't always log the same information,
// show an example of when the results differ.

// They will not always log the same thing.
// for/in iterates over all enumerable properties in the prototype chain
// Object.keys only iterates over the props that an object "has"


// How do you create an object that doesn't have a prototype?
// How can you determine whether an object has a prototype?

let obj = {};

Object.setPrototypeOf(obj, null); // let obj = Object.create(null);
Object.getPrototypeOf(obj);