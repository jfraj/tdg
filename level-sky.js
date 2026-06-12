// ============================================================
//  LEVEL: sky — "The Sky"  (procedurally generated!)
//
//  Tile legend:  1 stone wall · 2 portal · 5 question door
//                17 cloud floor (walkable) · 18 cloud bank
//                19 gold star (decoration)
//
//  Reached through the meadow's sky gate, whose pearl door only
//  opens with the Sea Pearl. Up here: soft cloud floors, puffy
//  cloud banks, little golden stars resting on the clouds, warm
//  sunlight — and a FLOATING CASTLE whose three doors run the
//  same quiz, guarding the SKY STAR: the treasure that wins the
//  game. Mind the grumpy little storm clouds!
// ============================================================
window.LEVELS = window.LEVELS || {};

// A floating stone castle: three quiz doors on its north wall,
// cloud floor inside.
const SKY_CASTLE = [
  [ 1, 5, 1, 5, 1, 5, 1],
  [ 1,17,17,17,17,17, 1],
  [ 1,17,17,17,17,17, 1],
  [ 1, 1, 1, 1, 1, 1, 1],
];
// The portal home and the spot you land on beside it.
const SKY_PORTAL_PAD = [[2, 17]];

LEVELS['sky'] = {

  name: 'The Sky',
  veil: { color: 0xfff3d1, alpha: 0.10 },  // warm sunlight up here
  playerSpeed: 140,   // walking on clouds is a little bouncy

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(26, 17, 17, 18);

      const castleAt = Gen.placeRandomly(map, SKY_CASTLE, 17);
      const portalAt = Gen.placeRandomly(map, SKY_PORTAL_PAD, 17);
      if (!castleAt || !portalAt) continue;

      // The quiz doors and the star follow the castle.
      this.quiz.doors = [
        { col: castleAt.col + 1, row: castleAt.row },
        { col: castleAt.col + 3, row: castleAt.row },
        { col: castleAt.col + 5, row: castleAt.row },
      ];
      this.quiz.answers = null;
      this.quiz.solved = false;
      this.items[0].col = castleAt.col + 3;
      this.items[0].row = castleAt.row + 2;
      this.items[0].collected = false;

      // The portal home, and where travellers appear.
      this.exits = {};
      this.exits[`${portalAt.col},${portalAt.row}`] = { to: 'home', arrive: 'sky' };
      this.arrival = { col: portalAt.col + 1, row: portalAt.row };
      this.start = this.arrival;

      // Cloud banks and little stars, avoiding the arrival spot.
      Gen.protect(map, [[this.arrival.col, this.arrival.row]]);
      const puffs = [[[18]], [[18, 18]], [[18], [18]]];
      const puffCount = Gen.randInt(5, 8);
      for (let i = 0; i < puffCount; i++) {
        Gen.placeRandomly(map, puffs[Gen.randInt(0, puffs.length - 1)], 17);
      }
      Gen.scatter(map, 19, Gen.randInt(8, 12), 17);
      Gen.unprotect(map, [[this.arrival.col, this.arrival.row]], 17);

      // Safety inspection: star and portal reachable.
      if (Gen.allReachable(map, [17, 2, 5],
          [this.arrival.col, this.arrival.row], [
            [this.items[0].col, this.items[0].row],
            [portalAt.col, portalAt.row],
          ])) {
        return map;
      }
    }

    // Emergency fallback: a fixed layout.
    const map = Gen.blank(26, 17, 17, 18);
    Gen.stamp(map, 3, 3, SKY_CASTLE);
    map[12][2] = 2;
    this.quiz.doors = [{ col: 4, row: 3 }, { col: 6, row: 3 }, { col: 8, row: 3 }];
    this.items[0].col = 6; this.items[0].row = 5;
    this.exits = { '2,12': { to: 'home', arrive: 'sky' } };
    this.arrival = { col: 3, row: 12 };
    this.start = this.arrival;
    return map;
  },

  // Filled in by generate():
  start: null,
  arrival: null,
  items: [
    { id: 'star', name: 'Sky Star', texture: 'item-star', col: 0, row: 0,
      wins: true },  // the FINAL treasure — collecting it wins the game!
  ],
  quiz: { doors: [], becomes: 17, min: 2, max: 9 },
  exits: {},

  // Moving dangers + the healing wizard (handled by index.html).
  hazards: {
    texture: 'hazard-storm', count: [2, 3], speed: 85,
    message: 'Bzzt! A grumpy little storm cloud zaps you!',
  },
  wizard: { greeting: 'Wizard: Healthy as the heavens themselves!' },
};
