## Examples one ##
**Need to restore context for a method / function where the context is out scope**
- Cannot use `call` or `apply` because the context is out of scope
- Option 1: Can bind the method of the object to it's object so it can be called in any scope
  - Advantage: Binding is permanent and does not need to be repeated if the bound function is called more than once
  - Disadvantage: It is no longer possible to determine the context of repeatTwice by looking at its invocation
- Option 2
  - Advantage: Does not require creating any new functions. Methods like map, filter, and forEach use a similar context argument
  - Disadvantage: A context argument cannot always be passed to a function (third party library function, for example)
```javascript
// Option 1:
function repeatTwice (func) {
  func();
  func();
}

let brandon = {
  first: 'brandon',
  last: 'corey',
  
  greeting() {
    console.log(`hello ${this.first} ${this.last}`);
  }
};

let brandonGreet = brandon.greeting.bind(brandon);

repeatTwice(brandon.greeting); // hello undefined undefined
repeatTwice(brandonGreet); // hello branndon corey

// Option 2:
function repeatTwice (func, context) {
  func.call(context);
  func.call(context);
}

let brandon = {
  first: 'brandon',
  last: 'corey',
  
  greeting() {
    console.log(`hello ${this.first} ${this.last}`);
  }
};

repeatTwice(brandon.greeting); // hello undefined undefined
repeatTwice(brandon.greeting, brandon); // hello branndon corey
```

