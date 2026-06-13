// ============================================================
//  LEVEL: home — "The Meadow"  (fully randomized!)
//
//  Tile legend:
//    0 grass · 1 stone wall · 2 portal · 5 question door
//    6 house wall · 7 roof · 8 window · 9 house door · 10 tree
//    14 key door · 15 gem door · 16 pearl door · 20 star door
//    (each shows what unlocks it!) · 18 cloud bank · 22 asteroid
//
//  Now even the quiz room and the portal room land somewhere
//  NEW every game — and all the coordinates (key, doors,
//  portal, arrival spot) follow them. The "doors", "exits",
//  and item positions below start empty: generate() fills
//  them in once it knows where the rooms ended up.
// ============================================================
window.LEVELS = window.LEVELS || {};

const MEADOW_QUIZ_ROOM = [
  [1,5,1,5,1,5,1],
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
];
const MEADOW_PORTAL_ROOM = [
  [ 1,1,1,1,1],
  [ 1,0,0,0,1],
  [14,0,0,2,1],   // 14 = KEY door: its keyhole matches the Golden Key
  [ 1,0,0,0,1],
  [ 1,1,1,1,1],
];
// The sea gate: same shape, but built of pink CORAL (12) so the
// player can tell the two portals apart. Its door needs the gem.
// The space gate: built of grey ASTEROID rock (22), unmistakably
// from the void. Its star door (20) waits for the Sky Star.
const MEADOW_SPACE_GATE = [
  [22,22,22,22,22],
  [22, 0, 0, 0,22],
  [20, 0, 0, 2,22],
  [22, 0, 0, 0,22],
  [22,22,22,22,22],
];
// The sky gate: built of white CLOUD BANKS (18), unmistakably
// from above. Its pearl door (16) waits for the Sea Pearl.
const MEADOW_SKY_GATE = [
  [18,18,18,18,18],
  [18, 0, 0, 0,18],
  [16, 0, 0, 2,18],
  [18, 0, 0, 0,18],
  [18,18,18,18,18],
];
const MEADOW_SEA_GATE = [
  [12,12,12,12,12],
  [12, 0, 0, 0,12],
  [15, 0, 0, 2,12],   // 15 = GEM door: a gem-shaped hollow awaits the Cave Gem
  [12, 0, 0, 0,12],
  [12,12,12,12,12],
];

LEVELS['home'] = {

  name: 'The Meadow',

  // The game always begins here (kept clear during generation).
  start: { col: 2, row: 2 },

  generate: function () {
    for (let attempt = 0; attempt < 50; attempt++) {
      // Five rooms share the meadow now — it grew again.
      const map = Gen.blank(34, 24, 0, 1);

      // Keep the starting corner free.
      const keep = [[2, 2], [3, 2], [2, 3]];
      Gen.protect(map, keep);

      // The rooms land at RANDOM spots...
      const portalAt = Gen.placeRandomly(map, MEADOW_PORTAL_ROOM, 0);
      const quizAt   = Gen.placeRandomly(map, MEADOW_QUIZ_ROOM, 0);
      const seaAt    = Gen.placeRandomly(map, MEADOW_SEA_GATE, 0);
      const skyAt    = Gen.placeRandomly(map, MEADOW_SKY_GATE, 0);
      const spaceAt  = Gen.placeRandomly(map, MEADOW_SPACE_GATE, 0);
      if (!portalAt || !quizAt || !seaAt || !skyAt || !spaceAt) continue; // no room? roll again

      // ...and every coordinate follows them.
      // Cave portal room: door needs the key.
      this.doors = {};
      this.doors[`${portalAt.col},${portalAt.row + 2}`] = {
        needs: 'key', becomes: 0,
        message: 'The Golden Key turns... the door to the portal opens!',
      };
      // Sea gate: its coral door needs the GEM from the cave.
      this.doors[`${seaAt.col},${seaAt.row + 2}`] = {
        needs: 'gem', becomes: 0,
        message: 'The Cave Gem shimmers... the way to the sea opens!',
      };
      // Sky gate: its pearl door needs the PEARL from the sea.
      this.doors[`${skyAt.col},${skyAt.row + 2}`] = {
        needs: 'pearl', becomes: 0,
        message: 'The Sea Pearl glows... the way to the sky opens!',
      };
      // Space gate: its star door needs the STAR from the sky.
      this.doors[`${spaceAt.col},${spaceAt.row + 2}`] = {
        needs: 'star', becomes: 0,
        message: 'The Sky Star blazes... the way to outer space opens!',
      };
      this.exits = {};
      this.exits[`${portalAt.col + 3},${portalAt.row + 2}`] = { to: 'cave' };
      this.exits[`${seaAt.col + 3},${seaAt.row + 2}`]       = { to: 'sea' };
      this.exits[`${skyAt.col + 3},${skyAt.row + 2}`]       = { to: 'sky' };
      this.exits[`${spaceAt.col + 3},${spaceAt.row + 2}`]   = { to: 'space' };

      // Two portals lead here, so arrivals are NAMED: travellers
      // from the cave and from the sea land by their own gate.
      this.arrivals = {
        cave: { col: portalAt.col + 1, row: portalAt.row + 2 },
        sea:  { col: seaAt.col + 1,    row: seaAt.row + 2 },
        sky:  { col: skyAt.col + 1,    row: skyAt.row + 2 },
        space:{ col: spaceAt.col + 1,   row: spaceAt.row + 2 },
      };
      this.arrival = this.arrivals.cave;

      // Quiz room: three doors on its north wall, key inside.
      this.quiz.doors = [
        { col: quizAt.col + 1, row: quizAt.row },
        { col: quizAt.col + 3, row: quizAt.row },
        { col: quizAt.col + 5, row: quizAt.row },
      ];
      this.quiz.answers = null;
      this.quiz.solved = false;
      this.items[0].col = quizAt.col + 3;
      this.items[0].row = quizAt.row + 2;
      this.items[0].collected = false;

      // The village dressing: houses and trees (a touch fewer —
      // three rooms now share the meadow).
      const houseCount = Gen.randInt(3, 4);
      for (let i = 0; i < houseCount; i++) {
        const faces = [[6, 9, 8], [8, 9, 6], [9, 8], [8, 9]];
        const face = faces[Gen.randInt(0, faces.length - 1)];
        Gen.placeRandomly(map, [face.map(() => 7), face], 0);
      }
      Gen.scatter(map, 10, Gen.randInt(10, 15), 0);

      Gen.unprotect(map, keep, 0);

      // Safety inspection: key and BOTH portals reachable.
      // (5, 14 and 15 are all doors — they open, so they count
      // as walkable for the flood fill.)
      if (Gen.allReachable(map, [0, 2, 5, 14, 15, 16, 20], [2, 2], [
        [this.items[0].col, this.items[0].row],
        [portalAt.col + 3, portalAt.row + 2],
        [seaAt.col + 3, seaAt.row + 2],
        [skyAt.col + 3, skyAt.row + 2],
        [spaceAt.col + 3, spaceAt.row + 2],
      ])) {
        return map;
      }
    }

    // Emergency fallback: the classic fixed layout.
    const map = Gen.blank(34, 24, 0, 1);
    Gen.stamp(map, 2, 16, MEADOW_QUIZ_ROOM);
    Gen.stamp(map, 27, 9, MEADOW_PORTAL_ROOM);
    Gen.stamp(map, 12, 3, MEADOW_SEA_GATE);
    Gen.stamp(map, 20, 18, MEADOW_SKY_GATE);
    Gen.stamp(map, 4, 4, MEADOW_SPACE_GATE);
    this.doors = {
      '27,11': { needs: 'key', becomes: 0,
        message: 'The Golden Key turns... the door to the portal opens!' },
      '12,5': { needs: 'gem', becomes: 0,
        message: 'The Cave Gem shimmers... the way to the sea opens!' },
      '20,20': { needs: 'pearl', becomes: 0,
        message: 'The Sea Pearl glows... the way to the sky opens!' },
      '4,6': { needs: 'star', becomes: 0,
        message: 'The Sky Star blazes... the way to outer space opens!' },
    };
    this.exits = { '30,11': { to: 'cave' }, '15,5': { to: 'sea' }, '23,20': { to: 'sky' }, '7,6': { to: 'space' } };
    this.arrivals = { cave: { col: 28, row: 11 }, sea: { col: 13, row: 5 },
                      sky: { col: 21, row: 20 }, space: { col: 5, row: 6 } };
    this.arrival = this.arrivals.cave;
    this.quiz.doors = [{ col: 3, row: 14 }, { col: 5, row: 14 }, { col: 7, row: 14 }];
    this.items[0].col = 5; this.items[0].row = 16;
    return map;
  },

  // Filled in by generate():
  arrival: null,
  arrivals: null,
  items: [
    { id: 'key', name: 'Golden Key', texture: 'item-key', col: 0, row: 0 },
  ],
  quiz: { doors: [], becomes: 0, min: 2, max: 9 },
  doors: {},
  exits: {},

  // Moving dangers + the healing wizard (handled by index.html).
  hazards: {
    texture: 'hazard-bee', count: [2, 3], speed: 70,
    message: 'Ouch! A bee sting!',
  },
  wizard: { greeting: 'Wizard: You look perfectly healthy, adventurer!' },
};
