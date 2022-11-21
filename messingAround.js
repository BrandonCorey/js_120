let obj1 = {
  banana: 'banana',
  addArr() {
    return this.values.reduce((a, b) => a + b);
  },
};

let obj2 = {
  values: [100, 145, 2345, 323, 234],
  sum: 0,

}


obj2.sum = obj1.addArr.call(obj2, obj2.values);
console.log(obj2.sum);
