class Square {
  constructor(marker = " ") {
    this.marker = marker;
  }

  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'x';
  static COMPUTER_MARKER = 'O';

  toString() {
    return this.marker // JS calls Object.prototype.toString implicitly when trying to log an object (object Object). We override that implicit call with this
  }
}

class Board {
  constructor() {
    this.squares = {};

    for (let cnt = 1; cnt < 10; cnt++) {
      this.squares[cnt] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
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

class TTTGame {
  constructor() {
    this.board = new Board();
    // Need a board and two players
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;

      break; // <= Execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Tic Tac Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    //STUB
    // show the results of the game (win, lose, tie)
  }

  firstPlayerMoves() {
    //STUB
    // the first player makes a move
  }

  secondPlayerMoves() {
    //STUB
    // the second player makes a move
  }

  gameOver() {
    //STUB
    return false;
  }
}

let game = new TTTGame();

game.play();