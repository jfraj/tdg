// ============================================================
//  LEVEL: home — "The Meadow"  (procedurally generated!)
//
//  Tile legend:
//    0 grass · 1 stone wall · 2 portal · 5 locked door
//    6 house wall · 7 roof · 8 window · 9 house door · 10 tree
//
//  Instead of a fixed "map:", this level has a generate()
//  recipe: two fixed rooms always go in the same place (so the
//  key, doors, and portal coordinates below keep working), and
//  then houses and trees land somewhere NEW every game. A
//  flood-fill check guarantees the world is always winnable.
// ============================================================
window.LEVELS = window.LEVELS || {};

// The two fixed structures, as stampable patterns:
const MEADOW_QUIZ_ROOM = [
  [1,5,1,5,1,5,1],
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
];
const MEADOW_PORTAL_ROOM = [
  [1,1,1,1,1],
  [1,0,0,0,1],
  [5,0,0,2,1],
  [1,0,0,0,1],
  [1,1,1,1,1],
];

LEVELS['home'] = {

  name: 'The Meadow',

  start: { col: 2, row: 2 },

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      const map = Gen.blank(30, 20, 0, 1);

      // The fixed rooms (their positions match the coordinates
      // in "quiz", "items", "doors" and "exits" below).
      Gen.stamp(map, 2, 14, MEADOW_QUIZ_ROOM);
      Gen.stamp(map, 25, 8, MEADOW_PORTAL_ROOM);

      // Keep the spawn area free of random decoration.
      const keep = [[2, 2], [3, 2], [2, 3]];
      Gen.protect(map, keep);

      // 3–5 houses with randomly mixed faces. A house is a roof
      // row (7s) on top of a row of wall/door/window tiles.
      const houseCount = Gen.randInt(3, 5);
      for (let i = 0; i < houseCount; i++) {
        const faces = [[6, 9, 8], [8, 9, 6], [9, 8], [8, 9]];
        const face = faces[Gen.randInt(0, faces.length - 1)];
        Gen.placeRandomly(map, [face.map(() => 7), face], 0);
      }

      // A sprinkle of trees.
      Gen.scatter(map, 10, Gen.randInt(12, 18), 0);

      Gen.unprotect(map, keep, 0);

      // Safety inspection: from the spawn, the key and the
      // portal must both be reachable (doors count as walkable
      // because they can be opened). If not, roll a new world.
      if (Gen.allReachable(map, [0, 2, 5], [2, 2], [[5, 16], [28, 10]])) {
        return map;
      }
    }
    // Emergency fallback (practically never happens): a plain
    // meadow with just the two rooms.
    const map = Gen.blank(30, 20, 0, 1);
    Gen.stamp(map, 2, 14, MEADOW_QUIZ_ROOM);
    Gen.stamp(map, 25, 8, MEADOW_PORTAL_ROOM);
    return map;
  },

  // The Golden Key, inside the quiz room.
  items: [
    { id: 'key', name: 'Golden Key', texture: 'item-key', col: 5, row: 16 },
  ],

  // The MATH quiz guarding the key.
  quiz: {
    doors: [
      { col: 3, row: 14 },
      { col: 5, row: 14 },
      { col: 7, row: 14 },
    ],
    becomes: 0,
    min: 2,
    max: 9,
  },

  // The item-locked door guarding the portal.
  doors: {
    '25,10': {
      needs: 'key',
      becomes: 0,
      message: 'The Golden Key turns... the door to the portal opens!',
    },
  },

  exits: {
    '28,10': { to: 'cave', spawn: { col: 2, row: 8 } },
  },
};
