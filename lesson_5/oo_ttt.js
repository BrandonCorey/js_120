class Board {
  constructor() {
    //STUB
    // we need a way to model the 3x3 grid. Perhaps squares...
    // What data structure should we use? Array, Object?
    // What should the data structure store?
  }
}

class Square {
  constructor() {
    //STUB
    // Need a way to keep track of square's marker
  }
}


class Row {
  constructor() {
    //STUB
    // We need a way to identify a row of 3 sqaures
  }
}

class Marker {
  constructor() {
    //STUB
    // A marker represents the players choice on the board
  }
}

class Player {
  constructor() {
    //STUB
    // maybe have a marker to keep track of player's symbol
  }

  mark() {
    //STUB
    // need a way to mark the board with the players marker
    // how do we access the board
  }

  play() {
    //STUB
    // We need a way for each player to play the game
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    //STUB
  }
}