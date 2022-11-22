let obj1 = {
  banana: 'banana',
  addArr() {
    this.sum = this.values.reduce((a, b) => a + b);
  },
};

let obj2 = {
  values: [100, 145, 2345, 323, 234],
  sum: 0,
};

function add(num) {
  this.sum += num;
}



obj1.addArr.call(obj2);
console.log(obj2.sum); // 3147
add.call(obj2, 5);
console.log(obj2.sum)