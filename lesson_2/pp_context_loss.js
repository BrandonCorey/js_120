// 1. The code below should output "Christopher Turk is a Surgeon".
// Without running the code, what will it output?
// If there is a difference between the actual 
// and desired output, explain the difference.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

// This will log 'undefined undefined is a undefined'
// The execution context of logReturnVal is the global object
// As a result, firstName, lastName, and occupation are not accessible
// Remember AS A RULE, passing function as an arg strips of its execution context

// 2. Modify the program from the previous problem so that logReturnVal
// accepts an additional context argument. If you then run the program
// with turk as the context argument, it should produce the desired output.

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

// 3. Suppose that we want to extract getDescription from turk, 
// but we always want it to execute with turk as its execution context. 
// How would you modify your code to do that?

let getDescript = turk.getDescription.bind(turk);
logReturnVal(getDescript);

// 4. Consider the following code:
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
// No it will not the elder
// The callback function  is executed as a normal function call by forEach on each iteration
// also, when functions are passed as arguments in general, their context is stripped
// However, it will log the game titles as this.titles is poiting to the TESgames context

// 5. Use let self = this; to ensure that TESgames.listGames 
// uses TESGames as its context and logs the proper output.

TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    self.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

// The forEach method provides an alternative way to supply 
// the execution context for the callback function. Modify the 
// program from the previous problem to use that technique 
// to produce the proper output:

TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames.listGames();