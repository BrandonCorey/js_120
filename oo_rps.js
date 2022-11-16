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

// Take an array and return the most frequently occuring elmement
function getMode(array) {
  let hash = {};

  array.forEach(element => {
    hash[element] = (hash[element] || 0) + 1;
  });
 
  return Object.entries(hash).sort((a, b) => b[1] - a[1])[0][0];
}

function getStrongestMove(computerChoices, humanHistory) {
  let modeOfHuman = getMode(humanHistory);

  let response = computerChoices.filter(obj => obj.winCondition.includes(modeOfHuman));
  return response[0];
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject =  {
    winnerHistory: [],
    losingMoveHistory: [],

    calculateStrength() {
      this.winnerHistory.forEach((winner, idx) => {
        if (winner === 'human') {
          let losingMove = this.moveHistory[idx];
          this.losingMoveHistory.push(losingMove);
        }
      });
    },

    // winner history length is the same as number of rounds
    // losing move history length is the same as number of rounds lost
    // Get the freqeuncy of all losing moves by move (object)
    // Divide each loss frequnecy by the length of losing move history to get percent of losses for each losing choice
    // Ran

    choose(humanMoveHistory) {
      let randomIdx = Math.floor(Math.random() * this.choices.length);
      let choice;
      if (humanMoveHistory.length < 2) choice = this.choices[randomIdx];
      choice = getStrongestMove(this.choices, humanMoveHistory);

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
      const isValid = (choices, choice) => choices.filter(option => option.name === choice);
      let choice;
      while (true) {

        console.log('Please choose rock, paper, scissors, lizard, or spock:');
        choice = readline.question();

        if (isValid(this.choices, choice).length > 0) break;

        console.log('Sorry, plese enter a valid choice!')
      }

      choice = isValid(this.choices, choice)[0];
      this.move = choice;
      this.moveHistory.push(choice.name);
    },
  };

  return Object.assign(playerObject, humanObject);
}

// since we don't know where to put compare yet,
// lets define it as an ordinary function

const RPSGame = {
  human: createHuman(),
  computer: createComputer(), // Doing this because both are players that need to make choices
  roundWinner: null,
  matchWinner: null,

  displayWelcomeMessage() {
    console.clear();
    console.log(
      'Welcome to Rocks, Paper, Scissors, Lizard, Spock!\n'
    )
    console.log('First to 5 wins the match!\n');

    let play;

    while (true) {
      console.log('Type "rps" to play!');
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
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  resetRoundScore() {
    [this.human.roundWins, this.computer.roundWins] = [0, 0];
  },

  playRound() {
    this.displayScore();
    this.human.choose();
    this.computer.choose(this.human.moveHistory);
    this.getRoundWinner();
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
        this.matchWinner = null;
      }

      console.clear();

    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();