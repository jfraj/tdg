// ============================================================
//  LEVEL: space — "Outer Space"  (procedurally generated!)
//
//  Tile legend:  1 stone wall · 2 portal · 5 question door
//                21 space floor (walkable) · 22 asteroid
//                23 glowing star (decoration)
//
//  Reached through the meadow's star gate, whose star door only
//  opens with the Sky Star. Out here the player wears a SPACE
//  SUIT, drifting past asteroids and glowing stars while UFOs
//  patrol. A SPACE STATION's three doors run the same quiz,
//  guarding the SPACESHIP — the final treasure, which blasts
//  the astronaut away during the victory celebration. Beware
//  the flying saucers!
// ============================================================
window.LEVELS = window.LEVELS || {};

// A space station: three quiz doors on its north wall, station
// floor inside.
const SPACE_STATION = [
  [ 1, 5, 1, 5, 1, 5, 1],
  [ 1,21,21,21,21,21, 1],
  [ 1,21,21,21,21,21, 1],
  [ 1, 1, 1, 1, 1, 1, 1],
];
// The portal home and the spot you land on beside it.
const SPACE_PORTAL_PAD = [[2, 21]];

LEVELS['space'] = {

  name: 'Outer Space',
  veil: { color: 0x1a0a3a, alpha: 0.12 },  // the deep-purple dark of space
  playerSpeed: 120,        // drifting in low gravity is slow
  playerTexture: 'player-space',  // the astronaut suit!

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(26, 17, 21, 22);

      const stationAt = Gen.placeRandomly(map, SPACE_STATION, 21);
      const portalAt  = Gen.placeRandomly(map, SPACE_PORTAL_PAD, 21);
      if (!stationAt || !portalAt) continue;

      // The quiz doors and the spaceship follow the station.
      this.quiz.doors = [
        { col: stationAt.col + 1, row: stationAt.row },
        { col: stationAt.col + 3, row: stationAt.row },
        { col: stationAt.col + 5, row: stationAt.row },
      ];
      this.quiz.answers = null;
      this.quiz.solved = false;
      this.items[0].col = stationAt.col + 3;
      this.items[0].row = stationAt.row + 2;
      this.items[0].collected = false;

      // The portal home, and where travellers appear.
      this.exits = {};
      this.exits[`${portalAt.col},${portalAt.row}`] = { to: 'home', arrive: 'space' };
      this.arrival = { col: portalAt.col + 1, row: portalAt.row };
      this.start = this.arrival;

      // Asteroid clusters and glowing stars, avoiding the arrival spot.
      Gen.protect(map, [[this.arrival.col, this.arrival.row]]);
      const rocks = [[[22]], [[22, 22]], [[22], [22]], [[22, 22], [22, 22]]];
      const rockCount = Gen.randInt(5, 8);
      for (let i = 0; i < rockCount; i++) {
        Gen.placeRandomly(map, rocks[Gen.randInt(0, rocks.length - 1)], 21);
      }
      Gen.scatter(map, 23, Gen.randInt(8, 12), 21);
      Gen.unprotect(map, [[this.arrival.col, this.arrival.row]], 21);

      // Safety inspection: spaceship and portal reachable.
      if (Gen.allReachable(map, [21, 2, 5],
          [this.arrival.col, this.arrival.row], [
            [this.items[0].col, this.items[0].row],
            [portalAt.col, portalAt.row],
          ])) {
        return map;
      }
    }

    // Emergency fallback: a fixed layout.
    const map = Gen.blank(26, 17, 21, 22);
    Gen.stamp(map, 3, 3, SPACE_STATION);
    map[12][2] = 2;
    this.quiz.doors = [{ col: 4, row: 3 }, { col: 6, row: 3 }, { col: 8, row: 3 }];
    this.items[0].col = 6; this.items[0].row = 5;
    this.exits = { '2,12': { to: 'home', arrive: 'space' } };
    this.arrival = { col: 3, row: 12 };
    this.start = this.arrival;
    return map;
  },

  // Filled in by generate():
  start: null,
  arrival: null,
  items: [
    { id: 'ship', name: 'Spaceship', texture: 'item-ship', col: 0, row: 0,
      wins: true, victoryIntro: 'blastoff' },  // the FINAL treasure — it flies you away!
  ],
  quiz: { doors: [], becomes: 21, min: 2, max: 9 },
  exits: {},

  // Moving dangers + the healing wizard (handled by index.html).
  hazards: {
    texture: 'hazard-ship', count: [2, 3], speed: 95,
    message: 'Whoosh! A flying saucer buzzes you!',
  },
  wizard: { greeting: 'Wizard: Glowing with health, even among the stars!' },
};
