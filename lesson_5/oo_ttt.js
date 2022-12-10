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
    return this.marker; // JS calls Object.prototype.toString implicitly when trying to log an object (object Object). We override that implicit call with this
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};

    for (let cnt = 1; cnt < 10; cnt++) {
      this.squares[String(cnt)] = new Square();
    }
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
  countMarkersFor(player, winRow) {
    let row = winRow.filter(combo => {
      return this.squares[combo].getMarker() === player.getMarker();
    });

    return row.length;
  }

  isFull() {
    return (this.unUsedSquares()).length === 0;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
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

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];


  play() {
    //SPIKE
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();

      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
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

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) console.log('You won! Congratulations!');
    if (this.isWinner(this.computer)) console.log('I won! I won! Take that, human!');
  }

}

let game = new TTTGame();

game.play();