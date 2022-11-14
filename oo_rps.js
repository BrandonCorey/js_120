// RPS is a two player game
// Each player chooses one of three possible moves
// Rock beats scissors
// scissors beats paper
// paper beats rock

// Nouns: player, move, rule
// Verbs: choose, compare

const readline = require('readline-sync');

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
    choices,
    wins: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject =  {

    choose() {
      let randomIdx = Math.floor(Math.random() * this.choices.length);
      this.move = this.choices[randomIdx];
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
      this.move = isValid(this.choices, choice)[0]
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

  displayWelcomeMessage() {
    console.clear();
    console.log(
      `Welcome to Rocks, Paper, Scissors, Lizard, Spock!\n`
    );
  },

  displayGoodbyeMessage() {
    console.log(
      'Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!'
      );
  },

  updateRoundScore() {
    if (this.roundWinner === 'human') this.human.wins += 1;
    if (this.roundWinner === 'computer') this.computer.wins += 1;
  },

  displayRoundScore() {
    console.log(
      `Human Score: ${this.human.wins}\nComputer Score: ${this.computer.wins}\n`)
  },

  calculateRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove.winCondition.includes(computerMove.name)) this.roundWinner = 'human'

    else if (computerMove.winCondition.includes(humanMove.name)) {
      this.roundWinner = 'computer'
    }

    else this.roundWinner = 'tie';

  },

  displayWinner() {

    console.log(`\nYou chose: ${this.human.move.name}`);
    console.log(`The computer chose: ${this.computer.move.name}\n`);

    if (this.roundWinner === 'human') console.log('You won!');
    else if (this.roundWinner === 'computer') console.log('The computer Won!');
    else console.log('It\'s a tie!');
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage(); 
    while (true) {
      this.displayRoundScore();
      this.human.choose();
      this.computer.choose();
      this.calculateRoundWinner();
      this.updateRoundScore();
      this.displayWinner();

      if (!this.playAgain()) break;
      console.clear();
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();