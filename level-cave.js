// ============================================================
//  LEVEL: cave — "The Cave"  (fully randomized!)
//
//  Tile legend:  0 grass · 1 stone wall · 2 portal
//                3 cave floor · 4 cave wall · 5 locked door
//
//  The gem chamber (dragons included — they stand guard below
//  its door) and the portal home both land somewhere new every
//  game. The chamber pattern includes two rows of guaranteed
//  open floor at the bottom: that's where the dragons stand.
// ============================================================
window.LEVELS = window.LEVELS || {};

const CAVE_CHAMBER = [
  [4,4,4,4,4,4,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,4,4,5,4,4,4],
  [3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3],
];
// The portal and the spot you land on beside it.
const CAVE_PORTAL_PAD = [[2, 3]];

LEVELS['cave'] = {

  name: 'The Cave',

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(24, 16, 3, 4);

      const chamberAt = Gen.placeRandomly(map, CAVE_CHAMBER, 3);
      if (!chamberAt) continue;

      // Reserve EVERY floor cell that belongs to the chamber —
      // its interior and the dragons' two rows — so the portal
      // pad and the random rocks can't land inside it. (They
      // would happily try: floor is floor, as far as random
      // placement knows!)
      const reserved = [];
      for (let r = 1; r <= 4; r++)
        for (let c = 1; c <= 5; c++)
          reserved.push([chamberAt.col + c, chamberAt.row + r]);
      for (let r = 6; r <= 7; r++)
        for (let c = 0; c <= 6; c++)
          reserved.push([chamberAt.col + c, chamberAt.row + r]);
      Gen.protect(map, reserved);

      const portalAt = Gen.placeRandomly(map, CAVE_PORTAL_PAD, 3);
      if (!portalAt) { Gen.unprotect(map, reserved, 3); continue; }

      // The gem, the chamber door, and the dragon guardians all
      // follow the chamber to its new home.
      this.items[0].col = chamberAt.col + 3;
      this.items[0].row = chamberAt.row + 2;
      this.items[0].collected = false;
      this.dragons.opens = { col: chamberAt.col + 3, row: chamberAt.row + 5, becomes: 3 };
      this.dragons.positions = [
        { col: chamberAt.col + 1, row: chamberAt.row + 7 },
        { col: chamberAt.col + 3, row: chamberAt.row + 7 },
        { col: chamberAt.col + 5, row: chamberAt.row + 7 },
      ];
      this.dragons.answers = null;
      this.dragons.solved = false;

      // The portal home, and where travellers (and fainters) appear.
      this.exits = {};
      this.exits[`${portalAt.col},${portalAt.row}`] = { to: 'home', arrive: 'cave' };
      this.arrival = { col: portalAt.col + 1, row: portalAt.row };
      this.start = this.arrival;

      // Keep the arrival spot free of random rocks too.
      Gen.protect(map, [[this.arrival.col, this.arrival.row]]);

      const blobs = [[[4]], [[4, 4]], [[4], [4]], [[4, 4], [4, 4]]];
      const blobCount = Gen.randInt(6, 9);
      for (let i = 0; i < blobCount; i++) {
        Gen.placeRandomly(map, blobs[Gen.randInt(0, blobs.length - 1)], 3);
      }

      Gen.unprotect(map, reserved, 3);
      Gen.unprotect(map, [[this.arrival.col, this.arrival.row]], 3);

      // Safety inspection: gem, portal, and all three dragons
      // must be reachable from the arrival spot.
      if (Gen.allReachable(map, [3, 2, 5],
          [this.arrival.col, this.arrival.row], [
            [this.items[0].col, this.items[0].row],
            [portalAt.col, portalAt.row],
            ...this.dragons.positions.map(d => [d.col, d.row]),
          ])) {
        return map;
      }
    }

    // Emergency fallback: a fixed layout.
    const map = Gen.blank(24, 16, 3, 4);
    Gen.stamp(map, 15, 1, CAVE_CHAMBER);
    map[8][1] = 2;
    this.items[0].col = 18; this.items[0].row = 3;
    this.dragons.opens = { col: 18, row: 6, becomes: 3 };
    this.dragons.positions = [
      { col: 16, row: 8 }, { col: 18, row: 8 }, { col: 20, row: 8 },
    ];
    this.exits = { '1,8': { to: 'home', arrive: 'cave' } };
    this.arrival = { col: 2, row: 8 };
    this.start = this.arrival;
    return map;
  },

  // Filled in by generate():
  start: null,
  arrival: null,
  items: [
    { id: 'gem', name: 'Cave Gem', texture: 'item-gem', col: 0, row: 0 },
  ],
  dragons: {
    positions: [],
    min: 2,
    max: 9,
    opens: null,
    message: 'The good dragon bows — the chamber opens!',
  },
  exits: {},

  // Moving dangers + the healing wizard (handled by index.html).
  hazards: {
    texture: 'hazard-bat', count: [2, 4], speed: 90,
    message: 'The bat swoops and bites!',
  },
  wizard: { greeting: 'Wizard: Not a scratch on you! Impressive, down here.' },
};
