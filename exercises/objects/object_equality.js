// Code a function that tests if two objects have the same value

// function objectsEqual(object1, object2) {
//   let obj1Str = JSON.stringify(object1);
//   let obj2Str = JSON.stringify(object2);

//   return obj1Str === obj2Str;
// }


function objectsEqual(obj1, obj2) {
  if (!sameLength(obj1, obj2)) return false;

  for (let prop in obj1) {
    if (
      !obj2.hasOwnProperty(prop) || 
      obj1[prop] !== obj2[prop]
    ) return false;
  }
  return true;
}

function sameLength(obj1, obj2) {
  let obj1Len = Object.keys(obj1).length;
  let obj2Len= Object.keys(obj2).length;
  return obj1Len === obj2Len;
}

// input: two objects
// output: a boolean

// data structures: objects

// algo
// step through one object
// check if the property for first object exists in second
  // if it does, check if its value is the same
  // do this for all props
  // all props exist and values the same, return true
// return false

//


console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo'}, {a: 'foo', c: 1}));  // false