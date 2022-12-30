// Make this work

// Two solutions

// function myFilter(array, func, context = this) {
//   let result = [];

//   array.forEach(function(value) {
//     if (func.call(context, value)) {
//       result.push(value);
//     }
//   });

//   return result;
// }

// let filter = {
//   allowedValues: [5, 6, 9],
// }

// myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
//   return this.allowedValues.indexOf(val) >= 0;
// }, filter); // returns [5, 6, 9]



function myFilter(array, func, context = null) {
  let result = [];

  if (context) return myFilter(array, func.bind(context));

  array.forEach(function(value) {
    if (func(value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]