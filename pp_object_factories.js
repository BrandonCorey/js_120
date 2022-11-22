// Attributes
//   Title: Mythos
//   Author: Stephen Fry

// Behavior:
//   Get Description

// -----------------------------
// Attributes
//   Title: Me Talk Pretty One Day
//   Author: David Sedaris

// Behavior:
//   Get Description

// -----------------------------
// Attributes
//  Title: Aunts aren't Gentlemen
//  Author: PG Wodehouse

//  Behavior:
//    Get Description

// 1. Create three objects that represent the three books shown above.
// The method for the "Get Description" behavior should return a string like:
// "Me Talk Pretty one day was written by David Sedaris."

function createBook(title, author, read = false) {
  return {
    title, // If parameter or variable is same name as property, can shorthand it (instead of title: title, --> just title,)
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}. ` +
      `I ${this.read ? 'have' : "haven't"} read it.`;
    },

    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook('Aunts aren\'s Gentleman', 'PG Wodehouse');

console.log(book1.getDescription());
book1.readBook();
console.log(book1.getDescription());