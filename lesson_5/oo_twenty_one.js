const readline = require('readline-sync');

class Card {
  constructor(suit, value, weight) {
    this.suit = suit;
    this.value = value;
    this.weight = weight;
  }

  static suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  static values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  getWeight() {
    return this.weight;
  }
}

class Deck {
  constructor() {
    this.cards = [];

    Card.suits.forEach(suit => {
      Card.values.forEach(value => {
        let weight;
  
        if (/[JQK]/g.test(value)) weight = 10;
        else if (value === 'A') weight = 11;
        else weight = Number(value);
  
        let card = new Card(suit, value, weight);
  
        this.cards.push(card);
      });
    });

  }

  deal() {
    return this.cards.pop();
  }

  getCards() {
    return this.cards;
  }

  shuffle() {
    for (let idx = this.cards.length - 1; idx > 0; idx--) {
      let randIdx = Math.floor(Math.random() * (idx + 1));
      [this.cards[idx], this.cards[randIdx]] = 
      [this.cards[randIdx], this.cards[idx]];
    }
  }

  count() {
    return this.cards.length;
  }
}

class Participant {
  constructor() {
    this.hand = [];
  }

  showHand(hand) {
    let string = "";
    hand.forEach(card => {
      string += card.value + ' of ' + card.suit + ', ';
    });
    return string.slice(0, string.length - 2) + ` (Score: ${this.score()})`;
  }

  hit(dealMethod) {
    this.hand.push(dealMethod);
  }

  stay() {
    return true;
  }

  isBusted() {
    return this.score() > TwentyOneGame.MAX_SCORE;
  }

  score() {
    return this.hand.reduce((sum, card) => {
      if (
        card.value === 'A' && 
        card.weight + sum > TwentyOneGame.MAX_SCORE
        ) {
        card.weight = 1;
      }

      return sum + card.weight;
    }, 0);
  }

  getHand() {
    return this.hand;
  }
}

class Player extends Participant {
  constructor() {
    super();
  //STUB
  // what state do we need
  // score, hand, amount of money?
  }
}

class Dealer extends Participant {
  // Similar to player, do we need this?
  constructor() {
    super();
    //STUB
    // what sort of state do we need?
    // score, hand, amount of money?
  }

  static TARGET_SCORE = 17;

  hide() {
    return this.hand.slice(0, 1);
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  static MAX_SCORE = 21;

  startRound() {
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();

    this.deck.shuffle();
    this.startRound();

    this.displayResult();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    this.prompt('Welcome to the game Twenty-One!');
  }

  dealCards() {
    const playerHand = this.player.getHand();
    const dealerHand = this.dealer.getHand();

    for (let cnt = 0; cnt < 4; cnt++) {
      if (cnt % 2 === 0) playerHand.push(this.deck.deal());
      else dealerHand.push(this.deck.deal());
    }
  }

  showCards(reveal = false) {
    const playerHand = this.player.getHand();
    let dealerHand = this.dealer.hide();

    if (reveal === true) dealerHand = this.dealer.getHand();

    console.log('');
    this.prompt(`Your cards: ${this.player.showHand(playerHand)}`);
    this.prompt(`Dealer's cards: ${this.dealer.showHand(dealerHand)}`);
    console.log('');

  }

  showFinalCards() {
    console.clear();
    this.showCards(true);
  }

  playerTurn() {
    let choice;

    while (!this.player.isBusted()) {
      choice = readline.question('Do you want to (h)it, or (s)tay? ');
      if (['h', 'hit'].includes(choice)) this.player.hit(this.deck.deal());
      if(['s', 'stay'].includes(choice)) break;

      console.clear();
      this.showCards();
    }
  }

  dealerTurn() {
    while (this.dealer.score() < Dealer.TARGET_SCORE) {
      this.dealer.hit(this.deck.deal());
    }
  }

  winner() {
    if (this.player.isBusted()) return this.dealer;
    if (this.dealer.isBusted()) return this.player;

    if (this.player.score() > this.dealer.score()) return this.player;
    if (this.player.score() < this.dealer.score()) return this.dealer;

    return null;
  }

  displayResult() {
    this.showFinalCards();
    console.log('\n');

    let playerScore = this.player.score();
    let dealerScore = this.dealer.score();

    console.log('');
    this.prompt(`Your score is ${playerScore}`);
    this.prompt(`The Dealer's Score is ${dealerScore}\n`);

    if (this.winner() === this.player) this.prompt('You won!!!');
    if (this.winner() === this.dealer) this.prompt('The Dealer won. You lose...');
    if (this.winner() === null) this.prompt(`Wow, it's a tie!`);
  }

  displayGoodbyeMessage() {
    this.prompt('Thank you for playing the game Twenty One!');
  }

  prompt(string) {
    console.log('=> ' + string);
  }
}

let game = new TwentyOneGame();
game.start();
