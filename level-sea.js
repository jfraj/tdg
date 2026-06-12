// ============================================================
//  LEVEL: sea — "Under the Sea"  (procedurally generated!)
//
//  Tile legend:  1 stone wall · 2 portal · 5 locked door
//                11 sand (walkable) · 12 coral · 13 seaweed
//
//  Reached through the meadow's coral gate, which only opens
//  with the Cave Gem. Down here: sand, coral reefs, swaying
//  seaweed, and a SUNKEN RUIN whose three doors guard a pearl —
//  the same quiz mechanic as the meadow, fed by the same
//  question bank. Swimming is slower than walking!
// ============================================================
window.LEVELS = window.LEVELS || {};

// A sunken stone ruin: three quiz doors on its north wall,
// sand inside.
const SEA_RUIN = [
  [ 1, 5, 1, 5, 1, 5, 1],
  [ 1,11,11,11,11,11, 1],
  [ 1,11,11,11,11,11, 1],
  [ 1, 1, 1, 1, 1, 1, 1],
];
// The portal home and the spot you land on beside it.
const SEA_PORTAL_PAD = [[2, 11]];

LEVELS['sea'] = {

  name: 'Under the Sea',
  water: true,        // the blue underwater tint
  playerSpeed: 115,   // swimming is slower than walking

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(26, 17, 11, 12);

      const ruinAt   = Gen.placeRandomly(map, SEA_RUIN, 11);
      const portalAt = Gen.placeRandomly(map, SEA_PORTAL_PAD, 11);
      if (!ruinAt || !portalAt) continue;

      // The quiz doors and the pearl follow the ruin.
      this.quiz.doors = [
        { col: ruinAt.col + 1, row: ruinAt.row },
        { col: ruinAt.col + 3, row: ruinAt.row },
        { col: ruinAt.col + 5, row: ruinAt.row },
      ];
      this.quiz.answers = null;
      this.quiz.solved = false;
      this.items[0].col = ruinAt.col + 3;
      this.items[0].row = ruinAt.row + 2;
      this.items[0].collected = false;

      // The portal home, and where travellers appear.
      this.exits = {};
      this.exits[`${portalAt.col},${portalAt.row}`] = { to: 'home', arrive: 'sea' };
      this.arrival = { col: portalAt.col + 1, row: portalAt.row };
      this.start = this.arrival;

      // Coral reefs and seaweed, avoiding the arrival spot.
      Gen.protect(map, [[this.arrival.col, this.arrival.row]]);
      const reefs = [[[12]], [[12, 12]], [[12], [12]]];
      const reefCount = Gen.randInt(5, 8);
      for (let i = 0; i < reefCount; i++) {
        Gen.placeRandomly(map, reefs[Gen.randInt(0, reefs.length - 1)], 11);
      }
      Gen.scatter(map, 13, Gen.randInt(10, 14), 11);
      Gen.unprotect(map, [[this.arrival.col, this.arrival.row]], 11);

      // Safety inspection: pearl and portal reachable.
      if (Gen.allReachable(map, [11, 2, 5],
          [this.arrival.col, this.arrival.row], [
            [this.items[0].col, this.items[0].row],
            [portalAt.col, portalAt.row],
          ])) {
        return map;
      }
    }

    // Emergency fallback: a fixed layout.
    const map = Gen.blank(26, 17, 11, 12);
    Gen.stamp(map, 3, 3, SEA_RUIN);
    map[12][2] = 2;
    this.quiz.doors = [{ col: 4, row: 3 }, { col: 6, row: 3 }, { col: 8, row: 3 }];
    this.items[0].col = 6; this.items[0].row = 5;
    this.exits = { '2,12': { to: 'home', arrive: 'sea' } };
    this.arrival = { col: 3, row: 12 };
    this.start = this.arrival;
    return map;
  },

  // Filled in by generate():
  start: null,
  arrival: null,
  items: [
    { id: 'pearl', name: 'Sea Pearl', texture: 'item-pearl', col: 0, row: 0,
      wins: true },  // collecting it ends the game in celebration!
  ],
  quiz: { doors: [], becomes: 11, min: 2, max: 9 },
  exits: {},

  // Moving dangers + the healing wizard (handled by index.html).
  hazards: {
    texture: 'hazard-jelly', count: [2, 3], speed: 45,
    message: 'Zzzap! A jellyfish sting!',
  },
  wizard: { greeting: 'Wizard: Swimming in perfect health, I see!' },
};
