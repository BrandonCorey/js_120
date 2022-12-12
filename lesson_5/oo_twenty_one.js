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

  deal(){
    //STUB
    // does the dealer or deck deal
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

  static showHand(hand) {
    let string = "";
    hand.forEach(card => {
      string += card.value + ' of ' + card.suit + ', ';
    });
    return string.slice(0, string.length - 2);
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
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

  hide() {
    return this.hand.slice(0, 1);
  }

  reveal() {
    return this.hand
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

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
    this.prompt('Welcome to the game Twenty-One!');
    console.log('');
  }

  dealCards() {
    const playerHand = this.player.getHand();
    const dealerHand = this.dealer.getHand();
    const cards = this.deck.getCards();

    for (let cnt = 0; cnt < 4; cnt++) {
      if (cnt % 2 === 0) playerHand.push(cards.pop());
      else dealerHand.push(cards.pop());
    }
  }

  showCards() {
    const playerHand = this.player.getHand();
    const dealerHand = this.dealer.hide();

    this.prompt(`Your cards: ${Participant.showHand(playerHand)}`);
    this.prompt(`Dealer's cards: ${Participant.showHand(dealerHand)}`);
    console.log('');
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayResult() {
    //STUB
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
