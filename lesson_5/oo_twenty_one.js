class Card {
  constructor() {
    //STUB
    // What sort of state does the card need?
    // Rank? Suit? Points?
  }
}

class Deck {
  constructor() {
    //STUB
    // What sort of state does the deck need?
    // 52 cards
    // Need some sort of data structure
    // array, object, something else
  }

  deal(){
    //STUB
    // does the dealer or deck deal
  }
}

class Participant {
  constructor() {
  //STUB
  // what state do we need
  // score, hand, amount of money?
  // do we put all redundant behaviors from player and dealer here?
  }
}

class Player extends Participant {
  constructor() {
  //STUB
  // what state do we need
  // score, hand, amount of money?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  score() {
    //STUB
  }
}

class Dealer extends Participant {
  // Similar to player, do we need this?
  constructor() {
    //STUB
    // what sort of state do we need?
    // score, hand, amount of money?
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

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // Will dealer deal, or will deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    //STUB
    // What state does the game need?
    // deck, two participants?
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayResults() {
    //STUB
  }

  displayGoodbyeMessage() {
    //STUB
  }
}