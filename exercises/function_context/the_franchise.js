// Expected output

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

// Fix this

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + ' ' + number;
//     });
//   },
// };


let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(number => {
      return this.name + ' ' + number;
    }, this);
  },
};