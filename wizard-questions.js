// ============================================================
//  WIZARD-QUESTIONS — les questions du MAGICIEN GUÉRISSEUR
//
//  Le magicien se tient quelque part dans chaque monde. Si le
//  joueur a perdu des cœurs, il pose une question : la bonne
//  réponse rend UN cœur. Une mauvaise réponse ne fait pas de
//  mal — il pose simplement une autre question.
//
//  Même format que questions.js :
//    { q: "la question", a: "la bonne réponse" }
//    { q: "...", a: "...", wrong: ["mauvaise 1", "mauvaise 2"] }
//
//  Règles (identiques à questions.js) :
//  - Sans "wrong", les mauvaises réponses sont piochées parmi
//    les réponses des AUTRES questions.
//  - Si ce fichier manque, ou si la liste est vide, le magicien
//    invente des multiplications, comme les portes magiques.
//
//  Idée pédagogique : mettre ici une matière DIFFÉRENTE de
//  celle des portes — ici, du calcul mental rapide, pendant
//  que les portes font la conjugaison.
// ============================================================

window.WIZARD_QUESTIONS = [

  // --- Compléments à 10 ---
  { q: "Magicien : 7 + ? = 10", a: "3", wrong: ["4", "2"] },
  { q: "Magicien : 6 + ? = 10", a: "4", wrong: ["5", "3"] },
  { q: "Magicien : 2 + ? = 10", a: "8", wrong: ["7", "9"] },

  // --- Les doubles ---
  { q: "Magicien : le double de 6 ?", a: "12", wrong: ["13", "11"] },
  { q: "Magicien : le double de 8 ?", a: "16", wrong: ["14", "18"] },
  { q: "Magicien : le double de 9 ?", a: "18", wrong: ["16", "19"] },

  // --- Additions et soustractions ---
  { q: "Magicien : 7 + 8 = ?", a: "15", wrong: ["14", "16"] },
  { q: "Magicien : 13 - 5 = ?", a: "8", wrong: ["7", "9"] },
  { q: "Magicien : 9 + 6 = ?", a: "15", wrong: ["16", "14"] },
  { q: "Magicien : 12 - 4 = ?", a: "8", wrong: ["9", "7"] },

  // --- D'autres idées (enlevez les // pour les activer) ---
  // { q: "Magicien : la moitié de 14 ?", a: "7", wrong: ["6", "8"] },
  // { q: "Magicien : 5 × 10 = ?", a: "50", wrong: ["55", "45"] },

];
