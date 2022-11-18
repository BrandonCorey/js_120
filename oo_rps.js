// RPS is a two player game
// Each player chooses one of three possible moves
// Rock beats scissors
// scissors beats paper
// paper beats rock

// Nouns: player, move, rule
// Verbs: choose, compare

const readline = require('readline-sync');
const ROUNDS_TO_WIN = 5;

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

function createChoices(name) {
  let winCondition = createWinCondition(name)
  return {
    name,
    winCondition,
  };
}

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

function createComputer() {
  let playerObject = createPlayer();

  let computerObject =  {
    winnerHistory: [],
    winningMoveHistory: [],
    weights: {'rock': 0.2, 'paper': 0.2, 'scissors': 0.2, 'lizard': 0.2, 'spock': 0.2}, // Default weights
    weightedMove: null,


    populateWinningMoves() {
      this.winnerHistory.forEach((winner, idx) => {
        if (idx === this.winnerHistory.length - 1 && (winner === 'computer')) {
          let winningMove = this.moveHistory[idx];
          this.winningMoveHistory.push(winningMove);
        }
      });
    },

    getWeightedMove() {
      let sum = 0;
      let random = Math.random();

      for (let move in this.weights) {
        const getWeights = () => {
          let cnt = 0;
          for (let moveName of this.winningMoveHistory) {
            if (moveName === move) cnt += 1;
          }
          let newWeight = cnt / this.winningMoveHistory.length;
          return newWeight > 0.2 ? newWeight: 0.2;
        }
        this.weights[move] = getWeights();
      }
      console.log(this.weights);
      for (let move in this.weights) {
        let percentOfWins = this.weights[move]
        sum += percentOfWins
        if (random <= sum) {
          this.weightedMove = move;
          break;
        };
      }
    },

    choose() {
      let randomIdx = Math.floor(Math.random() * this.choices.length);
      let choice;
      
      if (this.winningMoveHistory.length < 3) choice = this.choices[randomIdx];
      else {
        let choiceName = this.weightedMove;
        choice = this.choices.find(choiceObj => choiceObj.name === choiceName);

      }

      this.move = choice;
      this.moveHistory.push(choice.name);
    }
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {

    choose() {
      const isValid = (choices, choice) => choices.find(option => {
        switch (choice) {
          case 'r':
            return option.name === 'rock';
          case 'p':
            return option.name === 'paper';
          case 's':
            return option.name === 'scissors';
          case 'l':
            return opntion.name === 'lizard';
          case 'sp':
            return option.name === 'spock';

          default: return option.name === choice;
        }

      });
      let choice;
      while (true) {

        console.log('Please choose rock (r), paper (p), scissors (s), lizard (l), or spock (sp): ');
        choice = readline.question();

        if (isValid(this.choices, choice)) break;

        console.log('Sorry, plese enter a valid choice!')
      }

      choice = isValid(this.choices, choice);
      this.move = choice;
      this.moveHistory.push(choice.name);
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(), 
  roundWinner: null,
  matchWinner: null,

  displayWelcomeMessage() {
    console.clear();
    console.log(
      '-- Welcome to Rocks, Paper, Scissors, Lizard, Spock! --\n'
    )
    console.log('Rules: \n\n1. You must choose either rock, paper, scissors, lizard or spock');
    console.log('2. The computer will also make a choice each turn');
    console.log('3. This is a game of matchups...the winner is determined by the following rules:')
    console.log('  - Rock beats scissors and lizard');
    console.log('  - Paper beats rock and spock');
    console.log('  - Scissors beats paper and lizard');
    console.log('  - lizard beats paper and spock');
    console.log('  - spock beats rock and scissors');
    console.log('\n-- First to 5 wins the match! --\n');

    let play;

    while (true) {
      console.log('--> Type "rps" to play!');
      play = readline.question();
      if (play === 'rps') break;
    }
    console.clear();
  },

  displayGoodbyeMessage() {
    console.log(
      'Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!'
      );
  },

  updateRoundScore() {
    if (this.roundWinner === 'human') this.human.roundWins += 1;
    if (this.roundWinner === 'computer') this.computer.roundWins += 1;
  },

  updateMatchScore() {
    if (this.matchWinner === 'human') this.human.matchWins += 1;
    if (this.matchWinner === 'computer') this.computer.matchWins += 1;
  },

  updateWinnerHistory() {
    this.computer.winnerHistory.push(this.roundWinner);
  },

  displayScore() {
    console.clear();
    console.log(
      `You:       Round Wins: ${this.human.roundWins} || Match Wins: ${this.human.matchWins}`)
    console.log(
      `Computer:  Round Wins: ${this.computer.roundWins} || Match Wins: ${this.computer.matchWins}`
    )
    console.log('--------------------------------------------')
  },

  getRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove.winCondition.includes(computerMove.name)) this.roundWinner = 'human'

    else if (computerMove.winCondition.includes(humanMove.name)) {
      this.roundWinner = 'computer'
    }

    else this.roundWinner = 'tie';

  },

  getMatchWinner() {
    if (this.human.roundWins === ROUNDS_TO_WIN) this.matchWinner = 'human';
    if (this.computer.roundWins === ROUNDS_TO_WIN) this.matchWinner = 'computer';
  },

  displayChoices() {
    console.log(`\nYou chose: ${this.human.move.name}`);
    console.log(`The computer chose: ${this.computer.move.name}\n`);

    console.log(`Your move history: ${this.human.moveHistory.join(', ')}`);
    console.log(`Commputer move history: ${this.computer.moveHistory.join(', ')}\n`);

  },

  displayRoundWinner() {
    if (this.roundWinner === 'human') console.log('You won the round.');
    else if (this.roundWinner === 'computer') console.log('The computer won the round.');
    else console.log('It\'s a tie!');
  },

  displayMatchWinner() {
    if (this.matchWinner === 'human') console.log('You also won the match!\n');
    if (this.matchWinner === 'computer') console.log('The computer also won the match!\n')
  },

  playAgain() {
    let answer;
    while (true) {
      console.log('Would you like to play again? (y/n)');
      answer = readline.question();

      if (answer === 'n' || answer === 'no') return false;
      if (answer === 'y' || answer === 'yes') return true;
    }
  },

  resetRoundScore() {
    [this.human.roundWins, this.computer.roundWins] = [0, 0];
  },

  resetMoveHistory() {
    [this.human.moveHistory, this.computerMoveHistory] = [[], []];
  },

  playRound() {
    this.displayScore();
    this.human.choose();
    this.computer.populateWinningMoves()
    this.computer.getWeightedMove();
    this.computer.choose();
    this.getRoundWinner();
    this.updateWinnerHistory();
    this.updateRoundScore();
    this.displayScore();
    this.displayChoices();
    this.displayRoundWinner();
  },

  play() {
    this.displayWelcomeMessage(); 
    while (true) {
      this.playRound();

      this.getMatchWinner();
      this.updateMatchScore();
      
      if (this.matchWinner) this.displayMatchWinner();

      if (!this.playAgain()) break;

      if (this.matchWinner) {
        this.resetRoundScore();
        this.resetMoveHistory();
        this.matchWinner = null;
      }

      console.clear();

    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();