/* ==========================================================
   IRON HOUSE FITNESS — dashboard demo
   Works entirely from demo data + localStorage (no backend).
   ========================================================== */
(function () {
  "use strict";
  const { $, $$, esc, icon, hydrateIcons, fmtNum, fmtEGP, fmtDate, toast, openModal, validateForm, liveClear } = UI;

  const VIEWS = {
    overview: ["Overview", "A snapshot of memberships and revenue"],
    members: ["Members", "Search, filter and manage demo members"],
    plans: ["Membership plans", "Prices and how many members are on each plan"],
    bookings: ["Bookings", "Trainer sessions booked on the website"],
  };
  const PAGE_SIZE = 8;
  const STATUSES = ["Active", "Pending", "Frozen", "Cancelled"];

  let members = [];
  let plans = IH.getPlans();
  const filters = { q: "", status: "all", plan: "all" };
  const sort = { key: "joined", dir: "desc" };
  let page = 1;

  const planName = (id) => (plans.find((p) => p.id === id) || { name: id }).name;
  const stateOf = (m) => IH.memberState(m, plans);
  const badge = (state) => `<span class="badge badge-${state.toLowerCase()}">${esc(state)}</span>`;
  const expiry = (m) => IH.expiryDate(m, plans);
  const persist = () => IH.saveMembers(members);

  /* ---------- Loading + error states ---------- */
  function skeletons() {
    $("#kpis").innerHTML = Array(4).fill('<div class="kpi skeleton"></div>').join("");
    $("#chart").innerHTML = '<div class="skeleton" style="height:260px"></div>';
    $("#expiring-list").innerHTML = Array(3).fill('<li class="skeleton" style="height:52px"></li>').join("");
    $("#recent-table").innerHTML = '<tbody>' + Array(4).fill('<tr><td><div class="skeleton" style="height:32px"></div></td></tr>').join("") + "</tbody>";
  }
  function showError(message) {
    $("#error-box").innerHTML = `<div class="alert alert-error">${icon("alert")}<div><strong>Something went wrong.</strong> ${esc(message)}
      <div style="margin-top:10px"><button type="button" class="btn btn-ghost btn-sm" id="error-reset">Reset demo data</button></div></div></div>`;
    $("#error-reset").addEventListener("click", () => { IH.resetMembers(); IH.resetPlanPrices(); location.reload(); });
  }

  /* ---------- Overview ---------- */
  function renderKpis() {
    const states = members.map(stateOf);
    const active = states.filter((s) => s === "Active" || s === "Expiring").length;
    const expiring = states.filter((s) => s === "Expiring").length;
    const revenue = IH.REVENUE[IH.REVENUE.length - 1];
    const prev = IH.REVENUE[IH.REVENUE.length - 2];
    const growth = Math.round(((revenue - prev) / prev) * 100);
    const cards = [
      ["users", "Total demo members", fmtNum(members.length), "All registered demo profiles"],
      ["shield", "Active memberships", fmtNum(active), `${members.length ? Math.round((active / members.length) * 100) : 0}% of all members`],
      ["alert", "Expiring in 14 days", fmtNum(expiring), expiring ? "Follow up to renew" : "Nothing urgent", expiring ? "warn" : ""],
      ["trend", "Revenue this month", fmtEGP(revenue), `${growth >= 0 ? "+" : ""}${growth}% vs last month (fictional)`],
    ];
    $("#kpis").innerHTML = cards.map(([ic, label, value, sub, tone]) =>
      `<article class="kpi ${tone || ""}"><div class="kpi-icon">${icon(ic)}</div><p class="kpi-label">${label}</p><p class="kpi-value">${value}</p><p class="kpi-sub">${esc(sub)}</p></article>`).join("");
  }

  function renderChart() {
    const data = IH.REVENUE;
    const now = new Date();
    const labels = data.map((_, i) => new Date(now.getFullYear(), now.getMonth() - (data.length - 1 - i), 1));
    const W = 720, H = 300, L = 58, R = 12, T = 14, B = 36;
    const max = Math.ceil(Math.max(...data) / 50000) * 50000;
    const slot = (W - L - R) / data.length, bw = Math.min(34, slot * 0.62);
    const y = (v) => T + (H - T - B) * (1 - v / max);
    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">`;
    for (let i = 0; i <= 4; i++) {
      const v = (max / 4) * i, yy = y(v);
      svg += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" class="grid"/><text x="${L - 10}" y="${yy + 4}" text-anchor="end" class="axis">${v === 0 ? "0" : Math.round(v / 1000) + "k"}</text>`;
    }
    data.forEach((v, i) => {
      const x = L + slot * i + (slot - bw) / 2, h = H - B - y(v);
      svg += `<rect class="bar ${i === data.length - 1 ? "current" : ""}" data-i="${i}" x="${x}" y="${y(v)}" width="${bw}" height="${h}" rx="5" tabindex="0" role="img" aria-label="${labels[i].toLocaleString("en-US", { month: "long", year: "numeric" })}: ${fmtEGP(v)}"/>`;
      svg += `<text x="${x + bw / 2}" y="${H - 12}" text-anchor="middle" class="axis">${labels[i].toLocaleString("en-US", { month: "short" })}</text>`;
    });
    svg += "</svg>";
    const box = $("#chart");
    box.innerHTML = svg + '<div class="tip" role="presentation" hidden></div>';
    const tip = $(".tip", box);
    function show(rect) {
      const i = Number(rect.dataset.i), r = rect.getBoundingClientRect(), b = box.getBoundingClientRect();
      tip.innerHTML = `<strong>${fmtEGP(data[i])}</strong><span>${labels[i].toLocaleString("en-US", { month: "long", year: "numeric" })}</span>`;
      tip.hidden = false;
      const left = Math.min(Math.max(r.left - b.left + r.width / 2, 70), b.width - 70);
      tip.style.left = left + "px"; tip.style.top = r.top - b.top - 8 + "px";
    }
    $$(".bar", box).forEach((rect) => {
      rect.addEventListener("mouseenter", () => show(rect));
      rect.addEventListener("focus", () => show(rect));
      rect.addEventListener("mouseleave", () => (tip.hidden = true));
      rect.addEventListener("blur", () => (tip.hidden = true));
    });
  }

  function renderExpiring() {
    const list = members.filter((m) => stateOf(m) === "Expiring").sort((a, b) => IH.daysLeft(a, plans) - IH.daysLeft(b, plans)).slice(0, 5);
    $("#expiring-list").innerHTML = list.length ? list.map((m) => {
      const left = IH.daysLeft(m, plans);
      return `<li class="row-item"><span class="avatar-sm" aria-hidden="true">${esc(m.name[0])}</span>
        <div class="grow"><strong>${esc(m.name)}</strong><span class="muted">${esc(planName(m.plan))} · ${left === 0 ? "expires today" : left + (left === 1 ? " day left" : " days left")}</span></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remind="${esc(m.id)}" aria-label="Send reminder to ${esc(m.name)}">${icon("bell")}</button>
        <button type="button" class="btn btn-primary btn-sm" data-renew="${esc(m.id)}">Renew</button></li>`;
    }).join("") : `<li class="empty-sm">${icon("check")}<span>No memberships are expiring in the next 14 days.</span></li>`;
  }

  function renderRecent() {
    const list = members.slice().sort((a, b) => b.joinedAt.localeCompare(a.joinedAt) || b.id.localeCompare(a.id)).slice(0, 5);
    $("#recent-table").innerHTML = `<thead><tr><th>Member</th><th>Plan</th><th class="hide-sm">Joined</th><th>Status</th></tr></thead><tbody>` +
      (list.length ? list.map((m) => `<tr><td>${memberCell(m)}</td><td>${esc(planName(m.plan))}</td><td class="hide-sm">${fmtDate(IH.parseDay(m.joinedAt))}</td><td>${badge(stateOf(m))}</td></tr>`).join("")
        : `<tr><td colspan="4" class="muted center">No registrations yet.</td></tr>`) + "</tbody>";
  }
  const memberCell = (m) => `<div class="who"><span class="avatar-sm" aria-hidden="true">${esc(m.name[0])}</span><div><strong>${esc(m.name)}</strong><span class="muted">${esc(m.email)}</span></div></div>`;

  /* ---------- Members table ---------- */
  function filtered() {
    const q = filters.q.trim().toLowerCase();
    const list = members.filter((m) => {
      const state = stateOf(m);
      return (!q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) &&
        (filters.status === "all" || state === filters.status) && (filters.plan === "all" || m.plan === filters.plan);
    });
    const val = {
      name: (m) => m.name.toLowerCase(), plan: (m) => plans.findIndex((p) => p.id === m.plan),
      joined: (m) => m.joinedAt, expires: (m) => expiry(m).getTime(), status: (m) => stateOf(m),
    }[sort.key];
    list.sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * (sort.dir === "asc" ? 1 : -1));
    return list;
  }

  function renderMembers() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    page = Math.min(page, pages);
    const slice = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const th = (key, label, cls) => `<th class="${cls || ""}" aria-sort="${sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}"><button type="button" class="sort" data-sort="${key}">${label}<span aria-hidden="true">${sort.key === key ? (sort.dir === "asc" ? "▲" : "▼") : ""}</span></button></th>`;
    $("#members-table").innerHTML = `<thead><tr>${th("name", "Member")}${th("plan", "Plan")}${th("joined", "Joined", "hide-sm")}${th("expires", "Expires", "hide-md")}${th("status", "Status")}<th>Actions</th></tr></thead><tbody>` +
      slice.map((m) => {
        const state = stateOf(m), renewable = state === "Expiring" || state === "Expired";
        return `<tr><td>${memberCell(m)}</td><td>${esc(planName(m.plan))}</td><td class="hide-sm">${fmtDate(IH.parseDay(m.joinedAt))}</td><td class="hide-md">${fmtDate(expiry(m))}</td><td>${badge(state)}</td>
          <td><div class="actions">
            <label class="sr-only" for="st-${esc(m.id)}">Set status for ${esc(m.name)}</label>
            <select class="select select-sm" id="st-${esc(m.id)}" data-status="${esc(m.id)}">${STATUSES.map((s) => `<option ${m.status === s ? "selected" : ""}>${s}</option>`).join("")}</select>
            ${renewable ? `<button type="button" class="btn btn-primary btn-sm" data-renew="${esc(m.id)}">Renew</button>` : ""}
            <button type="button" class="icon-btn danger" data-delete="${esc(m.id)}" aria-label="Delete ${esc(m.name)}">${icon("trash")}</button>
          </div></td></tr>`;
      }).join("") + "</tbody>";
    $("#members-table").style.display = slice.length ? "" : "none";
    $("#m-count").textContent = `${list.length} of ${members.length} members`;
    $("#m-empty").innerHTML = slice.length ? "" : `<div class="empty"><div class="empty-icon">${icon("search")}</div><h3>No members found</h3><p>${members.length ? "No one matches your search or filters." : "There are no members yet. Add one to get started."}</p>
      ${members.length ? '<button type="button" class="btn btn-ghost btn-sm" id="clear-filters">Clear filters</button>' : ""}</div>`;
    const clear = $("#clear-filters");
    if (clear) clear.addEventListener("click", () => { filters.q = ""; filters.status = filters.plan = "all"; $("#m-search").value = ""; $("#m-status").value = "all"; $("#m-plan").value = "all"; renderMembers(); });
    $("#pager").innerHTML = list.length > PAGE_SIZE
      ? `<button type="button" class="icon-btn" data-page="${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="Previous page">${icon("left")}</button><span>Page ${page} of ${pages}</span><button type="button" class="icon-btn" data-page="${page + 1}" ${page === pages ? "disabled" : ""} aria-label="Next page">${icon("right")}</button>` : "";
  }

  /* ---------- Plans view ---------- */
  function renderPlans() {
    plans = IH.getPlans();
    const live = members.filter((m) => m.status !== "Cancelled");
    $("#plans-d").innerHTML = plans.map((p) => {
      const count = live.filter((m) => m.plan === p.id).length;
      const share = live.length ? Math.round((count / live.length) * 100) : 0;
      return `<article class="panel plan-d">
        <div class="panel-head"><h2>${esc(p.name)}</h2>${p.tag ? `<span class="badge badge-active plain">${esc(p.tag)}</span>` : ""}</div>
        <p class="plan-d-price"><strong>${fmtNum(p.price)}</strong> EGP <span class="muted">/ ${esc(p.durationLabel)}</span></p>
        <dl class="plan-stats"><div><dt>Members</dt><dd>${count}</dd></div><div><dt>Share</dt><dd>${share}%</dd></div><div><dt>Duration</dt><dd>${p.days} days</dd></div></dl>
        <div class="bar-track" role="img" aria-label="${share}% of members"><span style="width:${share}%"></span></div>
        <ul class="perks-d">${p.perks.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul>
        <button type="button" class="btn btn-ghost btn-block btn-sm" data-edit-plan="${p.id}">${icon("edit")} Edit price</button>
      </article>`;
    }).join("");
  }

  /* ---------- Trainer bookings ---------- */
  function renderBookings() {
    const list = IH.getBookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    $("#b-count").textContent = `${list.length} ${list.length === 1 ? "booking" : "bookings"}`;
    $("#bookings-table").style.display = list.length ? "" : "none";
    $("#bookings-table").innerHTML = `<thead><tr><th>Client</th><th>Trainer</th><th class="hide-sm">Session</th><th>Date & time</th><th>Actions</th></tr></thead><tbody>` +
      list.map((b) => `<tr>
        <td><div class="who"><span class="avatar-sm" aria-hidden="true">${esc(b.name[0])}</span><div><strong>${esc(b.name)}</strong><span class="muted">${esc(b.email)}</span></div></div></td>
        <td>${esc(b.trainerName)}</td><td class="hide-sm">${esc(b.type)}</td>
        <td><strong>${fmtDate(IH.parseDay(b.date))}</strong><br><span class="muted">${esc(UI.fmtTime(b.time))}</span></td>
        <td><button type="button" class="icon-btn danger" data-del-booking="${esc(b.id)}" aria-label="Delete booking for ${esc(b.name)}">${icon("trash")}</button></td></tr>`).join("") + "</tbody>";
    $("#b-empty").innerHTML = list.length ? "" : `<div class="empty"><div class="empty-icon">${icon("calendar")}</div><h3>No bookings yet</h3><p>Bookings made on the website appear here.</p></div>`;
  }

  /* ---------- Actions ---------- */
  function renew(id) {
    const m = members.find((x) => x.id === id); if (!m) return;
    m.joinedAt = IH.isoDay(new Date()); m.status = "Active";
    persist(); renderAll(); toast(`${m.name}'s ${planName(m.plan)} membership was renewed (demo).`);
  }
  function confirmDelete(id) {
    const m = members.find((x) => x.id === id); if (!m) return;
    openModal({
      title: "Delete member?",
      html: `<p class="modal-text">Remove <strong>${esc(m.name)}</strong> from this demo list? This only affects data in your browser.</p>
        <div class="modal-actions"><button type="button" class="btn btn-danger" data-yes>Delete</button><button type="button" class="btn btn-ghost" data-no>Cancel</button></div>`,
      onOpen(modal) {
        $("[data-no]", modal.el).addEventListener("click", modal.close);
        $("[data-yes]", modal.el).addEventListener("click", () => { members = members.filter((x) => x.id !== id); persist(); modal.close(); renderAll(); toast(`${m.name} was removed.`); });
      },
    });
  }
  function addMemberModal() {
    openModal({
      title: "Add demo member",
      html: `<form id="am-form" novalidate>
        <div class="field"><label for="am-name">Full name</label><input class="input" id="am-name" name="name" data-rule="name" autocomplete="off"><div class="field-error" role="alert"></div></div>
        <div class="field"><label for="am-email">Email</label><input class="input" id="am-email" name="email" type="email" data-rule="email" autocomplete="off"><div class="field-error" role="alert"></div></div>
        <div class="field"><label for="am-phone">Phone</label><input class="input" id="am-phone" name="phone" type="tel" data-rule="phone" autocomplete="off" placeholder="+20 100 000 0000"><div class="field-error" role="alert"></div></div>
        <div class="field"><label for="am-plan">Plan</label><select class="select" id="am-plan" name="plan" data-rule="required">${plans.map((p) => `<option value="${p.id}">${esc(p.name)} · ${fmtEGP(p.price)}</option>`).join("")}</select><div class="field-error" role="alert"></div></div>
        <button class="btn btn-primary btn-block" type="submit">Add member</button></form>`,
      onOpen(modal) {
        const form = $("#am-form", modal.el); liveClear(form);
        form.addEventListener("submit", (e) => {
          e.preventDefault(); if (!validateForm(form)) return;
          const d = Object.fromEntries(new FormData(form));
          IH.addMember({ name: d.name.trim(), email: d.email.trim(), phone: d.phone.trim(), plan: d.plan, status: "Active" });
          members = IH.getMembers(); page = 1; sort.key = "joined"; sort.dir = "desc";
          modal.close(); renderAll(); toast(`${d.name.trim()} was added (demo).`);
        });
      },
    });
  }
  function editPlanModal(id) {
    const p = plans.find((x) => x.id === id); if (!p) return;
    openModal({
      title: `Edit ${p.name} price`,
      html: `<form id="ep-form" novalidate><div class="field"><label for="ep-price">Price in EGP (demo)</label>
        <input class="input" id="ep-price" type="number" min="100" max="100000" step="50" value="${p.price}"><div class="field-error" role="alert"></div></div>
        <button class="btn btn-primary btn-block" type="submit">Save price</button></form>`,
      onOpen(modal) {
        const form = $("#ep-form", modal.el), input = $("#ep-price", modal.el), wrap = input.closest(".field");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const v = Number(input.value);
          if (!Number.isFinite(v) || v < 100 || v > 100000) { wrap.classList.add("has-error"); $(".field-error", wrap).textContent = "Enter a price between 100 and 100,000 EGP."; input.focus(); return; }
          IH.setPlanPrice(id, Math.round(v)); modal.close(); renderAll(); toast(`${p.name} price updated to ${fmtEGP(Math.round(v))}.`);
        });
      },
    });
  }
  function exportCsv() {
    const rows = [["ID", "Name", "Email", "Phone", "Plan", "Joined", "Expires", "Status"]].concat(
      filtered().map((m) => [m.id, m.name, m.email, m.phone, planName(m.plan), m.joinedAt, IH.isoDay(expiry(m)), stateOf(m)]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "iron-house-demo-members.csv" });
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    toast(`Exported ${rows.length - 1} demo members.`);
  }

  /* ---------- Wiring ---------- */
  function renderAll() {
    plans = IH.getPlans();
    renderKpis(); renderChart(); renderExpiring(); renderRecent(); renderMembers(); renderPlans(); renderBookings();
  }

  document.addEventListener("click", (e) => {
    const t = e.target;
    const get = (attr) => { const el = t.closest(`[${attr}]`); return el && el.getAttribute(attr); };
    let v;
    if ((v = get("data-renew"))) renew(v);
    else if ((v = get("data-delete"))) confirmDelete(v);
    else if ((v = get("data-remind"))) { const m = members.find((x) => x.id === v); toast(`Demo only: no reminder was sent to ${m ? m.name : "the member"}.`); }
    else if ((v = get("data-edit-plan"))) editPlanModal(v);
    else if ((v = get("data-del-booking"))) { IH.deleteBooking(v); renderBookings(); toast("Booking deleted."); }
    else if ((v = get("data-sort"))) { sort.dir = sort.key === v && sort.dir === "asc" ? "desc" : "asc"; sort.key = v; renderMembers(); }
    else if ((v = get("data-page"))) { page = Number(v); renderMembers(); }
  });
  document.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.status;
    if (!id) return;
    const m = members.find((x) => x.id === id); if (!m) return;
    m.status = e.target.value; persist(); renderAll(); toast(`${m.name} set to ${m.status}.`);
  });
  $("#m-search").addEventListener("input", (e) => { filters.q = e.target.value; page = 1; renderMembers(); });
  $("#m-status").addEventListener("change", (e) => { filters.status = e.target.value; page = 1; renderMembers(); });
  $("#m-plan").addEventListener("change", (e) => { filters.plan = e.target.value; page = 1; renderMembers(); });
  $("#add-member").addEventListener("click", addMemberModal);
  $("#export-csv").addEventListener("click", exportCsv);
  $("#reset-demo").addEventListener("click", () => {
    openModal({
      title: "Reset demo data?",
      html: `<p class="modal-text">This restores the original sample members and plan prices in this browser, including any demo registrations made on the website.</p>
        <div class="modal-actions"><button type="button" class="btn btn-primary" data-yes>Reset</button><button type="button" class="btn btn-ghost" data-no>Cancel</button></div>`,
      onOpen(modal) {
        $("[data-no]", modal.el).addEventListener("click", modal.close);
        $("[data-yes]", modal.el).addEventListener("click", () => { IH.resetPlanPrices(); IH.resetBookings(); members = IH.resetMembers(); modal.close(); renderAll(); toast("Demo data was reset."); });
      },
    });
  });

  // Sidebar (mobile)
  const sidebar = $("#sidebar"), openBtn = $("#open-sidebar");
  function setSidebar(open) {
    sidebar.classList.toggle("open", open); $("#scrim").classList.toggle("show", open);
    openBtn.setAttribute("aria-expanded", String(open));
  }
  openBtn.addEventListener("click", () => setSidebar(true));
  $("#scrim").addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setSidebar(false); });

  // Hash routing: #overview, #members, #plans
  function route() {
    const name = VIEWS[location.hash.slice(1)] ? location.hash.slice(1) : "overview";
    $$(".view").forEach((v) => (v.hidden = v.id !== "view-" + name));
    $$(".side-nav a").forEach((a) => { const on = a.dataset.view === name; a.classList.toggle("active", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    $("#view-title").textContent = VIEWS[name][0]; $("#view-sub").textContent = VIEWS[name][1];
    document.title = `${VIEWS[name][0]} | Dashboard Demo | IRON HOUSE FITNESS`;
    setSidebar(false); window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- Start ---------- */
  hydrateIcons();
  $("#m-plan").insertAdjacentHTML("beforeend", plans.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join(""));
  route();
  skeletons();
  setTimeout(() => {
    try {
      members = IH.getMembers();
      if (!members.every((m) => m && m.id && m.name && m.joinedAt)) throw new Error("Saved demo data looks damaged.");
      renderAll();
    } catch (err) {
      showError(err.message || "The demo data could not be loaded.");
    }
  }, 600);
})();
