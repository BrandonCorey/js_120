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
      rock: ['scissors'],
      scissors: ['paper'],
      paper: ['rock'], 
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
    createChoices('scissors')
  ];

  return {
    move: null,
    choices,
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

        console.log('Please choose rock, paper, or scissors:');
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

  displayWelcomeMessage() {
    console.clear();
    console.log(
      `Welcome to Rocks, Paper, Scissors!`
    );
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Goodbye!');
  },

  calculateWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove.winCondition.includes(computerMove.name)) return 'human'

    if (computerMove.winCondition.includes(humanMove.name)) return 'computer'
    
    return 'tie'
  },

  displayWinner() {
   let winner = RPSGame.calculateWinner();

    console.log(`You chose: ${this.human.move.name}`);
    console.log(`The computer chose: ${this.computer.move.name}`);

    if (winner === 'human') console.log('You won!');
    else if (winner === 'computer') console.log('The computer Won!');
    else console.log('It\'s a tie!');
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage(); // Everything that is an overall convern to the game, keep in the game engine (makes sense to)
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
      console.clear();
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();