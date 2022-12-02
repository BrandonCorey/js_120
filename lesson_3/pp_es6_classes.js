// 1. What do we mean when we say that classes are first-class values?
// Values that can:
//  - be passed as arguments
//  - can be returned from functions
//  - Can be stored in a variable
//  - Used anywhere in JS where a value is expected


// 2. What does the static modifier do? How would we call the method manufacturer?

class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}

// the static modidfier defines a static method on the Telvision class
// To call --> Television.manufacturer();