const readline = require('readline-sync');

class Square {
  constructor() {
    this.marker = " ";
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'x';
  static COMPUTER_MARKER = 'O';

  toString() {
    return this.marker // JS calls Object.prototype.toString implicitly when trying to log an object (object Object). We override that implicit call with this
  }

  setMarker(marker) {
    this.marker = marker;
  }
}

class Board {
  constructor() {
    this.squares = {};

    for (let cnt = 1; cnt < 10; cnt++) {
      this.squares[cnt] = new Square();
    }
  }

  markSquareAt(square, marker) {
    this.squares[square].setMarker(marker);
  }

  unUsedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
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

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
  
      if (this.gameOver()) break;

    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  humanMoves() {
    let choice;

    while (true) {
    let validChoices = this.board.unUsedSquares();
    const prompt = `Choose a square (${validChoices.join(', ')}): `;
    choice = readline.question(prompt);

    if (validChoices.includes(choice)) break;

    console.log("Sorry that's not a valid choice");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unUsedSquares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker())
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

  gameOver() {
    //STUB
    return false;
  }
}

let game = new TTTGame();

game.play();