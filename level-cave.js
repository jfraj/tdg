// ============================================================
//  LEVEL: cave — "The Cave"
//
//  Tile legend:  0 grass · 1 stone wall · 2 portal
//                3 cave floor · 4 cave wall · 5 locked door
//
//  The sealed chamber (top-right) is now guarded by THREE
//  DRAGONS — two evil, one good. They look identical; only the
//  numbers they wear tell them apart. Touch the dragon wearing
//  the correct answer and it opens the chamber. Touch an evil
//  one and it bites: you lose a heart and get a new question.
// ============================================================
window.LEVELS = window.LEVELS || {};

LEVELS['cave'] = {

  name: 'The Cave',

  start: { col: 2, row: 8 },

  map: [
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,4],
    [4,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,4],
    [4,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,4,3,3,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,4,4,4,5,4,4,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,3,3,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,2,3,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,3,4],
    [4,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
  ],

  // The gem waits inside the sealed chamber (top-right).
  items: [
    { id: 'gem', name: 'Cave Gem', texture: 'item-gem', col: 20, row: 2 },
  ],

  // The dragon guardians: where the three stand, how hard the
  // math is, and which tile opens when the good one is found
  // (the chamber door at column 20, row 5 becomes cave floor).
  dragons: {
    positions: [
      { col: 15, row: 8 },
      { col: 18, row: 8 },
      { col: 21, row: 8 },
    ],
    min: 2,
    max: 9,
    opens: { col: 20, row: 5, becomes: 3 },
    message: 'The good dragon bows — the chamber opens!',
  },

  exits: {
    '1,8': { to: 'home', spawn: { col: 27, row: 10 } },
  },
};
