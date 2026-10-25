/* ==========================================================
   IRON HOUSE FITNESS — website logic
   Renders programs, trainers, plans, schedule, and wires up forms.
   ========================================================== */
(function () {
  "use strict";
  const { $, $$, esc, icon, hydrateIcons, fmtNum, fmtEGP, fmtDate, fmtTime, toast, openModal, validateForm, liveClear } = UI;

  /* ---------- Reusable pieces ---------- */
  const levelClass = { Beginner: "lvl-beginner", Intermediate: "lvl-intermediate", Advanced: "lvl-advanced" };
  const levelBadge = (level) => `<span class="badge plain ${levelClass[level] || ""}">${esc(level)}</span>`;
  function chip(label, value, active, group) {
    return `<button type="button" class="chip" data-group="${group}" data-value="${esc(value)}" aria-pressed="${active}">${esc(label)}</button>`;
  }
  function emptyState(title, text, resetId) {
    return `<div class="empty"><div class="empty-icon">${icon("search")}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>
      <button type="button" class="btn btn-ghost btn-sm" id="${resetId}">Clear filters</button></div>`;
  }

  /* ---------- Header / navigation ---------- */
  const header = $(".site-header");
  const toggle = $("#menu-toggle");
  const nav = $("#main-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); } });
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });

  // Highlight the nav link of the section currently on screen
  const spyLinks = $$('.main-nav a[href^="#"]:not(.btn)');
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        spyLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spyLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---------- Benefits ---------- */
  const BENEFITS = [
    ["dumbbell", "Pro-grade equipment", "Calibrated plates, racks and machines in a clean, spacious training hall."],
    ["users", "Expert coaching", "Certified trainers who teach technique first and chase progress second."],
    ["calendar", "Classes all week", "Strength, HIIT, boxing, yoga and functional training with flexible times."],
    ["target", "Structured programs", "Clear multi-week plans so you always know what to do next."],
    ["heart", "Recovery space", "Stretch zone, showers and lockers so you leave feeling better than you arrived."],
    ["shield", "Respectful community", "A welcoming floor for first-timers and seasoned lifters alike."],
  ];
  $("#benefits").innerHTML = BENEFITS.map(([ic, title, text]) =>
    `<article class="benefit reveal"><div class="benefit-icon">${icon(ic)}</div><h3>${title}</h3><p>${text}</p></article>`).join("");

  /* ---------- Programs ---------- */
  const programState = { cat: "all", level: "all" };
  const catLabel = Object.fromEntries(IH.CATEGORIES.map((c) => [c.id, c.label]));
  $("#program-filters").innerHTML = chip("All", "all", true, "cat") + IH.CATEGORIES.map((c) => chip(c.label, c.id, false, "cat")).join("");

  function renderPrograms() {
    const list = IH.PROGRAMS.filter((p) =>
      (programState.cat === "all" || p.category === programState.cat) &&
      (programState.level === "all" || p.level === programState.level));
    $("#program-count").textContent = `Showing ${list.length} of ${IH.PROGRAMS.length} demo programs`;
    const grid = $("#program-grid");
    if (!list.length) {
      grid.innerHTML = emptyState("No programs match", "Try a different category or difficulty level.", "program-reset");
      $("#program-reset").addEventListener("click", resetPrograms);
      return;
    }
    grid.innerHTML = list.map((p) => `
      <article class="card program-card">
        <div class="card-media"><img src="${p.image}" alt="${esc(p.name)} training session" loading="lazy" width="700" height="460">
          <span class="card-tag">${esc(catLabel[p.category])}</span></div>
        <div class="card-body">
          <div class="card-top"><h3>${esc(p.name)}</h3>${levelBadge(p.level)}</div>
          <p>${esc(p.blurb)}</p>
          <ul class="meta">
            <li>${icon("calendar")} ${p.weeks} weeks</li>
            <li>${icon("zap")} ${p.perWeek}× / week</li>
            <li>${icon("clock")} ${esc(p.session)}</li>
          </ul>
          <button type="button" class="btn btn-ghost btn-sm" data-program="${p.id}">View details ${icon("arrow-right")}</button>
        </div>
      </article>`).join("");
  }
  function resetPrograms() {
    programState.cat = "all"; programState.level = "all";
    $("#program-level").value = "all";
    syncChips("#program-filters", "all");
    renderPrograms();
  }
  function syncChips(sel, value) {
    $$(".chip", $(sel)).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.value === value)));
  }
  $("#program-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    programState.cat = b.dataset.value; syncChips("#program-filters", programState.cat); renderPrograms();
  });
  $("#program-level").addEventListener("change", (e) => { programState.level = e.target.value; renderPrograms(); });
  $("#program-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-program]"); if (b) showProgram(b.dataset.program);
  });

  function showProgram(id) {
    const p = IH.PROGRAMS.find((x) => x.id === id); if (!p) return;
    openModal({
      title: p.name, wide: true,
      html: `
        <div class="modal-badges">${levelBadge(p.level)}<span class="badge plain">${esc(catLabel[p.category])}</span><span class="badge badge-demo">Demo content</span></div>
        <p class="modal-text">${esc(p.overview)}</p>
        <div class="detail-stats">
          <div><strong>${p.weeks}</strong><span>weeks</span></div>
          <div><strong>${p.perWeek}×</strong><span>per week</span></div>
          <div><strong>${esc(p.session)}</strong><span>per session</span></div>
        </div>
        ${exerciseSection(p)}
        <h3 class="modal-sub">Sample week</h3>
        <table class="week-table"><tbody>${p.week.map(([d, f]) => `<tr><th scope="row">${esc(d)}</th><td>${esc(f)}</td></tr>`).join("")}</tbody></table>
        <p class="modal-text"><strong>Equipment:</strong> ${esc(p.equipment)}</p>
        <div class="alert">${icon("info")}<span>General fitness information for demonstration only. It is not individualized medical or professional advice. Check with a qualified professional before starting a new exercise program.</span></div>
        <div class="modal-actions"><a href="#plans" class="btn btn-primary" data-close>Join to start this program ${icon("arrow-right")}</a></div>`,
      onOpen(m) {
        m.el.querySelector("[data-close]").addEventListener("click", () => m.close());
        wireExercises(m.el, id);
      },
    });
  }

  /* ---------- Coach Karim: explains every muscle and exercise ---------- */
  const coach = IH.TRAINERS[0]; // Karim Hassan (fictional demo trainer)
  const MUSCLE_GUIDE = {
    all: ["Pick a muscle above and I will explain how to train it. Press Start exercise to see me walk you through each move.", "اختر عضلة من الأعلى وسأشرح لك كيف تدربها. اضغط «ابدأ التمرين» لأشرح لك كل حركة."],
    chest: ["Your chest pushes things away from you. Press and fly movements build it. Keep your shoulder blades back and let your chest do the work.", "عضلات الصدر وظيفتها الدفع بعيدًا عنك. تُبنى بتمارين الضغط والفلاي. ثبّت لوحي الكتف للخلف ودع صدرك يؤدي العمل."],
    back: ["Your back pulls. Lead every pull with your elbows and squeeze your shoulder blades together. Keep your spine long and never round it under load.", "عضلات الظهر وظيفتها السحب. ابدأ كل سحبة بمرفقيك وضمّ لوحي الكتف. أبقِ عمودك الفقري مستقيمًا ولا تقوّسه تحت الوزن."],
    legs: ["Your legs are your strongest muscles. Keep your knees in line with your toes, your heels down, and go as deep as you can with good control.", "الأرجل أقوى عضلاتك. أبقِ ركبتيك في اتجاه أصابع قدميك وكعبيك على الأرض وانزل لأعمق نقطة تستطيعها بتحكم."],
    shoulders: ["Your shoulders move your arms in every direction. Use lighter weights, slow movement, and never shrug up into your ears unless the exercise asks for it.", "الأكتاف تحرك ذراعيك في كل الاتجاهات. استخدم أوزانًا أخف وحركة بطيئة ولا ترفع كتفيك نحو أذنيك إلا إذا طلب التمرين ذلك."],
    arms: ["Your biceps bend the elbow and your triceps straighten it. Keep your elbows still and move only your forearms, with no swinging.", "الباي يثني المرفق والتراي يفرده. أبقِ مرفقيك ثابتين وحرّك ساعديك فقط بدون تأرجح."],
    core: ["Your core keeps your whole body stable. Breathe out as you contract, keep your lower back controlled, and remember quality matters more than speed.", "عضلات البطن والجذع تثبّت جسمك كله. ازفر عند الانقباض وتحكم في أسفل ظهرك، والجودة أهم من السرعة."],
  };
  const COACH_TEXT = {
    "Coach Karim explains": "الكابتن كريم يشرح",
    "Coach Karim demonstrates": "الكابتن كريم يؤدي التمرين",
    "Karim": "كريم",
    "Hi, I'm Coach Karim. Here is how I teach this exercise.": "أهلًا، أنا الكابتن كريم. هذه طريقتي في تعليم هذا التمرين.",
    "Coach Karim's tip": "نصيحة الكابتن كريم",
    "Listen to Coach Karim": "استمع إلى الكابتن كريم",
    "Stop": "إيقاف",
    "No Arabic voice is installed on this device.": "لا يوجد صوت عربي مثبّت على هذا الجهاز.",
  };
  I18N.add(COACH_TEXT);
  I18N.add(Object.fromEntries(Object.values(MUSCLE_GUIDE)));

  // small badge on every illustration: the athlete shown is Coach Karim himself
  const coachTag = (text) => `<span class="coach-tag"><img src="${coach.image}" alt="" width="22" height="22">${esc(text)}</span>`;
  function coachCard(message, label) {
    return `<div class="coach">
      <img class="coach-avatar" src="${coach.image}" alt="Coach ${esc(coach.name)}" width="64" height="64">
      <div class="coach-body">
        ${label ? `<p class="pl-label">${esc(label)}</p>` : ""}
        <p class="coach-name"><strong>Coach ${esc(coach.name)}</strong><span>${esc(coach.specialty)}</span></p>
        <p class="coach-bubble" data-coach-say>${esc(message)}</p>
        <button type="button" class="btn btn-ghost btn-sm" data-listen>${icon("volume")}<span>Listen to Coach Karim</span></button>
      </div></div>`;
  }
  // Reads the coach's words aloud with the browser's built-in voice (English or Arabic)
  let speaking = null;
  let stageStop = null; // stops the "Coach Karim in the gym" playback when another voice starts
  function clearSpeaking() {
    if (!speaking) return;
    if (speaking.label) speaking.label.textContent = "Listen to Coach Karim";
    speaking.button.classList.remove("speaking");
    const li = speaking.button.closest("li"); if (li) li.classList.remove("speaking");
    speaking = null;
  }
  function stopSpeech() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    clearSpeaking();
  }
  function speak(button, parts) {
    if (!("speechSynthesis" in window)) { toast("Your browser cannot read text aloud.", "error"); return; }
    const wasMine = speaking && speaking.button === button;
    if (stageStop) stageStop();
    stopSpeech();
    if (wasMine) return;
    const ar = I18N.getLang() === "ar";
    if (ar) {
      const voices = speechSynthesis.getVoices();
      if (voices.length && !voices.some((v) => v.lang.toLowerCase().startsWith("ar"))) { toast("No Arabic voice is installed on this device.", "error"); return; }
    }
    const text = parts.map((p) => (ar ? I18N.translate(p) || p : p).replace(/[.。]+$/, "")).join(". ") + ".";
    const u = new SpeechSynthesisUtterance(text);
    u.lang = ar ? "ar-EG" : "en-US"; u.rate = 0.95;
    const label = $("span", button); // the big button has a text label, the small per-step buttons do not
    if (label) label.textContent = "Stop";
    button.classList.add("speaking");
    const li = button.closest("li"); if (li) li.classList.add("speaking");
    speaking = { button, label };
    u.onend = u.onerror = () => { if (speaking && speaking.button === button) clearSpeaking(); };
    speechSynthesis.speak(u);
  }

  /* ---------- Exercise cards (grouped by muscle) ---------- */
  const muscleLabel = Object.fromEntries(IH.MUSCLES.map((m) => [m.id, m.label]));
  const SCENE = IH.IMG("1581009146145-b5ef050c2e1e", 900); // Coach Karim in the gym
  const THUMB_POS = ["center 15%", "center 35%", "60% 25%"];
  function exerciseSection() {
    return `<h3 class="modal-sub">Exercises by muscle</h3>
      <p class="ex-intro">5 exercises for every muscle. Press Start exercise and Coach Karim explains it to you in the gym, with the joint angles and a timer with rep counter.</p>
      ${coachCard(MUSCLE_GUIDE.all[0], "Coach Karim explains")}
      <div class="chips ex-chips" role="group" aria-label="Filter exercises by muscle">
        ${chip("All muscles", "all", true, "muscle")}${IH.MUSCLES.map((m) => chip(m.label, m.id, false, "muscle")).join("")}
      </div>
      <div class="ex-grid" id="ex-grid"></div>
      <p class="ex-note">Demo content: general information, not exact technique instructions.</p>`;
  }
  function wireExercises(root, programId) {
    const grid = $("#ex-grid", root);
    if (!grid) return;
    const list = IH.programExercises(programId);
    function draw(muscle) {
      grid.innerHTML = list.filter(({ id }) => muscle === "all" || IH.EXERCISES[id].muscle === muscle).map(({ id, setsText }, i) => {
        const ex = IH.EXERCISES[id];
        return `<figure class="ex-card">
          <button type="button" class="ex-thumb" data-start="${id}" aria-label="${esc(ex.name)}">
            <img src="${SCENE}" style="object-position:${THUMB_POS[i % THUMB_POS.length]}" alt="" loading="lazy" width="400" height="250">
            ${coachTag("Coach Karim")}<span class="ex-thumb-play">${icon("play")}</span>
          </button>
          <figcaption><strong>${esc(ex.name)}</strong><span class="ex-muscle">${esc(muscleLabel[ex.muscle])}</span>
          <span class="ex-sets">${esc(setsText)}</span>
          <button type="button" class="btn btn-primary btn-sm" data-start="${id}">Start exercise</button></figcaption></figure>`;
      }).join("");
    }
    draw("all");
    let guide = "all";
    $(".ex-chips", root).addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", root).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      draw(b.dataset.value);
      guide = b.dataset.value; stopSpeech();
      $("[data-coach-say]", root).textContent = MUSCLE_GUIDE[guide][0]; // Coach Karim explains the chosen muscle
    });
    $("[data-listen]", root).addEventListener("click", (e) => {
      const name = guide === "all" ? "" : `${muscleLabel[guide]}. `;
      speak(e.currentTarget, [name + MUSCLE_GUIDE[guide][0]]);
    });
    grid.addEventListener("click", (e) => {
      const b = e.target.closest("[data-start]"); if (b) openPlayer(b.dataset.start, IH.PROGRAM_PLAN[programId]);
    });
  }

  /* ---------- Exercise window: Coach Karim explains in the gym + workout timer ---------- */
  function openPlayer(exId, plan) {
    const ex = IH.EXERCISES[exId], { min, max } = IH.REPS;
    let phase = "ready", set = 1, reps = 0, restLeft = 0, elapsed = 0, workTime = 0, paused = false, last = Date.now(), timer = null, angleTimer = null;
    const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

    const info = IH.EXERCISE_INFO[exId], ang = IH.exerciseAngles(exId);
    const angleBox = ang
      ? `<div class="pl-angle"><div><span class="pl-label">${ang.joint[0].toUpperCase() + ang.joint.slice(1)} angle</span><strong id="pl-angle">${ang.start}°</strong></div>
          <div class="pl-angle-side"><span class="pl-label">Start ${ang.start}° · End ${ang.end}°</span></div></div>`
      : "";

    // What Coach Karim says, one part at a time (caption shown on screen + spoken aloud)
    const parts = [
      { cap: `<span>Hi, I'm Coach Karim. Here is how I teach this exercise.</span>`, say: ["Hi, I'm Coach Karim. Here is how I teach this exercise.", ex.name] },
      { cap: `<b>Target muscle</b> <span>${esc(info.works[0])}</span>`, say: ["Target muscle", info.works[0]] },
      ...info.steps.map((s, i) => ({ cap: `<b>Step ${i + 1}</b> <span>${esc(s[0])}</span>`, say: [`Step ${i + 1}`, s[0]] })),
      { cap: `<b>Coach Karim's tip</b> <span>${esc(info.tip[0])}</span>`, say: ["Coach Karim's tip", info.tip[0]] },
      { cap: `<span>Now it's your turn. Press Start to begin your first set.</span>`, say: ["Now it's your turn. Press Start to begin your first set."] },
    ];
    // Optional AI-generated video for this exercise: put a file at assets/exercises/<id>.mp4 and it appears here automatically
    const sceneImg = IH.EXERCISE_PHOTOS.includes(exId) ? `assets/exercises/${exId}.jpg` : SCENE;
    const videoPanel = `
      <div class="video-wrap" data-video-panel hidden>
        <video data-ai-video src="assets/exercises/${exId}.mp4" poster="${sceneImg}" controls playsinline preload="metadata"></video>
      </div>
      <p class="ex-note video-credit" data-video-panel hidden>AI-generated video for demonstration. It does not show a real person.</p>`;
    const tabs = `<div class="chips stage-tabs" role="group" aria-label="Choose how to learn" hidden>
      <button type="button" class="chip" data-tab="video" aria-pressed="false">Watch the AI video</button>
      <button type="button" class="chip" data-tab="coach" aria-pressed="true">Coach Karim explains</button></div>`;
    const stageHTML = `<div class="stage" data-stage>
          <img class="stage-bg" src="${sceneImg}" alt="Coach Karim Hassan in the gym" width="900" height="600">
          <div class="stage-top">${coachTag("Coach Karim")}<span class="stage-live"><i></i>In the gym</span>
            <span class="stage-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
          <p class="stage-caption" data-caption aria-live="polite">Press play and Coach Karim will explain this exercise in the gym.</p>
          <div class="stage-bar"><button type="button" class="stage-play" data-stage-play aria-label="Play Coach Karim's explanation">${icon("play")}</button>
            <div class="stage-progress"><span data-progress></span></div></div>
        </div>`;

    const modal = openModal({
      title: ex.name, wide: true,
      onClose: () => { clearInterval(timer); clearInterval(angleTimer); stopStage(); stopSpeech(); stageStop = null; },
      html: `
        <div class="pl-layout">
          <div class="pl-left">
            ${tabs}${videoPanel}
            ${stageHTML}
            ${angleBox}
            <div class="pl-grid">
              <div class="pl-box"><span class="pl-label">Workout time</span><strong id="pl-time">0:00</strong></div>
              <div class="pl-box"><span class="pl-label" id="pl-set">Set 1 of ${plan.sets}</span><strong id="pl-reps">0 / ${max}</strong><span class="pl-label">reps</span></div>
            </div>
            <p class="pl-hint" id="pl-hint">Aim for 10–12 reps with slow, controlled movement.</p>
            <div class="pl-rest" id="pl-rest" hidden><span class="pl-label">Rest</span><strong id="pl-rest-n">${plan.rest}</strong><span class="pl-label">seconds left</span></div>
            <div class="modal-actions pl-actions">
              <button type="button" class="btn btn-primary" id="pl-main">Start</button>
              <button type="button" class="btn btn-ghost" id="pl-finish" disabled>Finish set</button>
              <button type="button" class="btn btn-ghost" id="pl-skip" hidden>Skip rest</button>
            </div>
          </div>
          <div class="pl-right">
            <h3 class="modal-sub">Target muscle</h3>
            <p class="pl-works"><span class="pl-dot"></span><strong>${esc(info.works[0])}</strong></p>
            <p class="pl-also"><span class="pl-label">Also works</span> ${esc(info.also[0])}</p>
            <h3 class="modal-sub">How to do it</h3>
            <ol class="pl-steps">${info.steps.map((s, i) => `<li><span class="step-text">${esc(s[0])}</span>
              <button type="button" class="step-listen" data-step="${i}" aria-label="Listen to this step">${icon("volume")}</button></li>`).join("")}</ol>
            <div class="alert">${icon("info")}<span><strong>Coach Karim's tip</strong> ${esc(info.tip[0])}</span></div>
            <p class="ex-note">Warm up first and stop if anything hurts. Timer and explanations are for demonstration only.</p>
          </div>
        </div>`,
    });
    const el = (id) => $("#" + id, modal.el);

    /* --- Coach Karim's explanation: captions in sync with his voice --- */
    const stage = $("[data-stage]", modal.el);
    let token = 0, playing = false;
    function setPlaying(on) {
      playing = on; stage.classList.toggle("talking", on);
      const b = $("[data-stage-play]", stage);
      b.innerHTML = icon(on ? "stop" : "play");
      b.setAttribute("aria-label", on ? "Stop the explanation" : "Play Coach Karim's explanation");
    }
    function show(i) {
      $("[data-caption]", stage).innerHTML = parts[i].cap;
      $("[data-progress]", stage).style.width = ((i + 1) / parts.length) * 100 + "%";
      $$(".pl-steps li", modal.el).forEach((li, k) => li.classList.toggle("speaking", k === i - 2));
    }
    function sayParts(list, mine, done) { // speak with the browser voice, or just wait if no voice is available
      const ar = I18N.getLang() === "ar";
      const text = list.map((p) => (ar ? I18N.translate(p) || p : p).replace(/[.。]+$/, "")).join(". ") + ".";
      const voices = "speechSynthesis" in window ? speechSynthesis.getVoices() : [];
      const canSpeak = "speechSynthesis" in window && (!ar || !voices.length || voices.some((v) => v.lang.toLowerCase().startsWith("ar")));
      if (!canSpeak) { setTimeout(() => { if (mine === token) done(); }, Math.max(2500, text.length * 70)); return; }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = ar ? "ar-EG" : "en-US"; u.rate = 0.95;
      u.onend = u.onerror = () => { if (mine === token) done(); };
      speechSynthesis.speak(u);
    }
    function stopStage() {
      token++;
      if (stage && playing) { if ("speechSynthesis" in window) speechSynthesis.cancel(); setPlaying(false); }
      $$(".pl-steps li", modal.el).forEach((li) => li.classList.remove("speaking"));
    }
    function playStage(from) {
      stopSpeech(); token++;
      const mine = token; setPlaying(true);
      (function next(i) {
        if (mine !== token) return;
        if (i >= parts.length) { setPlaying(false); return; }
        show(i); sayParts(parts[i].say, mine, () => next(i + 1));
      })(from || 0);
    }
    { // tabs: AI video <-> Coach Karim in the gym (only shown when the video file exists)
      const ai = $("[data-ai-video]", modal.el);
      const showTab = (video) => {
        $$(".stage-tabs .chip", modal.el).forEach((c) => c.setAttribute("aria-pressed", String((c.dataset.tab === "video") === video)));
        $$("[data-video-panel]", modal.el).forEach((n) => (n.hidden = !video));
        stage.hidden = video;
        if (video) stopStage(); else ai.pause();
      };
      ai.addEventListener("loadedmetadata", () => { $(".stage-tabs", modal.el).hidden = false; showTab(true); });
      ai.addEventListener("error", () => $$("[data-video-panel]", modal.el).forEach((n) => n.remove())); // no video file: keep Coach Karim's scene
      $(".stage-tabs", modal.el).addEventListener("click", (e) => { const t = e.target.closest("[data-tab]"); if (t) showTab(t.dataset.tab === "video"); });
    }
    if (stage) {
      stageStop = stopStage;
      $("[data-stage-play]", stage).addEventListener("click", () => (playing ? stopStage() : playStage(0)));
    }
    $(".pl-steps", modal.el).addEventListener("click", (e) => { // each step can be played on its own
      const b = e.target.closest("[data-step]"); if (!b) return;
      const i = Number(b.dataset.step);
      if (stage) playStage(2 + i); else speak(b, [`Step ${i + 1}`, info.steps[i][0]]);
    });

    /* --- Workout timer --- */
    if (ang) angleTimer = setInterval(() => { // joint angle follows the exercise tempo
      const a = $("#pl-angle", modal.el); if (a) a.textContent = IH.liveAngle(exId, phase === "work" ? workTime : 0) + "°";
    }, 100);
    function paint() {
      el("pl-time").textContent = mmss(elapsed);
      el("pl-reps").textContent = `${reps} / ${max}`;
      el("pl-set").textContent = `Set ${set} of ${plan.sets}`;
      el("pl-rest").hidden = phase !== "rest";
      el("pl-rest-n").textContent = Math.max(0, Math.ceil(restLeft));
      el("pl-finish").disabled = !(phase === "work" && !paused && reps >= min);
      el("pl-skip").hidden = phase !== "rest";
      el("pl-main").textContent = phase === "ready" ? "Start" : paused ? "Resume" : "Pause";
    }
    function startSet() {
      phase = "work"; reps = 0; workTime = 0;
      el("pl-hint").textContent = "Go! Complete your reps.";
      paint();
    }
    function endSet() {
      if (set >= plan.sets) { done(); return; }
      set += 1; phase = "rest"; restLeft = plan.rest; reps = 0; workTime = 0;
      el("pl-hint").textContent = "Rest and breathe. Next set starts automatically.";
      paint();
    }
    function done() {
      phase = "done"; clearInterval(timer); clearInterval(angleTimer); stopStage();
      modal.setBody(`<div class="success">
        <div class="success-icon">${icon("check")}</div>
        <h3>Exercise complete!</h3>
        <p>You finished ${plan.sets} sets in ${mmss(elapsed)}.</p>
        <p class="ex-note">Remember to cool down and listen to your body.</p>
        <div class="modal-actions"><button type="button" class="btn btn-primary" data-done>Close</button></div></div>`);
      $("[data-done]", modal.el).addEventListener("click", modal.close);
    }
    function tick() {
      const now = Date.now(), dt = now - last; last = now;
      if (phase === "ready" || phase === "done" || paused) return;
      elapsed += dt / 1000;
      if (phase === "work") {
        workTime += dt / 1000;
        reps = Math.min(max, Math.floor(workTime / IH.CYCLE));
        if (reps >= max) { endSet(); return; }
      } else if (phase === "rest") {
        restLeft -= dt / 1000;
        if (restLeft <= 0) { startSet(); return; }
      }
      paint();
    }
    el("pl-main").addEventListener("click", () => {
      if (phase === "ready") { elapsed = 0; startSet(); return; }
      paused = !paused;
      paint();
    });
    el("pl-finish").addEventListener("click", endSet);
    el("pl-skip").addEventListener("click", startSet);
    timer = setInterval(tick, 200);
  }

  /* ---------- Trainers ---------- */
  $("#trainer-grid").innerHTML = IH.TRAINERS.map((t) => `
    <article class="card trainer-card reveal">
      <div class="trainer-photo"><img src="${t.image}" alt="Portrait-style photo of demo trainer ${esc(t.name)}" loading="lazy" width="600" height="750"></div>
      <div class="card-body">
        <h3>${esc(t.name)}</h3>
        <p class="trainer-spec">${esc(t.specialty)}</p>
        <p>${esc(t.bio)}</p>
        <span class="badge plain">${t.years} years experience</span>
        <button type="button" class="btn btn-primary btn-sm trainer-book" data-book="${t.id}">Book with a trainer</button>
      </div>
    </article>`).join("");

  /* ---------- Book a session with a trainer ---------- */
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const SESSION_TYPES = ["Personal training session (60 min)", "Form & technique check (30 min)", "Free intro consultation (30 min)"];
  $("#trainer-grid").addEventListener("click", (e) => { const b = e.target.closest("[data-book]"); if (b) openBooking(b.dataset.book); });

  /** The next calendar date (starting tomorrow) that falls on the given weekday name, as YYYY-MM-DD. */
  function nextDateFor(dayName) {
    const d = IH.startOfToday();
    do { d.setDate(d.getDate() + 1); } while (DAY_NAMES[d.getDay()] !== dayName);
    return IH.isoDay(d);
  }

  function openBooking(trainerId, presetDay) {
    const today = IH.startOfToday(), last = new Date(today.getTime() + 30 * 86400000);
    openModal({
      title: "Book with a trainer",
      html: `
        <p class="modal-text">Choose a trainer, a day and a time. This is a demo: no payment is taken and nothing is sent to the gym.</p>
        <form id="book-form" novalidate>
          <div class="form-row">
            <div class="field"><label for="b-trainer">Trainer</label>
              <select class="select" id="b-trainer">${IH.TRAINERS.map((t) => `<option value="${t.id}" ${t.id === trainerId ? "selected" : ""}>${esc(t.name)}</option>`).join("")}</select></div>
            <div class="field"><label for="b-type">Session type</label>
              <select class="select" id="b-type">${SESSION_TYPES.map((s) => `<option>${esc(s)}</option>`).join("")}</select></div>
          </div>
          <div class="field"><label for="b-date">Date</label>
            <input class="input" id="b-date" type="date" min="${IH.isoDay(today)}" max="${IH.isoDay(last)}" data-rule="required"><div class="field-error" role="alert"></div></div>
          <div class="field"><span class="label" id="b-times-label">Available times</span>
            <div class="slots" id="b-slots" role="group" aria-labelledby="b-times-label"></div><div class="field-error" id="b-time-error" role="alert"></div></div>
          <div class="field"><label for="b-name">Full name</label><input class="input" id="b-name" autocomplete="name" data-rule="name"><div class="field-error" role="alert"></div></div>
          <div class="form-row">
            <div class="field"><label for="b-email">Email</label><input class="input" id="b-email" type="email" autocomplete="email" data-rule="email" placeholder="you@example.com"><div class="field-error" role="alert"></div></div>
            <div class="field"><label for="b-phone">Phone number</label><input class="input" id="b-phone" type="tel" autocomplete="tel" data-rule="phone" placeholder="+20 100 000 0000"><div class="field-error" role="alert"></div></div>
          </div>
          <button class="btn btn-primary btn-block" type="submit">Request Booking ${icon("arrow-right")}</button>
          <p class="form-note">Details are stored only in this browser (localStorage) so you can see them in the dashboard demo.</p>
        </form>`,
      onOpen(m) {
        const form = $("#book-form", m.el), slotsBox = $("#b-slots", m.el), timeError = $("#b-time-error", m.el);
        let chosen = "";
        liveClear(form);

        function renderSlots() {
          chosen = ""; timeError.textContent = "";
          const dateStr = $("#b-date", m.el).value;
          if (!dateStr) { slotsBox.innerHTML = `<p class="slots-msg">Pick a date to see available times.</p>`; return; }
          const day = IH.parseDay(dateStr), dayName = DAY_NAMES[day.getDay()];
          const trainer = IH.TRAINERS.find((t) => t.id === $("#b-trainer", m.el).value);
          const hours = dayName === "Friday" ? range(10, 19) : range(6, 22); // opening hours: Fri 10–20, other days 06–23
          const taken = new Set(IH.getBookings().filter((b) => b.trainerId === trainer.id && b.date === dateStr).map((b) => b.time));
          IH.CLASSES.filter((c) => c.day === dayName && c.trainer === trainer.name).forEach((c) => taken.add(c.time.slice(0, 2) + ":00"));
          const now = new Date(), isToday = dateStr === IH.isoDay(now);
          const free = hours.map((h) => `${String(h).padStart(2, "0")}:00`).filter((t) => !isToday || Number(t.slice(0, 2)) > now.getHours());
          if (!free.length) { slotsBox.innerHTML = `<p class="slots-msg">No free times on this day. Try another date.</p>`; return; }
          slotsBox.innerHTML = free.map((t) => `<button type="button" class="slot" data-time="${t}" aria-pressed="false" ${taken.has(t) ? "disabled" : ""}>${fmtTime(t)}</button>`).join("");
        }
        const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

        slotsBox.addEventListener("click", (e) => {
          const b = e.target.closest(".slot"); if (!b || b.disabled) return;
          chosen = b.dataset.time; timeError.textContent = "";
          $$(".slot", slotsBox).forEach((s) => s.setAttribute("aria-pressed", String(s === b)));
        });
        $("#b-date", m.el).addEventListener("change", renderSlots);
        $("#b-trainer", m.el).addEventListener("change", renderSlots);
        if (presetDay) $("#b-date", m.el).value = nextDateFor(presetDay); // coming from a class card: start on that class's weekday
        renderSlots();

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          let ok = validateForm(form);
          const dateStr = $("#b-date", m.el).value;
          if (dateStr && (dateStr < IH.isoDay(today) || dateStr > IH.isoDay(last))) {
            const wrap = $("#b-date", m.el).closest(".field"); wrap.classList.add("has-error");
            $(".field-error", wrap).textContent = "Choose a date within the next 30 days."; ok = false;
          }
          if (dateStr && !chosen) { timeError.textContent = "Choose a time."; ok = false; if (!$$(".has-error", form).length) $(".slot:not([disabled])", slotsBox)?.focus(); }
          if (!ok) return;
          const trainer = IH.TRAINERS.find((t) => t.id === $("#b-trainer", m.el).value);
          const name = $("#b-name", m.el).value.trim();
          let saved = true;
          try {
            IH.addBooking({ trainerId: trainer.id, trainerName: trainer.name, type: $("#b-type", m.el).value, date: dateStr, time: chosen, name, email: $("#b-email", m.el).value.trim(), phone: $("#b-phone", m.el).value.trim() });
          } catch (err) { saved = false; }
          m.setBody(saved
            ? `<div class="success"><div class="success-icon">${icon("check")}</div>
                 <h3>Booking requested!</h3>
                 <p>Your session with ${esc(trainer.name)} on ${esc(fmtDate(IH.parseDay(dateStr)))} at ${esc(fmtTime(chosen))} was saved as a demo request. No payment was taken and no confirmation was sent.</p>
                 <div class="modal-actions"><a class="btn btn-primary" href="dashboard.html#bookings">See it in the dashboard demo ${icon("arrow-right")}</a><button type="button" class="btn btn-ghost" data-done>Close</button></div></div>`
            : `<div class="alert alert-error">${icon("alert")}<span>Your browser blocked local storage, so the demo booking could not be saved. Please allow site data and try again.</span></div>
               <div class="modal-actions"><button type="button" class="btn btn-ghost" data-done>Close</button></div>`);
          const done = $("[data-done]", m.el); if (done) done.addEventListener("click", m.close);
        });
      },
    });
  }

  /* ---------- Membership plans + registration modal ---------- */
  function renderPlans() {
    $("#plan-grid").innerHTML = IH.getPlans().map((p) => {
      const months = Math.max(1, Math.round(p.days / 30));
      return `
      <article class="plan ${p.tag === "Most popular" ? "featured" : ""} reveal">
        ${p.tag ? `<span class="plan-tag">${esc(p.tag)}</span>` : ""}
        <h3>${esc(p.name)}</h3>
        <p class="plan-price"><strong>${fmtNum(p.price)}</strong> <span>EGP</span></p>
        <p class="plan-sub">${esc(p.durationLabel)}${months > 1 ? ` · about ${fmtNum(Math.round(p.price / months))} EGP / month` : ""}</p>
        <p class="plan-demo">Demo price</p>
        <ul class="perks">${p.perks.map((x) => `<li>${icon("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        <button type="button" class="btn ${p.tag === "Most popular" ? "btn-primary" : "btn-ghost"} btn-block" data-plan="${p.id}">Choose Plan</button>
      </article>`;
    }).join("");
    observeReveal();
  }
  $("#plan-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-plan]"); if (b) openRegistration(b.dataset.plan);
  });

  function openRegistration(planId) {
    const plans = IH.getPlans();
    const options = plans.map((p) => `<option value="${p.id}" ${p.id === planId ? "selected" : ""}>${esc(p.name)} · ${fmtEGP(p.price)} (${esc(p.durationLabel)})</option>`).join("");
    openModal({
      title: "Join IRON HOUSE",
      html: `
        <p class="modal-text">Register your interest in a plan. This is a demo: no payment is taken and no real membership is created.</p>
        <form id="reg-form" novalidate>
          <div class="field"><label for="r-name">Full name</label><input class="input" id="r-name" name="name" autocomplete="name" data-rule="name" placeholder="e.g. Sara Ali"><div class="field-error" role="alert"></div></div>
          <div class="field"><label for="r-email">Email</label><input class="input" id="r-email" name="email" type="email" autocomplete="email" data-rule="email" placeholder="you@example.com"><div class="field-error" role="alert"></div></div>
          <div class="field"><label for="r-phone">Phone number</label><input class="input" id="r-phone" name="phone" type="tel" autocomplete="tel" data-rule="phone" placeholder="+20 100 000 0000"><div class="field-error" role="alert"></div></div>
          <div class="field"><label for="r-plan">Selected membership plan</label><select class="select" id="r-plan" name="plan" data-rule="required">${options}</select><div class="field-error" role="alert"></div></div>
          <button class="btn btn-primary btn-block" type="submit">Submit Registration ${icon("arrow-right")}</button>
          <p class="form-note">Details are stored only in this browser (localStorage) so you can see them in the dashboard demo.</p>
        </form>`,
      onOpen(m) {
        const form = $("#reg-form", m.el);
        liveClear(form);
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          if (!validateForm(form)) return;
          const data = Object.fromEntries(new FormData(form));
          const plan = plans.find((p) => p.id === data.plan);
          let ok = true;
          try {
            IH.addMember({ name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim(), plan: data.plan, status: "Pending" });
          } catch (err) { ok = false; }
          m.setBody(ok
            ? `<div class="success">
                 <div class="success-icon">${icon("check")}</div>
                 <h3>Thank you, ${esc(data.name.trim().split(" ")[0])}!</h3>
                 <p>Your <strong>${esc(plan.name)}</strong> registration request was recorded as a <strong>demo entry</strong> in this browser. No payment was taken and no membership has been purchased.</p>
                 <div class="modal-actions"><a class="btn btn-primary" href="dashboard.html#members">See it in the dashboard demo ${icon("arrow-right")}</a><button type="button" class="btn btn-ghost" data-done>Close</button></div>
               </div>`
            : `<div class="alert alert-error">${icon("alert")}<span>Your browser blocked local storage, so the demo entry could not be saved. Please allow site data and try again.</span></div>
               <div class="modal-actions"><button type="button" class="btn btn-ghost" data-done>Close</button></div>`);
          const done = $("[data-done]", m.el); if (done) done.addEventListener("click", m.close);
        });
      },
    });
  }

  /* ---------- Class schedule ---------- */
  const classState = { day: "all", type: "all" };
  $("#day-filters").innerHTML = chip("All days", "all", true, "day") + IH.DAYS.map((d) => chip(d.slice(0, 3), d, false, "day")).join("");
  $("#type-filters").innerHTML = chip("All types", "all", true, "type") + IH.CLASS_TYPES.map((t) => chip(t, t, false, "type")).join("");

  function renderClasses() {
    const list = IH.CLASSES
      .filter((c) => (classState.day === "all" || c.day === classState.day) && (classState.type === "all" || c.type === classState.type))
      .sort((a, b) => IH.DAYS.indexOf(a.day) - IH.DAYS.indexOf(b.day) || a.time.localeCompare(b.time));
    $("#class-count").textContent = `${list.length} ${list.length === 1 ? "class" : "classes"} found`;
    const grid = $("#class-grid");
    if (!list.length) {
      grid.innerHTML = emptyState("No classes found", "There are no classes for that day and type. Try another combination.", "class-reset");
      $("#class-reset").addEventListener("click", () => {
        classState.day = classState.type = "all"; syncChips("#day-filters", "all"); syncChips("#type-filters", "all"); renderClasses();
      });
      return;
    }
    grid.innerHTML = list.map((c) => `
      <article class="class-card">
        <div class="class-time"><strong>${fmtTime(c.time)}</strong><span>${esc(c.day)}</span></div>
        <div class="class-info">
          <h3>${esc(c.name)}</h3>
          <p>${icon("user")} ${esc(c.trainer)}</p>
          <div class="class-tags"><span class="badge plain">${esc(c.type)}</span>${levelBadge(c.level)}</div>
        </div>
        <div class="class-actions">
          <a class="btn btn-ghost btn-sm" href="#plans" aria-label="Join ${esc(c.name)} on ${esc(c.day)}: see membership plans">Join</a>
          <button type="button" class="btn btn-primary btn-sm" data-book-class="${esc(c.trainer)}" data-day="${esc(c.day)}" aria-label="Book a session with ${esc(c.trainer)}">Book trainer</button>
        </div>
      </article>`).join("");
  }
  $("#class-grid").addEventListener("click", (e) => { // "Book trainer" on a class card opens the booking with that class's trainer
    const b = e.target.closest("[data-book-class]"); if (!b) return;
    const trainer = IH.TRAINERS.find((t) => t.name === b.dataset.bookClass);
    if (trainer) openBooking(trainer.id, b.dataset.day);
  });
  $("#day-filters").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; classState.day = b.dataset.value; syncChips("#day-filters", classState.day); renderClasses(); });
  $("#type-filters").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; classState.type = b.dataset.value; syncChips("#type-filters", classState.type); renderClasses(); });

  /* ---------- Testimonials ---------- */
  $("#testi-grid").innerHTML = IH.TESTIMONIALS.map((t) => `
    <figure class="testi reveal">
      <div class="stars" aria-label="5 out of 5 stars">${icon("star").repeat(5)}</div>
      <blockquote>“${esc(t.quote)}”</blockquote>
      <figcaption><span class="avatar" aria-hidden="true">${esc(t.name[0])}</span><div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div></figcaption>
    </figure>`).join("");

  /* ---------- Contact form ---------- */
  const cform = $("#contact-form");
  liveClear(cform);
  cform.addEventListener("submit", (e) => {
    e.preventDefault();
    const out = $("#contact-result");
    if (!validateForm(cform)) { out.innerHTML = ""; return; }
    const first = $("#c-name").value.trim().split(" ")[0];
    cform.reset();
    out.innerHTML = `<div class="alert alert-success">${icon("check")}<span>Thanks, ${esc(first)}! This is a demo form, so your message was not actually sent. In a real deployment it would go to the gym's inbox.</span></div>`;
  });

  /* ---------- Scroll reveal + counters ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let revealObserver = null;
  function observeReveal() {
    if (!("IntersectionObserver" in window) || reduceMotion) { $$(".reveal").forEach((n) => n.classList.add("in")); return; }
    revealObserver = revealObserver || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal:not(.in)").forEach((n) => revealObserver.observe(n));
  }

  function runCounters() {
    const nodes = $$("[data-count]");
    if (!("IntersectionObserver" in window) || reduceMotion) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const target = Number(en.target.dataset.count), suffix = en.target.dataset.suffix || "";
        const start = performance.now(), dur = 1400;
        (function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          en.target.textContent = fmtNum(Math.round(target * (1 - Math.pow(1 - t, 3)))) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });
    nodes.forEach((n) => io.observe(n));
  }

  /* ---------- Calorie calculator ---------- */
  const GOALS = {
    lose: { factor: 0.8, protein: 2.0, text: "About 20% below your maintenance calories for gradual fat loss." },
    maintain: { factor: 1, protein: 1.6, text: "Equal to your maintenance calories to keep your weight." },
    gain: { factor: 1.1, protein: 1.8, text: "About 10% above your maintenance calories for gradual muscle gain." },
  };
  /** Mifflin-St Jeor estimate. Returns calories and macros; never goes below a common safe minimum. */
  function calculateCalories({ sex, age, height, weight, activity, goal }) {
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
    const maintenance = bmr * activity, g = GOALS[goal], floor = sex === "male" ? 1500 : 1200;
    let target = maintenance * g.factor, raisedToMinimum = false;
    if (target < floor) { target = floor; raisedToMinimum = true; }
    const round10 = (n) => Math.round(n / 10) * 10;
    target = round10(target);
    const protein = Math.round(weight * g.protein), fat = Math.round((target * 0.25) / 9);
    const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));
    const pPct = Math.round((protein * 4 / target) * 100), fPct = Math.round((fat * 9 / target) * 100), cPct = Math.max(0, 100 - pPct - fPct);
    const bmi = weight / Math.pow(height / 100, 2);
    const bmiLabel = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy weight" : bmi < 30 ? "Overweight" : "Obesity range";
    return { bmr: round10(bmr), maintenance: round10(maintenance), target, raisedToMinimum, floor, protein, carbs, fat, pPct, cPct, fPct, bmi: Math.round(bmi * 10) / 10, bmiLabel, goalText: g.text };
  }
  IH.calculateCalories = calculateCalories;

  let calcGoal = "maintain";
  const calcForm = $("#calc-form");
  liveClear(calcForm);
  $("#k-goals").addEventListener("click", (e) => {
    const b = e.target.closest("[data-goal]"); if (!b) return;
    calcGoal = b.dataset.goal;
    $$("#k-goals .chip").forEach((c) => { const on = c === b; c.setAttribute("aria-checked", String(on)); c.classList.toggle("is-on", on); });
  });
  $("#k-goals .chip[data-goal=maintain]").classList.add("is-on");
  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(calcForm)) return;
    const age = Number($("#k-age").value);
    const r = calculateCalories({ sex: $("#k-sex").value, age, height: Number($("#k-height").value), weight: Number($("#k-weight").value), activity: Number($("#k-activity").value), goal: calcGoal });
    const kcal = (n) => `<strong>${fmtNum(n)} kcal</strong>`;
    $("#calc-result").innerHTML = `
      <div class="calc-hero"><span class="pl-label">Your daily calorie target</span><div class="calc-big"><strong>${fmtNum(r.target)}</strong><span>kcal</span></div>
        <p>${esc(r.goalText)}</p></div>
      ${r.raisedToMinimum ? `<div class="alert">${icon("info")}<span>Your target was raised to a safe minimum of ${fmtNum(r.floor)} kcal.</span></div>` : ""}
      ${age < 18 ? `<div class="alert">${icon("alert")}<span>You are under 18: please check your calorie needs with a doctor or dietitian.</span></div>` : ""}
      <div class="calc-mini">
        <div><span class="pl-label">Basal metabolic rate (BMR)</span>${kcal(r.bmr)}</div>
        <div><span class="pl-label">Maintenance calories</span>${kcal(r.maintenance)}</div>
        <div><span class="pl-label">Body mass index (BMI)</span><strong>${r.bmi}</strong><span class="calc-cat">${esc(r.bmiLabel)}</span></div>
      </div>
      <h3 class="modal-sub">Daily macros</h3>
      <div class="macro-bar" role="img" aria-label="Protein ${r.pPct}%, carbs ${r.cPct}%, fat ${r.fPct}%"><span class="m-p" style="width:${r.pPct}%"></span><span class="m-c" style="width:${r.cPct}%"></span><span class="m-f" style="width:${r.fPct}%"></span></div>
      <ul class="macros">
        <li><i class="m-p"></i><span>Protein</span><strong>${r.protein} g</strong><em>${r.pPct}%</em></li>
        <li><i class="m-c"></i><span>Carbs</span><strong>${r.carbs} g</strong><em>${r.cPct}%</em></li>
        <li><i class="m-f"></i><span>Fat</span><strong>${r.fat} g</strong><em>${r.fPct}%</em></li>
      </ul>
      <div class="calc-cta"><span>Want a plan built around these numbers?</span><button type="button" class="btn btn-primary btn-sm" data-calc-book>Book trainer</button></div>`;
  });
  $("#calc-result").addEventListener("click", (e) => { if (e.target.closest("[data-calc-book]")) openBooking(IH.TRAINERS[0].id); });

  /* ---------- WhatsApp button, click-to-load map, storage notice ---------- */
  $("#wa-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const msg = "Hello IRON HOUSE FITNESS! I would like to know more about memberships.";
    const text = I18N.getLang() === "ar" ? I18N.translate(msg) || msg : msg;
    const number = String(IH.SITE.whatsapp || "").replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
  $("#map-load").addEventListener("click", () => { // the map (OpenStreetMap) is only requested after the visitor asks for it
    $("#map-card").innerHTML = `<iframe title="Map showing an example location in Cairo" loading="lazy" referrerpolicy="no-referrer"
      src="https://www.openstreetmap.org/export/embed.html?bbox=31.2257%2C30.0394%2C31.2457%2C30.0494&amp;layer=mapnik&amp;marker=30.0444%2C31.2357"></iframe>`;
  });
  UI.storageNotice();

  /* ---------- Start ---------- */
  hydrateIcons();
  renderPrograms();
  renderPlans();
  renderClasses();
  observeReveal();
  runCounters();
  $("#year").textContent = new Date().getFullYear();
})();
