const readline = require('readline-sync');

function Square() {
  this.marker = " ";
}

Square.prototype.isUnused = function() {
  return this.marker === Square.UNUSED_SQUARE;
}
  
Square.prototype.toString = function() {
  return this.marker;
}

Square.prototype.setMarker = function (marker){
  this.marker = marker;
}

Square.prototype.getMarker = function() {
  return this.marker;
}

Square.UNUSED_SQUARE = ' ';
Square.HUMAN_MARKER = 'X';
Square.COMPUTER_MARKER = 'O';

function Board() {
  this.squares = {};

  for (let cnt = 1; cnt < 10; cnt++) {
    this.squares[String(cnt)] = new Square();
  }
}

Board.prototype.displayWithClear = function() {
  console.clear();
  console.log("");
  console.log("");
  this.display();
}

Board.prototype.countMarkersFor = function(player, winRow) {
  let row = winRow.filter(combo => {
    return this.squares[combo].getMarker() === player.getMarker();
  });

  return row.length;
}

Board.prototype.isFull = function() {
  return (this.unUsedSquares()).length === 0;
}

Board.prototype.markSquareAt = function(key, marker) {
  this.squares[key].setMarker(marker);
}

Board.prototype.unUsedSquares = function() {
  let keys = Object.keys(this.squares);
  return keys.filter(key => this.squares[key].isUnused());
}

Board.prototype.display = function() {
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


function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  return this.marker;
}

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],            // top row of board
  [ "4", "5", "6" ],            // center row of board
  [ "7", "8", "9" ],            // bottom row of board
  [ "1", "4", "7" ],            // left column of board
  [ "2", "5", "8" ],            // middle column of board
  [ "3", "6", "9" ],            // right column of board
  [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
  [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

TTTGame.prototype.play = function() {
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

TTTGame.prototype.humanMoves = function() {
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

TTTGame.prototype.computerMoves = function() {
  let validChoices = this.board.unUsedSquares();
  let choice;
  do {
    choice = Math.floor((Math.random() * 9) + 1).toString();
  } while (!validChoices.includes(choice));

  this.board.markSquareAt(choice, this.computer.getMarker());
}

TTTGame.prototype.gameOver = function() {
  return this.board.isFull() || this.someoneWon();
}

TTTGame.prototype.isWinner = function(player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    return this.board.countMarkersFor(player, row) === 3;
  });
}

TTTGame.prototype.someoneWon = function() {
  return this.isWinner(this.human) || this.isWinner(this.computer);
}

TTTGame.prototype.displayWelcomeMessage = function() {
  console.clear();
  console.log('Welcome to Tic Tac Toe!');
  console.log("");
}

TTTGame.prototype.displayGoodbyeMessage = function() {
  console.log('Thanks for playing Tic Tac Toe! Goodbye!');
}

TTTGame.prototype.displayResults = function() {
  if (this.isWinner(this.human)) console.log('You won! Congratulations!');
  if (this.isWinner(this.computer)) console.log('I won! I won! Take that, human!');
}

let game = new TTTGame();

game.play();