// ============================================================
//  QUESTIONS — la banque de questions du jeu
//
//  Ce fichier est fait pour être modifié par un parent ou un
//  professeur. Le jeu utilisera ces questions pour les portes
//  magiques ET pour les dragons.
//
//  Format de chaque question :
//    { q: "la question", a: "la bonne réponse" }
//
//  Optionnel — choisir soi-même les mauvaises réponses :
//    { q: "...", a: "...", wrong: ["mauvaise 1", "mauvaise 2"] }
//
//  Règles :
//  - Sans "wrong", le jeu pioche les mauvaises réponses parmi
//    les réponses des AUTRES questions (il faut donc au moins
//    3 questions aux réponses différentes).
//  - Le jeu choisit une question au hasard à chaque fois, et
//    en pose une NOUVELLE après chaque erreur.
//  - Pour revenir aux multiplications : videz la liste
//    (laissez "window.QUESTIONS = [];") ou supprimez ce
//    fichier de la liste des <script> dans index.html.
// ============================================================

window.QUESTIONS = [

  // --- Le verbe AVOIR au présent ---
  { q: "Verbe AVOIR au présent — Je ...", a: "j'ai", wrong: ["j'as", "j'a"] },
  { q: "Verbe AVOIR au présent — Tu ...", a: "tu as", wrong: ["tu a", "tu ai"] },
  { q: "Verbe AVOIR au présent — Il/Elle ...", a: "il a", wrong: ["il as", "il ai"] },
  { q: "Verbe AVOIR au présent — Nous ...", a: "nous avons", wrong: ["nous avont", "nous ont"] },
  { q: "Verbe AVOIR au présent — Vous ...", a: "vous avez", wrong: ["vous avés", "vous avons"] },
  { q: "Verbe AVOIR au présent — Ils/Elles ...", a: "ils ont", wrong: ["ils sont", "ils ons"] },

  // --- Le verbe ÊTRE au présent ---
  { q: "Verbe ÊTRE au présent — Je ...", a: "je suis", wrong: ["je suit", "je sui"] },
  { q: "Verbe ÊTRE au présent — Tu ...", a: "tu es", wrong: ["tu est", "tu ai"] },
  { q: "Verbe ÊTRE au présent — Il/Elle ...", a: "il est", wrong: ["il es", "il et"] },
  { q: "Verbe ÊTRE au présent — Nous ...", a: "nous sommes", wrong: ["nous somme", "nous sont"] },
  { q: "Verbe ÊTRE au présent — Vous ...", a: "vous êtes", wrong: ["vous être", "vous est"] },
  { q: "Verbe ÊTRE au présent — Ils/Elles ...", a: "ils sont", wrong: ["ils ont", "ils son"] },

  // --- D'autres idées (enlevez les // pour les activer) ---
  // { q: "Quelle est la capitale du Canada ?", a: "Ottawa", wrong: ["Toronto", "Montréal"] },
  // { q: "Combien font 7 × 8 ?", a: "56", wrong: ["54", "63"] },
  // { q: "Le pluriel de « cheval » ?", a: "chevaux", wrong: ["chevals", "chevaus"] },

];
