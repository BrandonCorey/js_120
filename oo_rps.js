// RPS is a two player game
// Each player chooses one of three possible moves
// Rock beats scissors
// scissors beats paper
// paper beats rock

// Nouns: player, move, rule
// Verbs: choose, compare

const readline = require('readline-sync');
const ROUNDS_TO_WIN = 5;
const CPU_NAME = 'computer';
const PLAYER_NAME = 'human';
const WEIGHT = 0.2;

// Creates win conditions for each choice
function createWinCondition(choice) {
  const conditions = {
    rock: ['scissors', 'lizard'],
    scissors: ['paper', 'lizard'],
    paper: ['rock', 'spock'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors'],
  };

  return conditions[choice];
}

// Creates object for each choice with name and win conditions
function createChoices(name) {
  let winCondition = createWinCondition(name);
  return {
    name,
    winCondition,
  };
}

// Creates player template for human and computer
function createPlayer() {
  const choices = [
    createChoices('rock'),
    createChoices('paper'),
    createChoices('scissors'),
    createChoices('lizard'),
    createChoices('spock'),
  ];

  return {
    move: null,
    moveHistory: [],
    choices,
    roundWins: 0,
    matchWins: 0,
  };
}

// Creates computer object
function createComputer() {
  let playerObject = createPlayer();

  let computerObject =  {
    winnerHistory: [],
    winningMoveHistory: [],
    weightedMove: null,
    weights: { 
      rock: WEIGHT, 
      paper: WEIGHT, 
      scissors: WEIGHT, 
      lizard: WEIGHT, 
      spock: WEIGHT 
    }, // Default / minimum weights


    // Creates array of winning moves each round
    populateWinningMoves() {
      let lastIdx = this.winnerHistory.length -1;
      if (this.winnerHistory[lastIdx] === CPU_NAME) {
        let winningMove = this.moveHistory[lastIdx];
        this.winningMoveHistory.push(winningMove);
      }

    },

    // Keeps track of computers most successful choices,
    // and weights those more heavily in future
    getWeightedMove() {
      console.log(this.weights);
      console.log(this.winnerHistory);
      console.log(this.winningMoveHistory);

      let sum = 0;
      let random = Math.random();

      const getWeight = (move) => {
        let cnt = 0;
        for (let moveName of this.winningMoveHistory) {
          if (moveName === move) cnt += 1;
        }
        let newWeight = cnt / this.winningMoveHistory.length;
        return newWeight > WEIGHT ? newWeight : WEIGHT;
      }

      for (let move in this.weights) {
        this.weights[move] = (() => {
          let cnt = 0;
          for (let moveName of this.winningMoveHistory) {
            if (moveName === move) cnt += 1;
          }
          let newWeight = cnt / this.winningMoveHistory.length;
          return newWeight > WEIGHT ? newWeight : WEIGHT;
        })();
      }

      for (let move in this.weights) {
        let percentOfWins = this.weights[move];
        sum += percentOfWins;
        if (random <= sum) {
          this.weightedMove = move;
          break;
        }
      }
    },

    // Gets choice for computer.
    // Doesn't implement weighted choices until after 3 winning rouinds
    choose() {
      let randomIdx = Math.floor(Math.random() * this.choices.length);
      let choice;

      if (this.winningMoveHistory.length < 1) choice = this.choices[randomIdx];
      else {
        let choiceName = this.weightedMove;
        console.log(choiceName)
        choice = this.choices.find(choiceObj => choiceObj.name === choiceName);

      }

      this.move = choice;
      this.moveHistory.push(choice.name);
    }
  };
  return Object.assign(playerObject, computerObject); // Merge player template with computer Object
}

// Creates human object
function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {

    // Gets choice for human. Uses isValid to check for valid input

    isValid(choices, choice) {
      return choices.find(option => {
        switch (choice) {
          case 'r':
            return option.name === 'rock';
          case 'p':
            return option.name === 'paper';
          case 's':
            return option.name === 'scissors';
          case 'l':
            return option.name === 'lizard';
          case 'sp':
            return option.name === 'spock';

          default: return option.name === choice;
        }
      });
    },

    choose() {

      let choice;

      while (true) {

        console.log('Please choose rock (r), paper (p), scissors (s), lizard (l), or spock (sp): ');
        choice = readline.question();

        if (this.isValid(this.choices, choice)) break;

        console.log('Sorry, plese enter a valid choice!');
      }

      choice = this.isValid(this.choices, choice);
      this.move = choice;
      this.moveHistory.push(choice.name);
    },
  };

  return Object.assign(playerObject, humanObject);
}

// Main game object. Has methods and properties relevant to the meta-game
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  roundWinner: null,
  matchWinner: null,

  // Displays welcome
  displayWelcomeMessage() {
    // console.clear();
    console.log(
      '-- Welcome to Rocks, Paper, Scissors, Lizard, Spock! --\n'
    );
    console.log('Rules: \n\n1. You must choose either rock, paper, scissors, lizard or spock');
    console.log('2. The computer will also make a choice each turn');
    console.log('3. This is a game of matchups...the winner is determined by the following rules:');
    console.log('  - Rock beats scissors and lizard');
    console.log('  - Paper beats rock and spock');
    console.log('  - Scissors beats paper and lizard');
    console.log('  - lizard beats paper and spock');
    console.log('  - spock beats rock and scissors');
    console.log('\n-- First to 5 wins the match! --\n');
  },

  // Validates that the player wants to play the game
  playGameValidation() {
    let play;

    while (true) {
      console.log('--> Type "rps" to play!');
      play = readline.question();
      if (play === 'rps') break;
    }
    // console.clear();
  },

  // Displays goodbye message
  displayGoodbyeMessage() {
    console.log(
      'Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!'
    );
  },

  // Updates the round score based on the winner of the round
  updateRoundScore() {
    if (this.roundWinner === PLAYER_NAME) this.human.roundWins += 1;
    if (this.roundWinner === CPU_NAME) this.computer.roundWins += 1;
  },

  // Updates the match score based on the winner of the match
  updateMatchScore() {
    if (this.matchWinner === PLAYER_NAME) this.human.matchWins += 1;
    if (this.matchWinner === CPU_NAME) this.computer.matchWins += 1;
  },

  // Updates winner history for computer (to make more educated decisions)
  updateWinnerHistory() {
    this.computer.winnerHistory.push(this.roundWinner);
  },

  // Displays the score of the game
  displayScore() {
    // console.clear();
    console.log(
      `You:       Round Wins: ${this.human.roundWins} || Match Wins: ${this.human.matchWins}`);
    console.log(
      `Computer:  Round Wins: ${this.computer.roundWins} || Match Wins: ${this.computer.matchWins}`
    );
    console.log('--------------------------------------------');
  },

  // Calculates the round winner of the game based on win conditions
  getRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove.winCondition.includes(computerMove.name)) this.roundWinner = PLAYER_NAME;

    else if (computerMove.winCondition.includes(humanMove.name)) {
      this.roundWinner = CPU_NAME;
    } else this.roundWinner = 'tie';

  },

  // Calculates match winner based on number of rounds won
  // compared to a specified amount for a match win
  getMatchWinner() {
    if (this.human.roundWins === ROUNDS_TO_WIN) this.matchWinner = PLAYER_NAME;
    if (this.computer.roundWins === ROUNDS_TO_WIN) this.matchWinner = CPU_NAME;
  },

  // Displays the current choices and choice history of each player/
  // Will abreviate if history gets too long
  displayChoices() {
    const elipses = moveHistory => {
      return moveHistory.length > 5 ? '... ' + moveHistory.slice(-5).join(', ') : moveHistory.join(', ');
    };
    let humanMove = this.human.move.name;
    let computerMove = this.computer.move.name;

    console.log(`\nYou chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}\n`);

    console.log(`Your move history: ${elipses(this.human.moveHistory)}`);
    console.log(`Commputer move history: ${elipses(this.computer.moveHistory)}\n`);

  },

  // Displays the winner of the round
  displayRoundWinner() {
    if (this.roundWinner === PLAYER_NAME) console.log('You won the round.');
    else if (this.roundWinner === CPU_NAME) console.log('The computer won the round.');
    else console.log('It\'s a tie!');
  },

  // Displays the winner of the match
  displayMatchWinner() {
    if (this.matchWinner === PLAYER_NAME) console.log('You also won the match!\n');
    if (this.matchWinner === CPU_NAME) console.log('The computer also won the match!\n');
  },

  // Asks if human would like to play again and validates answer
  playAgain() {
    let answer;
    while (true) {
      console.log('Would you like to play again? (y/n)');
      answer = readline.question();

      if (answer === 'n' || answer === 'no') return false;
      if (answer === 'y' || answer === 'yes') return true;
    }
  },

  // Resets the round score to 0 for each player
  resetRoundScore() {
    [this.human.roundWins, this.computer.roundWins] = [0, 0];
  },

  // Calls all of the methods needed to play each round
  playRound() {
    this.displayScore();
    this.human.choose();
    this.computer.populateWinningMoves();
    this.computer.getWeightedMove();
    this.computer.choose();
    this.getRoundWinner();
    this.updateWinnerHistory();
    this.updateRoundScore();
    this.displayScore();
    this.displayChoices();
    this.displayRoundWinner();
  },

  // Main game engine for rpslsp
  play() {
    this.displayWelcomeMessage();
    this.playGameValidation();
    while (true) {
      this.playRound();

      this.getMatchWinner();
      this.updateMatchScore();

      if (this.matchWinner) this.displayMatchWinner();

      if (!this.playAgain()) break;

      if (this.matchWinner) {
        this.resetRoundScore();
        this.matchWinner = null;
      }

      // console.clear();

    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();