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

  reset() {
    for (let square in this.squares) {
      this.squares[square] = new Square();
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
    return (this.unusedSquares()).length === 0;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
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
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.wins;
  }

  incrementScore() {
    this.wins += 1;
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
    this.firstPlayer = this.human;
  }

  static WINNING_SCORE = 3;

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

  static joinOr = function(array, seperator, contraction) {
    let options = array.join(seperator).split('');
    let lastComma = options.lastIndexOf(seperator[0]);

    options[lastComma] = `${seperator}` + contraction;

    return options.join('');
  }

  playMatch() {
    while (true) {
      this.playRound();
      this.updateScore();
      this.displayScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

  }

  playRound() {
    this.board.reset();
    this.board.display();

    let currentPlayer = this.firstPlayer;
    while (true) {

      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayMatchWinner();
    this.displayGoodbyeMessage();

  }

  playAgain() {
    let choice;
    console.log('Would you like to play again?');

    while (true) {
      choice = readline.question();

      if (['y', 'n'].includes(choice.toLowerCase())) break;
    }

    console.clear();
    return choice === 'y';
  }

  displayScore() {
    console.log('');
    console.log(`Your Score: ${this.human.getScore()}`);
    console.log(`Computer Score: ${this.computer.getScore()}`);
    console.log('---------------------');
    console.log('');
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
    else console.log("It's a tie!");
  }

  displayMatchWinner() {
    if (this.isMatchWinner(this.human)) console.log('You are the winner of the match!!!');
    if (this.isMatchWinner(this.computer)) console.log('Muahaha... I have won the match human!');
    console.log('');
  }

  togglePlayer(currentPlayer) {
    return currentPlayer === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) this.humanMoves();
    else this.computerMoves();
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices, ', ', 'or')}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry that's not a valid choice");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.offensiveMove() ||
                 this.defensiveMove() ||
                 this.pickCenterSquare() ||
                 this.pickRandomSquare();

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  offensiveMove() {
    return this.getCriticalMove(this.computer);
  }

  defensiveMove() {
    return this.getCriticalMove(this.human);
  }

  pickCenterSquare() {
    return this.board.isUnusedSquare('5') ? '5' : null;
  }

  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  getCriticalMove(player) {
    for (let idx = 0; idx < TTTGame.POSSIBLE_WINNING_ROWS.length; idx++) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[idx];
      let square = this.criticalSquare(player, row);
      if (square) return square;
    }
    return null;
  }

  criticalSquare(player, winningRow) {
    if (this.board.countMarkersFor(player, winningRow) === 2) {
      let emptyIdx = winningRow.findIndex(square => {
        return this.board.isUnusedSquare(square);
      });

      if (emptyIdx >= 0) return winningRow[emptyIdx];
    }
    return null;
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

  isMatchWinner(player) {
    return player.getScore() === TTTGame.WINNING_SCORE;
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  updateScore() {
    if (this.isWinner(this.human)) this.human.incrementScore();
    if (this.isWinner(this.computer)) this.computer.incrementScore();
  }
}

let game = new TTTGame();

game.play();