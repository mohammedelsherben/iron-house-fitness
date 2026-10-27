/* ==========================================================
   IRON HOUSE FITNESS — small UI helpers shared by both pages
   icons, escaping, formatting, toast, accessible modal, validation
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Icons (24x24 line icons, drawn inline so no library is needed) ---------- */
  const ICONS = {
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    check: "M20 6 9 17l-5-5",
    x: "M18 6 6 18M6 6l12 12",
    menu: "M4 6h16M4 12h16M4 18h16",
    search: "M21 21l-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
    clock: "M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
    calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    dumbbell: "M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z",
    target: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0zM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
    trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z",
    heart: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
    mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
    "map-pin": "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
    instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zM16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37zM17.5 6.5h.01",
    facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z",
    dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
    card: "M2 5h20v14H2zM2 10h20",
    alert: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
    trend: "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
    trash: "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    plus: "M12 5v14M5 12h14",
    left: "M15 18l-6-6 6-6",
    right: "M9 18l6-6-6-6",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    info: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
    refresh: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
    volume: "M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14",
    whatsapp: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
    play: "M7 4l13 8-13 8V4z",
    stop: "M7 7h10v10H7z",
  };

  function icon(name, extraClass) {
    const d = ICONS[name] || ICONS.info;
    const flip = name === "arrow-right" || name === "left" || name === "right" ? " flip-rtl" : "";
    return `<svg class="icon ${extraClass || ""}${flip}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  }
  /** Replaces every <i data-icon="name"></i> in the page with an SVG icon. */
  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach((node) => {
      node.insertAdjacentHTML("afterend", icon(node.dataset.icon, node.className));
      node.remove();
    });
  }

  /* ---------- Small helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }
  const fmtNum = (n) => Number(n).toLocaleString("en-US");
  const fmtEGP = (n) => fmtNum(n) + " EGP";
  const fmtDate = (d) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  function fmtTime(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  }

  /* ---------- Toast ---------- */
  function toast(message, type) {
    let box = $(".toasts");
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast " + (type || "");
    t.innerHTML = icon(type === "error" ? "alert" : "check") + `<span>${esc(message)}</span>`;
    box.appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }

  /* ---------- Accessible modal ---------- */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function openModal({ title, html, wide, onOpen, onClose }) {
    const opener = document.activeElement;
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    const id = "modal-title-" + Math.random().toString(36).slice(2, 7);
    backdrop.innerHTML = `
      <div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="${id}">
        <button class="modal-close" type="button" aria-label="Close dialog">${icon("x")}</button>
        <h2 id="${id}">${esc(title)}</h2>
        <div class="modal-body">${html}</div>
      </div>`;
    document.body.appendChild(backdrop);
    document.body.classList.add("modal-open");
    const dialog = $(".modal", backdrop);

    function close() {
      document.removeEventListener("keydown", onKey);
      backdrop.remove();
      if (onClose) onClose();
      if (!$(".modal-backdrop")) document.body.classList.remove("modal-open");
      if (opener && opener.focus) opener.focus();
    }
    function onKey(e) {
      const open = $$(".modal-backdrop");
      if (open[open.length - 1] !== backdrop) return; // only the top-most dialog reacts
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      const items = $$(FOCUSABLE, dialog).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    backdrop.addEventListener("mousedown", (e) => { if (e.target === backdrop) close(); });
    $(".modal-close", dialog).addEventListener("click", close);
    hydrateIcons(dialog);

    const api = { el: dialog, close, setBody(newHtml) { $(".modal-body", dialog).innerHTML = newHtml; hydrateIcons(dialog); } };
    if (onOpen) onOpen(api);
    const firstField = $("input, select, textarea", dialog) || $(".modal-close", dialog);
    firstField.focus();
    return api;
  }

  /* ---------- Egyptian mobile numbers ---------- */
  /** Returns the number as 01XXXXXXXXX (010 / 011 / 012 / 015), or "" when it is not a valid Egyptian mobile.
      Accepts spaces, dashes, +20 / 0020 / 20 prefixes and Arabic-Indic digits. */
  function normalizeEgyptPhone(value) {
    let s = String(value || "").replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632)).replace(/[\s().-]/g, "");
    if (s.startsWith("+20")) s = "0" + s.slice(3);
    else if (s.startsWith("0020")) s = "0" + s.slice(4);
    else if (/^20\d{10}$/.test(s)) s = "0" + s.slice(2);
    return /^01[0125]\d{8}$/.test(s) ? s : "";
  }

  /* ---------- Site settings (js/config.js): WhatsApp link, contact details, social icons ---------- */
  const CFG = () => window.IH_CONFIG || {};
  /** https://wa.me/<number>?text=<message>, or "" when no WhatsApp number is configured. */
  function waLink(message) {
    const number = String(CFG().whatsappNumber || "").replace(/\D/g, "");
    return number ? `https://wa.me/${number}?text=${encodeURIComponent(message || "")}` : "";
  }
  const SOCIALS = [["instagram", "Instagram"], ["facebook", "Facebook"], ["youtube", "YouTube"]];
  /** Fills every [data-cfg] element, builds the social icons and hides whatever has no value. */
  function applyConfig(root) {
    const c = CFG(), scope = root || document;
    $$("[data-cfg]", scope).forEach((el) => {
      const key = el.dataset.cfg, value = String(c[key] || "").trim();
      const holder = el.closest("[data-cfg-item]");
      if (!value) { if (holder) holder.hidden = true; else el.hidden = true; return; }
      if (key === "phone") { el.href = "tel:" + value.replace(/[^\d+]/g, ""); }
      else if (key === "email") { el.href = "mailto:" + value; }
      el.textContent = value;
    });
    $$("[data-socials]", scope).forEach((box) => {
      box.innerHTML = SOCIALS.filter(([key]) => String(c[key] || "").trim()).map(([key, label]) =>
        `<li><a href="${esc(c[key])}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon(key)}</a></li>`).join("");
      const none = !box.children.length;
      const holder = box.closest("[data-socials-wrap]") || box;
      holder.hidden = none;
    });
  }

  /* ---------- Form validation ---------- */
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    // Accepts +20 1xx xxx xxxx, 01xxxxxxxxx and similar: 8–15 digits, optional +, spaces, dashes.
    phone: (v) => (normalizeEgyptPhone(v) ? "" : "Enter a valid Egyptian mobile number, like 01001234567."),
    required: (v) => (v.trim() ? "" : "This field is required."),
    age: (v) => (v.trim() !== "" && Number(v) >= 15 && Number(v) <= 80 ? "" : "Enter an age between 15 and 80."),
    height: (v) => (v.trim() !== "" && Number(v) >= 120 && Number(v) <= 230 ? "" : "Enter a height between 120 and 230 cm."),
    weight: (v) => (v.trim() !== "" && Number(v) >= 30 && Number(v) <= 250 ? "" : "Enter a weight between 30 and 250 kg."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please write at least 10 characters."),
  };
  /** Validates fields marked data-rule="name|email|phone|required|message". Returns true when all pass. */
  function validateForm(form) {
    let firstBad = null;
    $$("[data-rule]", form).forEach((input) => {
      const wrap = input.closest(".field");
      const err = $(".field-error", wrap);
      const msg = rules[input.dataset.rule](input.value || "");
      wrap.classList.toggle("has-error", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      if (msg && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  /** Clears an error as soon as the user starts fixing the field. */
  function liveClear(form) {
    form.addEventListener("input", (e) => {
      const wrap = e.target.closest(".field");
      if (wrap && wrap.classList.contains("has-error")) {
        const msg = rules[e.target.dataset.rule] ? rules[e.target.dataset.rule](e.target.value) : "";
        if (!msg) { wrap.classList.remove("has-error"); const er = $(".field-error", wrap); if (er) er.textContent = ""; e.target.setAttribute("aria-invalid", "false"); }
      }
    });
  }

  // If a photo can't load (offline, blocked), hide it so the dark placeholder behind it shows.
  document.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") e.target.classList.add("img-failed");
  }, true);

  /** Small notice at the bottom of the page about browser storage. Remembers when it was dismissed. */
  function storageNotice() {
    try { if (localStorage.getItem("ironhouse.notice") === "1") return; } catch (e) { /* storage blocked: show the notice anyway */ }
    const box = document.createElement("div");
    box.className = "notice";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Storage notice");
    box.innerHTML = `<p>This site stores your language choice and your recent enquiries only in your browser. It uses no tracking or advertising cookies.</p>
      <div class="notice-actions"><a href="privacy.html" class="notice-link">Privacy Policy</a><button type="button" class="btn btn-primary btn-sm">Got it</button></div>`;
    document.body.appendChild(box);
    $("button", box).addEventListener("click", () => { try { localStorage.setItem("ironhouse.notice", "1"); } catch (e) { /* ignore */ } box.remove(); });
  }

  window.UI = { normalizeEgyptPhone, waLink, applyConfig, storageNotice, icon, hydrateIcons, $, $$, esc, fmtNum, fmtEGP, fmtDate, fmtTime, toast, openModal, validateForm, liveClear };
})();
