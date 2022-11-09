// RPS is a two player game
// Each player chooses one of three possible moves
// Rock beats scissors
// scissors beats paper
// paper beats rock

// Nouns: player, move, rule
// Verbs: choose, compare

function createPlayer() {
  return {
    // player name
    // player current move
    choose() {

    },
  };
}

function createMove() {
  return {
    // type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // not clear whether rules need states
  }
}

// since we don't know where to put compare yet, lets define it as an ordinary function
let compare = function(move1, move2) {

}

const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(), // Doing this because both are players that need to make choices

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Goodbye!')
  },

  play() {
    this.displayWelcomeMessage(); // Everything that is an overall convern to the game, keep in the game engine (makes sense to)
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbyeMessage();
  },
}