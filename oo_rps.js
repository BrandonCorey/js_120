// RPS is a two player game
// Each player chooses one of three possible moves
// Rock beats scissors
// scissors beats paper
// paper beats rock

// Nouns: player, move, rule
// Verbs: choose, compare
const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    choices: ['rock', 'paper', 'scissors'],
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject =  {

    choose() {
      let randomIdx = Math.floor(Math.random() * this.choices.length);
      this.move = this.choices[randomIdx];
      // These "this" uses work because the choose method isn't called here,
      // it is called much later.
      // At the point at which choose is called, the objects have been combined,
      // and computerObject has all of playerObject's props
    }
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {

    choose() {
      let choice;
      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (this.choices.includes(choice)) break;
        console.log('Sorry, plese enter a valid choice!')
      }
      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}


function createMove() {
  return {
    // type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // not clear whether rules need states
  };
}

// since we don't know where to put compare yet,
// lets define it as an ordinary function
let compare = function(move1, move2) {

};

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

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
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
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();