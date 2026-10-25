/* ==========================================================
   IRON HOUSE FITNESS — exercise illustrations (demo)
   An athlete figure (body, clothes, shoes) is drawn from joint positions
   and animated between two poses (A = start, B = end). The muscle the
   exercise targets is highlighted in red. Joint angles are computed from
   the same poses. 5 exercises per muscle, every set is 10–12 reps.
   Joints: s=shoulder p=hip e=elbow w=wrist k=knee a=ankle (side view, facing right).
   ========================================================== */
(function () {
  "use strict";

  const MUSCLES = [
    { id: "chest", label: "Chest" },
    { id: "back", label: "Back" },
    { id: "legs", label: "Legs" },
    { id: "shoulders", label: "Shoulders" },
    { id: "arms", label: "Arms" },
    { id: "core", label: "Core" },
  ];
  const MUSCLE_EXERCISES = {
    chest: ["bench", "pushup", "pullover", "incline", "cablefly"],
    back: ["deadlift", "row", "pullup", "pulldown", "superman"],
    legs: ["squat", "lunge", "glute", "calf", "goodmorning"],
    shoulders: ["ohp", "frontraise", "upright", "shrug", "revfly"],
    arms: ["curl", "triceps", "kickback", "dips", "pushdown"],
    core: ["situp", "legraise", "crunch", "climber", "kneeraise"],
  };
  // Sets and rest (seconds) per program. Reps are always 10–12.
  const PROGRAM_PLAN = {
    p1: { sets: 3, rest: 60 }, p2: { sets: 4, rest: 90 }, p3: { sets: 4, rest: 60 }, p4: { sets: 3, rest: 60 },
    p5: { sets: 3, rest: 45 }, p6: { sets: 4, rest: 30 }, p7: { sets: 3, rest: 45 }, p8: { sets: 4, rest: 60 },
  };
  const REPS = { min: 10, max: 12 };
  // Add an exercise id here after putting an AI-generated photo at assets/exercises/<id>.jpg
  const PHOTOS = [];

  const BENCH = '<rect x="12" y="76" width="78" height="5" rx="2"/><path d="M22 81v9M80 81v9"/>';
  const SMALL_BENCH = '<rect x="12" y="76" width="32" height="5" rx="2"/><path d="M20 81v9M38 81v9"/>';
  const BAR = '<path d="M26 8h68M26 8v82M94 8v82"/>';
  const HANG_BAR = '<path d="M26 2h68M26 2v88M94 2v88"/>';
  const BOX = '<rect x="88" y="64" width="26" height="26" rx="2"/>';
  const SEAT = '<rect x="40" y="71" width="32" height="5" rx="2"/><path d="M52 76v14M64 -6v12"/>';
  const STAND = { s: [58, 24], p: [58, 48], k: [58, 70], a: [58, 89] };
  const stand = (arm) => ({ ...STAND, ...arm });
  const LYING_BENCH = { s: [30, 72], p: [62, 72], k: [80, 66], a: [84, 89] };
  const LYING_FLOOR = { s: [28, 84], p: [58, 84], h: [18, 84] };
  const BENT = { s: [68, 44], p: [40, 54], k: [52, 72], a: [50, 89] };
  const PLANK_UP = { s: [84, 60], p: [54, 73], e: [85, 74], w: [86, 88] };

  /* hi = which body regions to highlight (the targeted muscle) */
  const EXERCISES = {
    /* chest */
    bench: { name: "Bench Press", muscle: "chest", hi: ["chest"], angle: "elbow", gear: "plate", scene: BENCH,
      A: { ...LYING_BENCH, e: [38, 66], w: [31, 62] }, B: { ...LYING_BENCH, e: [31, 59], w: [30, 46] } },
    pushup: { name: "Push-Up", muscle: "chest", hi: ["chest"], angle: "elbow", gear: "none",
      A: { ...PLANK_UP, k: [38, 81], a: [22, 88] },
      B: { s: [84, 78], p: [54, 83], k: [38, 86], a: [22, 88], e: [72, 82], w: [86, 88] } },
    pullover: { name: "Dumbbell Pullover", muscle: "chest", hi: ["chest"], angle: "shoulder", gear: "db", scene: BENCH,
      A: { ...LYING_BENCH, e: [30, 59], w: [30, 46] }, B: { ...LYING_BENCH, e: [19, 62], w: [7, 62] } },
    incline: { name: "Incline Push-Up", muscle: "chest", hi: ["chest"], angle: "elbow", gear: "none", scene: BOX,
      A: { s: [86, 42], p: [54, 65], k: [38, 77], a: [22, 88], e: [89, 54], w: [92, 62] },
      B: { s: [84, 56], p: [54, 72], k: [38, 80], a: [22, 88], e: [74, 62], w: [92, 62] } },
    cablefly: { name: "Cable Fly", muscle: "chest", hi: ["chest"], angle: "shoulder", gear: "db",
      A: stand({ e: [48, 32], w: [38, 40] }), B: stand({ e: [70, 28], w: [82, 26] }) },
    /* back */
    deadlift: { name: "Deadlift", muscle: "back", hi: ["lowback", "glute"], angle: "hip", gear: "plate",
      A: { s: [68, 52], p: [46, 64], k: [66, 70], a: [52, 89], e: [65, 65], w: [62, 78] },
      B: { s: [52, 22], p: [48, 44], k: [54, 66], a: [52, 89], e: [53, 36], w: [54, 50] } },
    row: { name: "Bent-Over Row", muscle: "back", hi: ["back"], angle: "elbow", gear: "plate",
      A: { ...BENT, e: [70, 58], w: [70, 70] }, B: { ...BENT, e: [52, 52], w: [64, 58] } },
    pullup: { name: "Pull-Up", muscle: "back", hi: ["back"], angle: "elbow", gear: "none", scene: BAR, noFloor: true,
      A: { s: [60, 32], p: [60, 56], k: [60, 74], a: [52, 88], e: [60, 21], w: [60, 10] },
      B: { s: [60, 18], p: [60, 42], k: [60, 60], a: [52, 74], e: [52, 22], w: [60, 10] } },
    pulldown: { name: "Lat Pulldown", muscle: "back", hi: ["back"], angle: "elbow", gear: "db", scene: SEAT,
      A: { s: [56, 40], p: [54, 66], k: [78, 66], a: [80, 89], e: [61, 27], w: [64, 14] },
      B: { s: [56, 40], p: [54, 66], k: [78, 66], a: [80, 89], e: [50, 52], w: [62, 42] } },
    superman: { name: "Superman", muscle: "back", hi: ["lowback"], angle: "hip", gear: "none",
      A: { s: [78, 82], p: [46, 84], k: [28, 84], a: [12, 84], f: [4, 86], e: [92, 82], w: [104, 82] },
      B: { s: [78, 72], p: [46, 84], k: [28, 80], a: [12, 74], f: [4, 76], e: [92, 68], w: [104, 62] } },
    /* legs */
    squat: { name: "Squat", muscle: "legs", hi: ["thigh", "glute"], angle: "knee", gear: "plate",
      A: stand({ e: [54, 34], w: [60, 24] }),
      B: { s: [57, 40], p: [46, 62], k: [68, 70], a: [60, 89], e: [52, 50], w: [58, 38] } },
    lunge: { name: "Walking Lunge", muscle: "legs", hi: ["thigh", "glute"], angle: "knee", gear: "db",
      A: stand({ e: [58, 38], w: [58, 50] }),
      B: { s: [56, 38], p: [56, 62], k: [80, 64], a: [78, 89], k2: [42, 80], a2: [26, 89], e: [56, 50], w: [56, 62] } },
    glute: { name: "Glute Bridge", muscle: "legs", hi: ["glute"], angle: "hip", gear: "none",
      A: { ...LYING_FLOOR, k: [78, 68], a: [78, 89], e: [38, 86], w: [48, 86] },
      B: { ...LYING_FLOOR, p: [58, 74], k: [80, 67], a: [80, 89], e: [38, 86], w: [48, 86] } },
    calf: { name: "Calf Raise", muscle: "legs", hi: ["calf"], angle: "ankle", gear: "db",
      A: stand({ e: [58, 38], w: [58, 50] }),
      B: { s: [58, 17], p: [58, 41], k: [58, 63], a: [58, 82], f: [66, 89], e: [58, 31], w: [58, 43] } },
    goodmorning: { name: "Good Morning", muscle: "legs", hi: ["thigh", "glute"], angle: "hip", gear: "plate",
      A: stand({ e: [54, 34], w: [60, 24] }),
      B: { s: [72, 42], p: [48, 50], k: [52, 70], a: [52, 89], e: [66, 46], w: [72, 38] } },
    /* shoulders */
    ohp: { name: "Overhead Press", muscle: "shoulders", hi: ["shoulders"], angle: "elbow", gear: "plate",
      A: stand({ e: [53, 36], w: [60, 24] }), B: stand({ e: [60, 11], w: [60, -1] }) },
    frontraise: { name: "Front Raise", muscle: "shoulders", hi: ["shoulders"], angle: "shoulder", gear: "db",
      A: stand({ e: [58, 38], w: [58, 50] }), B: stand({ e: [72, 26], w: [86, 26] }) },
    upright: { name: "Upright Row", muscle: "shoulders", hi: ["shoulders", "traps"], angle: "elbow", gear: "db",
      A: stand({ e: [58, 38], w: [60, 50] }), B: stand({ e: [72, 30], w: [62, 24] }) },
    shrug: { name: "Shrug", muscle: "shoulders", hi: ["traps"], angle: null, gear: "db",
      A: stand({ e: [58, 38], w: [58, 52] }),
      B: { s: [58, 19], p: [58, 48], k: [58, 70], a: [58, 89], e: [58, 35], w: [58, 49] } },
    revfly: { name: "Reverse Fly", muscle: "shoulders", hi: ["shoulders"], angle: null, gear: "db",
      A: { ...BENT, e: [70, 58], w: [70, 70] }, B: { ...BENT, e: [69, 59], w: [70, 50] } },
    /* arms */
    curl: { name: "Biceps Curl", muscle: "arms", hi: ["uparm"], angle: "elbow", gear: "db",
      A: stand({ e: [58, 38], w: [59, 51] }), B: stand({ e: [60, 38], w: [70, 27] }) },
    triceps: { name: "Overhead Triceps Extension", muscle: "arms", hi: ["uparm"], angle: "elbow", gear: "db",
      A: stand({ e: [59, 10], w: [59, -3] }), B: stand({ e: [60, 8], w: [48, 14] }) },
    kickback: { name: "Triceps Kickback", muscle: "arms", hi: ["uparm"], angle: "elbow", gear: "db",
      A: { ...BENT, e: [56, 50], w: [60, 62] }, B: { ...BENT, e: [56, 50], w: [42, 52] } },
    dips: { name: "Bench Dips", muscle: "arms", hi: ["uparm"], angle: "elbow", gear: "none", scene: SMALL_BENCH,
      A: { s: [36, 50], p: [44, 72], k: [68, 74], a: [88, 89], e: [34, 62], w: [34, 74] },
      B: { s: [38, 64], p: [46, 84], k: [68, 82], a: [88, 89], e: [26, 70], w: [34, 74] } },
    pushdown: { name: "Triceps Pushdown", muscle: "arms", hi: ["uparm"], angle: "elbow", gear: "db",
      A: stand({ e: [60, 38], w: [68, 28] }), B: stand({ e: [60, 38], w: [60, 52] }) },
    /* core */
    situp: { name: "Sit-Up", muscle: "core", hi: ["core"], angle: "hip", gear: "none",
      A: { s: [30, 84], p: [58, 84], k: [76, 66], a: [66, 89], e: [42, 78], w: [34, 80] },
      B: { s: [52, 60], p: [58, 84], k: [76, 66], a: [66, 89], e: [60, 60], w: [68, 62] } },
    legraise: { name: "Leg Raise", muscle: "core", hi: ["core"], angle: "hip", gear: "none",
      A: { ...LYING_FLOOR, k: [80, 84], a: [102, 84], e: [38, 86], w: [48, 86] },
      B: { ...LYING_FLOOR, k: [58, 62], a: [58, 40], e: [38, 86], w: [48, 86] } },
    crunch: { name: "Crunch", muscle: "core", hi: ["core"], angle: "hip", gear: "none",
      A: { s: [30, 84], p: [58, 84], k: [76, 66], a: [66, 89], e: [24, 76], w: [22, 84] },
      B: { s: [38, 76], p: [58, 84], k: [76, 66], a: [66, 89], e: [32, 68], w: [24, 74] } },
    climber: { name: "Mountain Climber", muscle: "core", hi: ["core"], angle: "knee", gear: "none",
      A: { ...PLANK_UP, k: [38, 81], a: [22, 88], k2: [72, 74], a2: [62, 88] },
      B: { ...PLANK_UP, k: [72, 74], a: [62, 88], k2: [38, 81], a2: [22, 88] } },
    kneeraise: { name: "Hanging Knee Raise", muscle: "core", hi: ["core"], angle: "hip", gear: "none", scene: HANG_BAR, noFloor: true,
      A: { s: [60, 26], p: [60, 50], k: [60, 70], a: [56, 90], e: [60, 15], w: [60, 4] },
      B: { s: [58, 26], p: [60, 50], k: [80, 52], a: [72, 70], e: [60, 15], w: [60, 4] } },
  };

  // fill in default feet so every pose has the same keys (needed for animation)
  Object.values(EXERCISES).forEach((ex) => [ex.A, ex.B].forEach((P) => {
    P.f = P.f || [P.a[0] + 8, P.a[1]];
  }));

  /** Exercises for a program, grouped in muscle order: [{id, setsText}]. */
  function programExercises(programId) {
    const plan = PROGRAM_PLAN[programId] || { sets: 3, rest: 60 };
    const list = [];
    MUSCLES.forEach((m) => MUSCLE_EXERCISES[m.id].forEach((id) => list.push({ id, setsText: `${plan.sets} sets × ${REPS.min}–${REPS.max} reps` })));
    return list;
  }

  /* ---------- Geometry helpers ---------- */
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const add = (a, v, k) => [a[0] + v[0] * k, a[1] + v[1] * k];
  function frontOf(P) { // unit vector pointing out of the chest
    const dx = P.s[0] - P.p[0], dy = P.s[1] - P.p[1], len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  }
  function head(P) {
    if (P.h) return P.h;
    const dx = P.s[0] - P.p[0], dy = P.s[1] - P.p[1], len = Math.hypot(dx, dy) || 1;
    return [P.s[0] + (dx / len) * 12, P.s[1] + (dy / len) * 12];
  }

  /* ---------- Joint angles ---------- */
  const angleAt = (a, b, c) => {
    const v1 = [a[0] - b[0], a[1] - b[1]], v2 = [c[0] - b[0], c[1] - b[1]];
    const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / ((Math.hypot(...v1) * Math.hypot(...v2)) || 1);
    return Math.round((Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI);
  };
  const JOINTS = {
    elbow: (P) => angleAt(P.s, P.e, P.w),
    knee: (P) => angleAt(P.p, P.k, P.a),
    hip: (P) => angleAt(P.s, P.p, P.k),
    shoulder: (P) => angleAt(P.p, P.s, P.e),
    ankle: (P) => angleAt(P.k, P.a, P.f),
  };
  function poseAt(ex, t) { // same timing as the animation: hold, glide, hold, glide back
    const ph = ((t % CYCLE) + CYCLE) % CYCLE, sm = (x) => x * x * (3 - 2 * x);
    const u = ph < 0.36 ? 0 : ph < 1.5 ? sm((ph - 0.36) / 1.14) : ph < 1.86 ? 1 : 1 - sm((ph - 1.86) / 1.14);
    const P = {};
    Object.keys(ex.A).forEach((key) => { if (ex.B[key]) P[key] = lerp(ex.A[key], ex.B[key], u); });
    return P;
  }
  /** { joint, start, end } for the exercise's key joint. */
  function exerciseAngles(id) {
    const ex = EXERCISES[id], fn = JOINTS[ex.angle];
    return fn ? { joint: ex.angle, start: fn(ex.A), end: fn(ex.B) } : null; // null = no meaningful joint angle
  }
  function liveAngle(id, t) { const ex = EXERCISES[id]; return JOINTS[ex.angle](poseAt(ex, t)); }

  /* ---------- Drawing the athlete ---------- */
  const COLOR = { skin: "#e3ab84", skinFar: "#b98660", top: "#a6d600", shorts: "#1b1b1b", shoe: "#f4f4f4", hair: "#2b1d14", beard: "#1d140e", hi: "#ff3b3b" };
  const GEAR_R = { plate: 7, db: 4.5, kb: 5.5 };
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CYCLE = 3; // seconds per repetition (slow and controlled)

  /** The list of drawable parts for one pose. Same order for every pose, so parts can be animated. */
  function parts(P, ex) {
    const L = [];
    const line = (a, b, w, c, o, cls) => L.push({ t: "line", a, b, w, c, o: o || 1, cls });
    const circ = (a, r, c, o, cls) => L.push({ t: "circle", a, r, c, o: o || 1, cls });
    const f = frontOf(P), h = head(P);
    const farLeg = P.k2 ? { k: P.k2, a: P.a2, f: P.f2 || [P.a2[0] + 8, P.a2[1]] } : { k: add(P.k, [1, 0], -3), a: add(P.a, [1, 0], -3), f: add(P.f, [1, 0], -3) };
    // far limbs (behind)
    // Coach Karim has a strong, muscular build, so the limbs are thick
    line(P.p, farLeg.k, 11.5, COLOR.skinFar); line(farLeg.k, farLeg.a, 8, COLOR.skinFar); line(farLeg.a, farLeg.f, 5.5, COLOR.shoe);
    line(P.s, add(P.e, [1, 0], -3), 7, COLOR.skinFar); line(add(P.e, [1, 0], -3), add(P.w, [1, 0], -3), 6, COLOR.skinFar);
    // torso (tank top) and shorts
    line(P.s, P.p, 17, COLOR.top);
    // near leg
    line(P.p, P.k, 12.5, COLOR.skin); line(P.k, P.a, 8.5, COLOR.skin); line(P.a, P.f, 5.5, COLOR.shoe);
    line(P.p, lerp(P.p, P.k, 0.55), 14, COLOR.shorts); line(P.p, lerp(P.s, P.p, 0.82), 17, COLOR.shorts);
    // neck + head: short dark hair and a trimmed beard
    const hu = [h[0] - P.s[0], h[1] - P.s[1]], hl = Math.hypot(hu[0], hu[1]) || 1, up = [hu[0] / hl, hu[1] / hl];
    line(P.s, lerp(P.s, h, 0.7), 6.5, COLOR.skin);
    circ(add(h, f, -1.2), 7.8, COLOR.hair);
    circ(add(h, f, 1.4), 6.8, COLOR.skin);
    circ(add(add(h, f, 3), up, -3.4), 4.6, COLOR.beard);
    // near arm
    line(P.s, P.e, 8.5, COLOR.skin); line(P.e, P.w, 7.5, COLOR.skin);
    line(P.s, lerp(P.s, P.e, 0.4), 11.5, COLOR.top);
    circ(P.w, 3.8, COLOR.skin);
    // highlighted target muscle
    ex.hi.forEach((r) => {
      const c = COLOR.hi;
      if (r === "chest") { const a = add(lerp(P.s, P.p, 0.06), f, 3.5), b = add(lerp(P.s, P.p, 0.5), f, 3.5); line(a, b, 9, c, 0.8, "ex-hi"); }
      else if (r === "back") { const a = add(lerp(P.s, P.p, 0.1), f, -3.5), b = add(lerp(P.s, P.p, 0.7), f, -3.5); line(a, b, 9, c, 0.8, "ex-hi"); }
      else if (r === "lowback") { const a = add(lerp(P.s, P.p, 0.5), f, -3.5), b = add(lerp(P.s, P.p, 0.95), f, -3.5); line(a, b, 9, c, 0.8, "ex-hi"); }
      else if (r === "core") { const a = add(lerp(P.s, P.p, 0.5), f, 2), b = add(lerp(P.s, P.p, 0.95), f, 2); line(a, b, 10, c, 0.8, "ex-hi"); }
      else if (r === "shoulders") circ(P.s, 6.8, c, 0.85, "ex-hi");
      else if (r === "traps") line(add(lerp(P.s, P.p, 0.0), f, -2), lerp(P.s, h, 0.7), 8, c, 0.85, "ex-hi");
      else if (r === "uparm") line(P.s, P.e, 9, c, 0.85, "ex-hi");
      else if (r === "thigh") line(P.p, P.k, 12, c, 0.75, "ex-hi");
      else if (r === "glute") circ(add(P.p, f, -3), 7.5, c, 0.75, "ex-hi");
      else if (r === "calf") line(P.k, P.a, 9, c, 0.8, "ex-hi");
    });
    // equipment
    if (ex.gear !== "none") circ(P.w, GEAR_R[ex.gear], "#f2f2f2", 1, "ex-gear");
    return L;
  }

  const num = (n) => Math.round(n * 10) / 10;
  const dAttr = (p) => `M${num(p.a[0])},${num(p.a[1])} L${num(p.b[0])},${num(p.b[1])}`;
  function anim(attr, a, b, force) {
    if (reduce && !force) return "";
    return `<animate attributeName="${attr}" values="${a};${a};${b};${b};${a}" keyTimes="0;.12;.5;.62;1" keySplines="0 0 1 1;.45 0 .55 1;0 0 1 1;.45 0 .55 1" calcMode="spline" dur="${CYCLE}s" repeatCount="indefinite"/>`;
  }

  /** Returns an inline SVG string. `force` keeps it animated even with reduced-motion (used by the timer). */
  function exerciseSVG(id, force) {
    const ex = EXERCISES[id];
    const PA = parts(ex.A, ex), PB = parts(ex.B, ex);
    const shapes = PA.map((a, i) => {
      const b = PB[i], cls = a.cls || "";
      if (a.t === "line") {
        return `<path class="ex-limb ${cls}" d="${dAttr(a)}" stroke="${a.c}" stroke-width="${a.w}" opacity="${a.o}">${anim("d", dAttr(a), dAttr(b), force)}</path>`;
      }
      return `<circle class="${cls}" r="${a.r}" cx="${num(a.a[0])}" cy="${num(a.a[1])}" fill="${a.c}" opacity="${a.o}">${anim("cx", num(a.a[0]), num(b.a[0]), force)}${anim("cy", num(a.a[1]), num(b.a[1]), force)}</circle>`;
    }).join("");
    return `<svg class="ex-svg" viewBox="0 -6 120 100" role="img" aria-label="Animated illustration of ${ex.name}">
      ${ex.noFloor ? "" : '<path class="ex-scene" d="M4 90h112"/>'}
      <g class="ex-scene">${ex.scene || ""}</g>
      ${shapes}
    </svg>`;
  }

  IH.MUSCLES = MUSCLES;
  IH.EXERCISES = EXERCISES;
  IH.MUSCLE_EXERCISES = MUSCLE_EXERCISES;
  IH.PROGRAM_PLAN = PROGRAM_PLAN;
  IH.REPS = REPS;
  IH.CYCLE = CYCLE;
  IH.EXERCISE_PHOTOS = PHOTOS;
  IH.programExercises = programExercises;
  IH.exerciseSVG = exerciseSVG;
  IH.exerciseAngles = exerciseAngles;
  IH.liveAngle = liveAngle;
})();
