/* ==========================================================
   IRON HOUSE FITNESS — demo data + tiny storage layer
   Everything here is FICTIONAL sample content.
   Gym owners: edit the lists below to use your own content.
   ========================================================== */
(function () {
  "use strict";

  const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=55`;

  /* ---------- Browser storage (safe wrapper) ---------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
    },
    remove(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } },
  };
  const KEYS = { members: "ironhouse.members.v1", plans: "ironhouse.plans.v1", bookings: "ironhouse.bookings.v1" };

  /* ---------- Membership plans (prices in EGP — DEMO prices) ---------- */
  const PLANS_BASE = [
    {
      id: "monthly", name: "Monthly", price: 800, days: 30, durationLabel: "1 month", tag: "",
      perks: ["Full gym floor access", "2 group classes per week", "Locker room & showers", "Free fitness assessment"],
    },
    {
      id: "quarterly", name: "Quarterly", price: 2100, days: 90, durationLabel: "3 months", tag: "Most popular",
      perks: ["Everything in Monthly", "Unlimited group classes", "1 guest pass per month", "Quarterly body-composition check", "Priority class booking"],
    },
    {
      id: "annual", name: "Annual", price: 7200, days: 365, durationLabel: "12 months", tag: "Best value",
      perks: ["Everything in Quarterly", "2 personal-training sessions", "Free IRON HOUSE gym bag", "Membership freeze (up to 14 days)", "Members-only events"],
    },
  ];

  /** Plans with any price changes made in the dashboard demo applied. */
  function getPlans() {
    const overrides = store.get(KEYS.plans, {});
    return PLANS_BASE.map((p) => {
      const price = Number(overrides[p.id]);
      return price > 0 ? { ...p, price } : { ...p };
    });
  }
  function setPlanPrice(id, price) {
    const overrides = store.get(KEYS.plans, {});
    overrides[id] = price;
    return store.set(KEYS.plans, overrides);
  }
  function resetPlanPrices() { store.remove(KEYS.plans); }

  /* ---------- Workout programs (demo content) ---------- */
  const CATEGORIES = [
    { id: "strength", label: "Strength" },
    { id: "muscle", label: "Muscle Building" },
    { id: "fatloss", label: "Fat Loss" },
    { id: "functional", label: "Functional" },
  ];
  const PROGRAMS = [
    {
      id: "p1", name: "Beginner Strength", category: "strength", level: "Beginner", weeks: 8, perWeek: 3, session: "45–60 min",
      image: IMG("1517836357463-d25dfeac3438", 700),
      blurb: "Learn the big lifts with safe technique and steady progress.",
      overview: "An introduction to barbell and dumbbell basics. You'll practise squat, hinge, push, pull and carry patterns while building a base of strength.",
      equipment: "Barbells, dumbbells, bench, cable machine",
      week: [["Day 1", "Squat pattern + upper push"], ["Day 2", "Rest or light walk"], ["Day 3", "Hinge pattern + upper pull"], ["Day 4", "Rest"], ["Day 5", "Full-body strength + core"], ["Weekend", "Rest and recovery"]],
    },
    {
      id: "p2", name: "Power Builder", category: "strength", level: "Advanced", weeks: 12, perWeek: 4, session: "60–75 min",
      image: IMG("1517963879433-6ad2b056d712", 700),
      blurb: "Heavy compound lifting blocks for experienced lifters chasing PRs.",
      overview: "Periodised blocks of heavy singles, doubles and triples, with accessory work to keep joints and weak points in shape.",
      equipment: "Power rack, barbells, plates, accessory machines",
      week: [["Day 1", "Heavy squat + accessories"], ["Day 2", "Heavy bench + upper back"], ["Day 3", "Rest"], ["Day 4", "Deadlift + posterior chain"], ["Day 5", "Overhead press + arms"], ["Weekend", "Rest and mobility"]],
    },
    {
      id: "p3", name: "Muscle Building", category: "muscle", level: "Intermediate", weeks: 12, perWeek: 5, session: "60 min",
      image: IMG("1605296867304-46d5465a13f1", 700),
      blurb: "A classic body-part split with higher volume for size and shape.",
      overview: "Five focused sessions per week, each targeting one or two muscle groups with moderate reps and controlled tempo.",
      equipment: "Dumbbells, cables, barbells, machines",
      week: [["Day 1", "Chest + triceps"], ["Day 2", "Back + biceps"], ["Day 3", "Legs"], ["Day 4", "Shoulders + abs"], ["Day 5", "Arms + weak-point work"], ["Weekend", "Rest"]],
    },
    {
      id: "p4", name: "Mass Starter", category: "muscle", level: "Beginner", weeks: 8, perWeek: 4, session: "50 min",
      image: IMG("1507398941214-572c25f4b1dc", 700),
      blurb: "An upper/lower split that introduces gym-style muscle training.",
      overview: "Alternating upper- and lower-body days with simple exercise choices, so you can focus on form and consistency.",
      equipment: "Dumbbells, machines, cables",
      week: [["Day 1", "Upper body"], ["Day 2", "Lower body"], ["Day 3", "Rest"], ["Day 4", "Upper body"], ["Day 5", "Lower body"], ["Weekend", "Rest"]],
    },
    {
      id: "p5", name: "Fat Loss", category: "fatloss", level: "Intermediate", weeks: 10, perWeek: 4, session: "50 min",
      image: IMG("1593079831268-3381b0db4a77", 700),
      blurb: "Resistance training plus conditioning intervals for an active routine.",
      overview: "Combines full-body strength circuits with cardio intervals. Pair it with a sensible eating routine of your choice.",
      equipment: "Dumbbells, kettlebells, treadmill, rower",
      week: [["Day 1", "Full-body circuit"], ["Day 2", "Interval cardio"], ["Day 3", "Rest or walk"], ["Day 4", "Lower-body circuit + core"], ["Day 5", "Upper-body circuit + intervals"], ["Weekend", "Active recovery"]],
    },
    {
      id: "p6", name: "Metabolic Burn", category: "fatloss", level: "Advanced", weeks: 6, perWeek: 5, session: "45 min",
      image: IMG("1571731956672-f2b94d7dd0cb", 700),
      blurb: "A short, intense block of high-tempo sessions.",
      overview: "Six weeks of fast-paced intervals and loaded carries. Demanding by design, so it suits people who already train regularly.",
      equipment: "Kettlebells, sleds, battle ropes, assault bike",
      week: [["Day 1", "Sled + kettlebell intervals"], ["Day 2", "Upper-body supersets"], ["Day 3", "Bike intervals + core"], ["Day 4", "Lower-body supersets"], ["Day 5", "Mixed-modal finisher"], ["Weekend", "Rest"]],
    },
    {
      id: "p7", name: "Functional Fitness", category: "functional", level: "Beginner", weeks: 8, perWeek: 3, session: "45 min",
      image: IMG("1549060279-7e168fcee0c2", 700),
      blurb: "Move well in daily life: balance, mobility, and everyday strength.",
      overview: "Bodyweight, kettlebell and band exercises that train movement patterns you use outside the gym.",
      equipment: "Kettlebells, bands, mats, TRX",
      week: [["Day 1", "Movement basics + core"], ["Day 2", "Rest"], ["Day 3", "Carries, lunges and pulls"], ["Day 4", "Rest"], ["Day 5", "Balance, mobility + conditioning"], ["Weekend", "Optional walk or yoga"]],
    },
    {
      id: "p8", name: "Athletic Conditioning", category: "functional", level: "Advanced", weeks: 10, perWeek: 4, session: "60 min",
      image: IMG("1534258936925-c58bed479fcb", 700),
      blurb: "Speed, agility and work capacity for sport and mixed training.",
      overview: "Plyometrics, sprints, rope work and loaded movement to build an athletic engine.",
      equipment: "Plyo boxes, battle ropes, sleds, kettlebells",
      week: [["Day 1", "Plyometrics + sprints"], ["Day 2", "Strength + carries"], ["Day 3", "Rest"], ["Day 4", "Agility + rope work"], ["Day 5", "Conditioning circuit"], ["Weekend", "Rest and mobility"]],
    },
  ];

  /* ---------- Trainers (fictional) ---------- */
  const TRAINERS = [
    { id: "t1", name: "Karim Hassan", specialty: "Strength & Powerlifting", years: 12, image: IMG("1581009146145-b5ef050c2e1e", 600), bio: "Former competitive lifter who loves teaching clean technique and smart progression." },
    { id: "t2", name: "Nour Adel", specialty: "HIIT, Boxing & Yoga", years: 8, image: IMG("1594381898411-846e7d193883", 600), bio: "High-energy coach who builds fun, sweat-soaked sessions for every fitness level." },
  ];

  /* ---------- Class schedule (fictional) ---------- */
  const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const CLASS_TYPES = ["Strength", "HIIT", "Functional", "Yoga", "Boxing"];
  const T = { k: "Karim Hassan", n: "Nour Adel" };
  const c = (day, time, type, name, trainer, level) => ({ day, time, type, name, trainer, level });
  const CLASSES = [
    c("Saturday", "07:00", "Strength", "Foundation Lifts", T.k, "Beginner"),
    c("Saturday", "18:00", "HIIT", "Sweat Circuit", T.n, "Intermediate"),
    c("Saturday", "20:00", "Yoga", "Evening Flow", T.n, "Beginner"),
    c("Sunday", "07:00", "Functional", "Move Better", T.k, "Beginner"),
    c("Sunday", "18:30", "Boxing", "Boxing Fitness 101", T.n, "Beginner"),
    c("Sunday", "20:00", "Strength", "Upper Body Power", T.k, "Intermediate"),
    c("Monday", "06:30", "HIIT", "Morning Burn", T.n, "Advanced"),
    c("Monday", "18:00", "Strength", "Squat Club", T.k, "Intermediate"),
    c("Monday", "19:30", "Yoga", "Mobility Reset", T.n, "Beginner"),
    c("Tuesday", "07:00", "Functional", "Kettlebell Basics", T.k, "Beginner"),
    c("Tuesday", "18:00", "Boxing", "Bag Work Rounds", T.n, "Intermediate"),
    c("Tuesday", "19:30", "HIIT", "Tabata Night", T.n, "Intermediate"),
    c("Wednesday", "07:00", "Yoga", "Sunrise Stretch", T.n, "Beginner"),
    c("Wednesday", "18:00", "Strength", "Deadlift Lab", T.k, "Advanced"),
    c("Wednesday", "20:00", "Functional", "Athletic Engine", T.k, "Advanced"),
    c("Thursday", "06:30", "HIIT", "Express 30", T.n, "Beginner"),
    c("Thursday", "18:00", "Boxing", "Boxing Conditioning", T.n, "Advanced"),
    c("Thursday", "19:30", "Strength", "Full-Body Strength", T.k, "Beginner"),
    c("Friday", "11:00", "Yoga", "Weekend Restore", T.n, "Beginner"),
    c("Friday", "16:00", "Functional", "Family Fitness Fun", T.k, "Beginner"),
  ];

  /* ---------- Testimonials (fictional demo profiles) ---------- */
  const TESTIMONIALS = [
    { name: "Mariam S.", role: "Member · Quarterly plan", quote: "The coaches explain everything clearly, and the classes keep me coming back. It is the first gym routine I have actually stuck with." },
    { name: "Youssef K.", role: "Member · Annual plan", quote: "Great equipment, a motivating atmosphere and trainers who notice when your form slips. Easy choice for me." },
    { name: "Hana R.", role: "Member · Monthly plan", quote: "I started with the Beginner Strength program and felt welcome from day one. The schedule fits around my work hours." },
  ];

  /* ---------- Dashboard demo members ---------- */
  const NAMES = [
    "Ahmed Mansour", "Mona Farouk", "Tarek Saleh", "Dina Abdelrahman", "Hossam Nabil", "Laila Gamal", "Mostafa Ezzat", "Rania Sherif",
    "Khaled Samir", "Yasmin Tawfik", "Amr Lotfy", "Heba Mostafa", "Sherif Barakat", "Nada Ashraf", "Ibrahim Zaki", "Farida Hamdy",
    "Mahmoud Radwan", "Salwa Fouad", "Walid Anwar", "Nermine Habib", "Adham Kamel", "Reem Badawi", "Bassem Ghoneim", "Jana Ismail",
    "Eslam Hegazy", "Aya Mounir", "Ziad Morsi", "Mai Khattab",
  ];
  // [plan, days since joining] — mixes active, expiring and expired members on purpose.
  const SEED = [
    ["annual", 40], ["quarterly", 12], ["monthly", 22], ["monthly", 3], ["annual", 190], ["quarterly", 80], ["monthly", 35], ["quarterly", 30],
    ["annual", 330], ["monthly", 18], ["quarterly", 60], ["annual", 355], ["monthly", 8], ["quarterly", 95], ["monthly", 1], ["annual", 120],
    ["monthly", 26], ["quarterly", 45], ["annual", 15], ["monthly", 14], ["quarterly", 5], ["monthly", 40], ["annual", 260], ["monthly", 2],
    ["quarterly", 72], ["monthly", 11], ["annual", 75], ["quarterly", 85],
  ];

  const DAY_MS = 86400000;
  const isoDay = (date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const parseDay = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const startOfToday = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };

  function buildSeedMembers() {
    const today = startOfToday();
    const statuses = { 9: "Frozen", 20: "Pending", 23: "Cancelled" };
    return NAMES.map((name, i) => {
      const [plan, ago] = SEED[i];
      const first = name.split(" ")[0].toLowerCase();
      return {
        id: "M-" + (1001 + i),
        name,
        email: `${first}${i + 1}@example.com`,
        phone: `+20 100 000 ${String(1000 + i * 7).slice(-4)}`,
        plan,
        joinedAt: isoDay(new Date(today.getTime() - ago * DAY_MS)),
        status: statuses[i] || "Active",
      };
    });
  }

  function getMembers() {
    const saved = store.get(KEYS.members, null);
    if (Array.isArray(saved)) return saved;
    const seed = buildSeedMembers();
    store.set(KEYS.members, seed);
    return seed;
  }
  function saveMembers(list) { return store.set(KEYS.members, list); }
  function resetMembers() { store.remove(KEYS.members); return getMembers(); }

  function nextMemberId(list) {
    const max = list.reduce((m, x) => Math.max(m, Number(String(x.id).replace(/\D/g, "")) || 0), 1000);
    return "M-" + (max + 1);
  }

  /** Adds a member (used by the website sign-up form and the dashboard). */
  function addMember({ name, email, phone, plan, status }) {
    const list = getMembers();
    const member = { id: nextMemberId(list), name, email, phone, plan, joinedAt: isoDay(new Date()), status: status || "Pending" };
    list.push(member);
    saveMembers(list);
    return member;
  }

  /** Works out the label shown in the dashboard: Active / Expiring / Expired / Pending / Frozen / Cancelled. */
  function memberState(m, plans) {
    if (m.status !== "Active") return m.status;
    const left = daysLeft(m, plans);
    if (left < 0) return "Expired";
    if (left <= 14) return "Expiring";
    return "Active";
  }
  function expiryDate(m, plans) {
    const plan = plans.find((p) => p.id === m.plan) || plans[0];
    return new Date(parseDay(m.joinedAt).getTime() + plan.days * DAY_MS);
  }
  function daysLeft(m, plans) {
    return Math.round((expiryDate(m, plans).getTime() - startOfToday().getTime()) / DAY_MS);
  }

  /* ---------- Trainer bookings (demo, stored in this browser only) ---------- */
  function getBookings() {
    const saved = store.get(KEYS.bookings, []);
    return Array.isArray(saved) ? saved : [];
  }
  function addBooking({ trainerId, trainerName, type, date, time, name, email, phone }) {
    const list = getBookings();
    const max = list.reduce((m, x) => Math.max(m, Number(String(x.id).replace(/\D/g, "")) || 0), 2000);
    const booking = { id: "B-" + (max + 1), trainerId, trainerName, type, date, time, name, email, phone, createdAt: isoDay(new Date()) };
    list.push(booking);
    if (!store.set(KEYS.bookings, list)) throw new Error("storage blocked");
    return booking;
  }
  function deleteBooking(id) { store.set(KEYS.bookings, getBookings().filter((b) => b.id !== id)); }
  function resetBookings() { store.remove(KEYS.bookings); }

  /* Fictional monthly revenue (EGP) for the last 12 months. */
  const REVENUE = [96000, 104000, 99000, 112000, 118000, 125000, 121000, 134000, 142000, 138000, 151000, 163000];

  window.IH = {
    IMG, store, KEYS, PLANS_BASE, getPlans, setPlanPrice, resetPlanPrices,
    CATEGORIES, PROGRAMS, TRAINERS, DAYS, CLASS_TYPES, CLASSES, TESTIMONIALS,
    getMembers, saveMembers, resetMembers, addMember, memberState, expiryDate, daysLeft,
    getBookings, addBooking, deleteBooking, resetBookings,
    REVENUE, isoDay, parseDay, startOfToday,
  };
})();
