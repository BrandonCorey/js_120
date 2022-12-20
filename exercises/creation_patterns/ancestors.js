// Implement an ancestors method that returns the prototype chain (ancestors)
// of a calling object as an array of object names. Here's an example output:




// name property added to make objects easier to identify
let foo = {name: 'foo'};

Object.prototype.ancestors = function() {
  let output = [];
  let proto = Object.getPrototypeOf(this);

  while (proto.name) {
    output.push(proto.name);
    proto = Object.getPrototypeOf(proto);
  }

  output.push('Object.prototype');
  return output;
}

let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']