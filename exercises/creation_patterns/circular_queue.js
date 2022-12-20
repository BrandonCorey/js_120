// es6 classes


class CircularQueue {
  constructor(size) {
    this.queue = new Array(size).fill(null);
    this.queueCount = 0;
  }

  enqueue(addition) {
    let queue = this.queue;
    let count = this.queueCount;

    if (count > queue.length - 1) this.queueCount = 0;

    if (queue[count] === null) queue[count] = addition;
    else if (queue.filter(space => space === null).length === 1) {
      let empty = queue.findIndex(space => space === null);
      queue[empty] = addition;
    } else {
      this.dequeue()
      this.enqueue(addition);
    }
    this.queueCount += 1;
  }

  dequeue() {
    const queue = this.queue
    if (queue.every(space => space === null)) return null;
    let filled = queue.filter(space => space);
    return queue.splice(queue.indexOf(Math.min(...filled)), 1, null)[0]
  }
}


let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
console.log(queue);
queue.enqueue(7);
console.log(queue);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);
anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);