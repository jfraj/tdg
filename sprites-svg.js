// ============================================================
//  SPRITES — SVG tile art, generated once by an AI model and
//  shipped as plain strings. No API calls at runtime, no key.
//
//  How it plugs in (two small edits in index.html):
//
//  1. Load this file next to the level files:
//        <script src="sprites-svg.js"></script>
//
//  2. In create(), right after the code-drawn tileset is
//     finished (after "tc.refresh();"), add one line:
//        SvgTiles.install(this);
//
//  That's all. The loader repaints the game's existing 'tiles'
//  canvas texture in place once the browser has rasterized the
//  SVGs (a few milliseconds) — the code-drawn tiles act as the
//  instant fallback, so if an SVG ever fails to load, the game
//  simply keeps its old look. It can never break the game.
//
//  Tile legend (same numbers as everywhere else):
//    0 grass · 1 stone wall · 2 portal · 3 cave floor
//    4 cave wall · 5 question door · 6 house wall · 7 roof
//    8 window · 9 house door · 10 tree · 11 sand
//    12 coral · 13 seaweed · 14 key door · 15 gem door
// ============================================================
window.SVG_TILES = {

  // 0 — grass: mottled green with blades and two tiny flowers
  0: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#79b154"/>
    <ellipse cx="9" cy="22" rx="7" ry="4.5" fill="#83bb5e" opacity=".8"/>
    <ellipse cx="24" cy="9" rx="6" ry="4" fill="#83bb5e" opacity=".6"/>
    <g stroke="#5b9140" stroke-width="1.2" stroke-linecap="round">
      <path d="M6 11v-3M8 12v-4M21 24v-3M23 25v-4M27 17v-3M14 18v-3"/>
    </g>
    <circle cx="13" cy="6" r="1.4" fill="#fef6d8"/><circle cx="13" cy="6" r=".6" fill="#f3b53c"/>
    <circle cx="25" cy="27" r="1.4" fill="#ffd9e6"/><circle cx="25" cy="27" r=".6" fill="#f3b53c"/>
  </svg>`,

  // 1 — stone wall: staggered bricks, lit from the top
  1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#6f675b"/>
    <g fill="#968d7f">
      <rect x="1" y="1" width="14" height="8.5" rx="1.5"/>
      <rect x="17" y="1" width="14" height="8.5" rx="1.5"/>
      <rect x="1" y="11.8" width="6" height="8.5" rx="1.5"/>
      <rect x="9" y="11.8" width="14" height="8.5" rx="1.5"/>
      <rect x="25" y="11.8" width="6" height="8.5" rx="1.5"/>
      <rect x="1" y="22.5" width="14" height="8.5" rx="1.5"/>
      <rect x="17" y="22.5" width="14" height="8.5" rx="1.5"/>
    </g>
    <g fill="#8d8476">
      <rect x="17" y="1" width="14" height="8.5" rx="1.5"/>
      <rect x="9" y="11.8" width="14" height="8.5" rx="1.5"/>
      <rect x="1" y="22.5" width="14" height="8.5" rx="1.5"/>
    </g>
    <rect width="32" height="2.5" fill="#c2bbac" opacity=".55"/>
    <rect y="29.5" width="32" height="2.5" fill="#4d473e" opacity=".5"/>
  </svg>`,

  // 2 — portal: violet vortex with a bright eye
  2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <defs><radialGradient id="pg" cx=".5" cy=".5" r=".55">
      <stop offset="0" stop-color="#efe3ff"/>
      <stop offset=".5" stop-color="#9a6cf0"/>
      <stop offset="1" stop-color="#2c2440"/>
    </radialGradient></defs>
    <rect width="32" height="32" fill="#2c2440"/>
    <circle cx="16" cy="16" r="12" fill="url(#pg)"/>
    <path d="M16 6a10 10 0 0 1 10 10" stroke="#f3eaff" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M16 26a10 10 0 0 1-10-10" stroke="#cdb2ff" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M16 10.5a5.5 5.5 0 0 1 5.5 5.5" stroke="#ffffff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="16" cy="16" r="2.6" fill="#ffffff"/>
  </svg>`,

  // 3 — cave floor: packed earth with pebbles
  3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#574639"/>
    <ellipse cx="8" cy="10" rx="3.2" ry="2.1" fill="#4a3b30"/>
    <ellipse cx="23" cy="22" rx="3.8" ry="2.5" fill="#4a3b30"/>
    <ellipse cx="26" cy="7" rx="2.1" ry="1.5" fill="#63513f"/>
    <ellipse cx="12" cy="26" rx="2.3" ry="1.6" fill="#63513f"/>
    <circle cx="18" cy="14" r="1.1" fill="#3e3228"/>
    <circle cx="5" cy="19" r=".9" fill="#3e3228"/>
  </svg>`,

  // 4 — cave wall: dark faceted rock with cracks
  4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#36302b"/>
    <polygon points="0,0 14,3 9,14 0,11" fill="#423a33"/>
    <polygon points="16,4 32,0 32,12 22,15" fill="#3d3630"/>
    <polygon points="3,16 15,17 12,30 0,28" fill="#3d3630"/>
    <polygon points="18,18 31,16 29,31 16,31" fill="#423a33"/>
    <g stroke="#241f1b" stroke-width="1.3" fill="none" stroke-linecap="round">
      <path d="M14 3l-5 11 3 16M16 4l6 11-4 16"/>
    </g>
    <rect width="32" height="2.5" fill="#564c43" opacity=".6"/>
  </svg>`,

  // 5 — QUESTION door: planks with a "?" plaque (quizzes and
  // dragons open this one — answers are the key)
  5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#4a3018"/>
    <g fill="#7a5a31">
      <rect x="1.5" y="1" width="8.4" height="30" rx="1"/>
      <rect x="11.8" y="1" width="8.4" height="30" rx="1"/>
      <rect x="22.1" y="1" width="8.4" height="30" rx="1"/>
    </g>
    <g fill="#8a693c" opacity=".6">
      <rect x="1.5" y="1" width="2.5" height="30"/>
      <rect x="11.8" y="1" width="2.5" height="30"/>
      <rect x="22.1" y="1" width="2.5" height="30"/>
    </g>
    <rect x="1" y="3.5" width="30" height="2.6" rx="1" fill="#33271c"/>
    <rect x="1" y="25.9" width="30" height="2.6" rx="1" fill="#33271c"/>
    <rect x="9" y="9" width="14" height="14" rx="2.5" fill="#33271c"/>
    <text x="16" y="16.6" text-anchor="middle" dominant-baseline="central"
      font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="bold"
      fill="#ffe9a8">?</text>
  </svg>`,

  // 6 — house wall: plaster with timber framing
  6: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#ead9b4"/>
    <ellipse cx="22" cy="10" rx="6" ry="4" fill="#e0cda4" opacity=".7"/>
    <ellipse cx="8" cy="24" rx="5" ry="3.5" fill="#e0cda4" opacity=".7"/>
    <g fill="#7c5530">
      <rect width="32" height="3"/>
      <rect y="29" width="32" height="3"/>
      <rect width="3" height="32"/>
      <rect x="29" width="3" height="32"/>
    </g>
    <path d="M3 29L29 3h-4L3 25z" fill="#7c5530"/>
  </svg>`,

  // 7 — roof: rows of warm shingles
  7: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#a23a2c"/>
    <g fill="#b8483a">
      <path d="M0 0h32v6q-4 5-8 0t-8 0t-8 0t-8 0z"/>
      <path d="M0 11h32v6q-4 5-8 0t-8 0t-8 0t-8 0z" transform="translate(4 0)"/>
      <path d="M0 22h32v6q-4 5-8 0t-8 0t-8 0t-8 0z"/>
    </g>
    <g stroke="#7e2b20" stroke-width="1.4" fill="none">
      <path d="M0 7q4 5 8 0t8 0t8 0t8 0"/>
      <path d="M-4 18q4 5 8 0t8 0t8 0t8 0t8 0"/>
      <path d="M0 29q4 5 8 0t8 0t8 0t8 0"/>
    </g>
  </svg>`,

  // 8 — window: warm lamplight behind a timber cross
  8: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#ead9b4"/>
    <rect x="5" y="5" width="22" height="22" rx="2.5" fill="#7c5530"/>
    <rect x="8" y="8" width="16" height="16" fill="#ffe9a3"/>
    <rect x="8" y="8" width="7" height="7" fill="#fff6d4"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#7c5530" stroke-width="1.8"/>
    <line x1="8" y1="16" x2="24" y2="16" stroke="#7c5530" stroke-width="1.8"/>
    <rect x="4" y="26" width="24" height="2.4" rx="1" fill="#6b4827"/>
  </svg>`,

  // 9 — house door (decorative): arched, friendly, no lock
  9: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#ead9b4"/>
    <path d="M6 32V14a10 10 0 0 1 20 0v18z" fill="#5a3c20"/>
    <path d="M8 32V14a8 8 0 0 1 16 0v18z" fill="#7a5430"/>
    <g stroke="#5a3c20" stroke-width="1.2">
      <line x1="13" y1="7.5" x2="13" y2="32"/>
      <line x1="19" y1="7.5" x2="19" y2="32"/>
    </g>
    <circle cx="21.5" cy="20" r="1.6" fill="#d9a93f"/>
  </svg>`,

  // 10 — tree: round canopy with a soft ground shadow
  10: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#79b154"/>
    <ellipse cx="16" cy="27.5" rx="10" ry="3.2" fill="#3c5e2c" opacity=".4"/>
    <rect x="14" y="21" width="4" height="7" rx="1.5" fill="#6b4827"/>
    <circle cx="16" cy="14" r="11" fill="#3e7c33"/>
    <circle cx="11.5" cy="10.5" r="6" fill="#4f9440"/>
    <circle cx="21" cy="12.5" r="5" fill="#4f9440" opacity=".85"/>
    <circle cx="17" cy="18.5" r="1.6" fill="#346a2b"/>
    <circle cx="10" cy="17" r="1.3" fill="#346a2b"/>
    <circle cx="14" cy="7" r="1.5" fill="#67ad55"/>
  </svg>`,

  // 11 — sand: sun-warmed seabed with ripples
  11: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#e6cd95"/>
    <g stroke="#f2e0b0" stroke-width="1.6" fill="none" stroke-linecap="round">
      <path d="M3 8q5-3 10 0t10 0"/>
      <path d="M8 19q5-3 10 0t10 0"/>
      <path d="M1 28q5-3 10 0t9 0"/>
    </g>
    <circle cx="6" cy="14" r="1" fill="#d2b87d"/>
    <circle cx="26" cy="12" r="1" fill="#d2b87d"/>
    <circle cx="15" cy="24" r=".8" fill="#d2b87d"/>
  </svg>`,

  // 12 — coral: pink lumps with polyp pores (the sea's walls)
  12: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#c25677"/>
    <circle cx="9" cy="9" r="6.8" fill="#ea8aa6"/>
    <circle cx="23" cy="11" r="5.8" fill="#f2a8be"/>
    <circle cx="13" cy="23" r="7.2" fill="#e87d9d"/>
    <circle cx="26" cy="25" r="4.8" fill="#f2a8be"/>
    <circle cx="9" cy="9" r="1.3" fill="#a93f60"/>
    <circle cx="13" cy="23" r="1.5" fill="#a93f60"/>
    <circle cx="11" cy="20" r="1" fill="#a93f60"/>
    <circle cx="23" cy="11" r="1.1" fill="#a93f60"/>
    <circle cx="26" cy="25" r=".9" fill="#a93f60"/>
    <circle cx="7" cy="12" r=".9" fill="#a93f60"/>
    <circle cx="5.5" cy="19" r="1.1" fill="#ffd3e0"/>
    <circle cx="19" cy="5" r="1.1" fill="#ffd3e0"/>
    <circle cx="30" cy="17" r=".9" fill="#ffd3e0"/>
  </svg>`,

  // 13 — seaweed: swaying fronds with a rising bubble
  13: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#e6cd95"/>
    <g fill="none" stroke-linecap="round">
      <path d="M8 30C6 24 11 20 8 13 6.5 9.5 9.5 6.5 8.5 3.5" stroke="#2f7d52" stroke-width="3.2"/>
      <path d="M16 31C14 25.5 19 21.5 16 14.5" stroke="#3f996a" stroke-width="3.2"/>
      <path d="M24 30C22 25 27 20 24 12.5 22.5 8.8 26 6.5 25 4" stroke="#2f7d52" stroke-width="3.2"/>
      <path d="M16 31C14 25.5 19 21.5 16 14.5" stroke="#59b283" stroke-width="1.2"/>
    </g>
    <circle cx="12" cy="6" r="1.4" fill="none" stroke="#bfe6f2" stroke-width="1"/>
  </svg>`,

  // 14 — KEY door: iron-banded planks with a golden keyhole,
  // matching the Golden Key it waits for
  14: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#4a3018"/>
    <g fill="#7a5a31">
      <rect x="1.5" y="1" width="8.4" height="30" rx="1"/>
      <rect x="11.8" y="1" width="8.4" height="30" rx="1"/>
      <rect x="22.1" y="1" width="8.4" height="30" rx="1"/>
    </g>
    <g fill="#8a693c" opacity=".6">
      <rect x="1.5" y="1" width="2.5" height="30"/>
      <rect x="11.8" y="1" width="2.5" height="30"/>
      <rect x="22.1" y="1" width="2.5" height="30"/>
    </g>
    <rect x="1" y="4" width="30" height="2.8" rx="1" fill="#d9a93f"/>
    <rect x="1" y="25.2" width="30" height="2.8" rx="1" fill="#d9a93f"/>
    <circle cx="16" cy="15.5" r="5" fill="#d9a93f" stroke="#8a6420" stroke-width="1"/>
    <circle cx="16" cy="14.2" r="1.6" fill="#4a3018"/>
    <path d="M15 15.2h2l.7 4.3h-3.4z" fill="#4a3018"/>
  </svg>`,

  // 15 — GEM door: coral stone with a gem-shaped hollow, the
  // exact silhouette of the Cave Gem, rimmed with its cyan glint
  15: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#8e3d52"/>
    <g fill="#a84e66">
      <rect x="1.5" y="1.5" width="13.5" height="13.5" rx="1.5"/>
      <rect x="17" y="1.5" width="13.5" height="13.5" rx="1.5"/>
      <rect x="1.5" y="17" width="13.5" height="13.5" rx="1.5"/>
      <rect x="17" y="17" width="13.5" height="13.5" rx="1.5"/>
    </g>
    <polygon points="16,6 24,14.5 16,26 8,14.5" fill="#1d0f16"/>
    <polygon points="16,6 24,14.5 16,26 8,14.5" fill="none"
      stroke="#46d6c9" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 14.5h16" stroke="#2a6f68" stroke-width="1"/>
    <circle cx="26" cy="5" r="1.1" fill="#9ff0e8"/>
    <circle cx="5.5" cy="26.5" r="1.1" fill="#9ff0e8"/>
  </svg>`,
};

// ============================================================
//  LOADER — rasterizes the SVGs above and paints them over the
//  game's code-drawn 'tiles' canvas texture (frame N = tile N,
//  the exact layout create() already builds). Runs once at
//  boot. If anything fails, SvgTiles.ready stays false and the
//  game keeps the code-drawn tiles — graceful fallback.
// ============================================================
window.SvgTiles = {
  ready: false,

  install(scene, key = 'tiles', size = 32) {
    const ids = Object.keys(window.SVG_TILES).map(Number);

    // Each SVG string becomes an Image (browsers rasterize SVG
    // natively when it's used as an image source).
    const loadOne = (id) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ id, img });
      img.onerror = () => reject(new Error('SVG tile ' + id + ' failed'));
      img.src = 'data:image/svg+xml;charset=utf-8,'
              + encodeURIComponent(window.SVG_TILES[id].replace(/\s+/g, ' '));
    });

    return Promise.all(ids.map(loadOne)).then((images) => {
      const tex = scene.textures.get(key);
      if (!tex || !tex.context) throw new Error("texture '" + key + "' is not a canvas texture");
      images.forEach(({ id, img }) => {
        tex.context.clearRect(id * size, 0, size, size);
        tex.context.drawImage(img, id * size, 0, size, size);
      });
      tex.refresh();           // pushes the repainted canvas to the GPU
      window.SvgTiles.ready = true;
      return key;
    }).catch((err) => {
      // Fallback: the code-drawn tiles stay — log it and move on.
      console.warn('SVG tiles unavailable, keeping code-drawn art:', err.message);
      return key;
    });
  },
};
