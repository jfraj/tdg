// ============================================================
//  LEVEL: cave — "The Cave"  (procedurally generated!)
//
//  Tile legend:  0 grass · 1 stone wall · 2 portal
//                3 cave floor · 4 cave wall · 5 locked door
//
//  The gem chamber and the dragons stay where they are; the
//  rock formations are different every game. The flood-fill
//  check guarantees the gem, the dragons, and the portal home
//  are always reachable.
// ============================================================
window.LEVELS = window.LEVELS || {};

// The sealed gem chamber, as a stampable pattern (the 5 is its
// locked door, opened by the good dragon):
const CAVE_CHAMBER = [
  [4,4,4,4,4,4,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,3,3,3,3,3,4],
  [4,4,4,5,4,4,4],
];

LEVELS['cave'] = {

  name: 'The Cave',

  start: { col: 2, row: 8 },

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(24, 16, 3, 4);

      // The chamber goes in the top-right, the portal on the
      // left wall — fixed, to match the coordinates below.
      Gen.stamp(map, 17, 0, CAVE_CHAMBER);
      map[8][1] = 2; // the portal home

      // Keep the spawn, the dragons' spots, and the chamber
      // doorstep free of random rocks.
      const keep = [[2, 8], [3, 8], [15, 8], [18, 8], [21, 8], [20, 6], [20, 7]];
      Gen.protect(map, keep);

      // 7–10 random rock formations of various shapes.
      const blobs = [
        [[4]],
        [[4, 4]],
        [[4], [4]],
        [[4, 4], [4, 4]],
      ];
      const blobCount = Gen.randInt(7, 10);
      for (let i = 0; i < blobCount; i++) {
        Gen.placeRandomly(map, blobs[Gen.randInt(0, blobs.length - 1)], 3);
      }

      Gen.unprotect(map, keep, 3);

      // Safety inspection: gem, portal, and all three dragons
      // must be reachable from the spawn.
      if (Gen.allReachable(map, [3, 2, 5], [2, 8],
          [[20, 2], [1, 8], [15, 8], [18, 8], [21, 8]])) {
        return map;
      }
    }
    // Emergency fallback: a plain cave with just the chamber.
    const map = Gen.blank(24, 16, 3, 4);
    Gen.stamp(map, 17, 0, CAVE_CHAMBER);
    map[8][1] = 2;
    return map;
  },

  // The gem waits inside the sealed chamber.
  items: [
    { id: 'gem', name: 'Cave Gem', texture: 'item-gem', col: 20, row: 2 },
  ],

  // The dragon guardians (two evil, one good — the math knows).
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
