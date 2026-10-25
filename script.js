// ===== محتوى الموقع / Site content =====
// عدّل النصوص هنا فقط. Edit the text here only.

const texts = {
  ar: {
    logo: "محمد",
    nav_about: "نبذة عني",
    nav_skills: "المهارات",
    nav_projects: "أعمالي",
    nav_contact: "تواصل معي",
    hero_hello: "مرحباً، أنا",
    hero_name: "محمد حسام",
    hero_role: "مطوّر مواقع ووكلاء ذكاء اصطناعي",
    hero_btn: "شاهد أعمالي",
    about_title: "نبذة عني",
    about_text: "أنا محمد حسام، مطوّر مواقع، وأبني وكلاء ذكاء اصطناعي يساعدون في أتمتة المهام وتسهيل العمل. أدرس في السنة الثالثة بمودرن أكاديمي بالمعادي، تخصص إدارة الأعمال، وأجمع بين فهم الأعمال والبرمجة لأصنع حلولاً عملية تخدم احتياج الناس فعلاً.",
    skills_title: "المهارات",
    projects_title: "أعمالي",
    contact_title: "تواصل معي",
    contact_text: "عندك فكرة أو فرصة عمل؟ يسعدني أن أسمع منك.",
    footer: "جميع الحقوق محفوظة",
    code: "الكود",
    live: "عرض مباشر",
  },
  en: {
    logo: "Mohammed",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_hello: "Hi, I'm",
    hero_name: "Mohammed Hossam",
    hero_role: "Web Developer & AI Agents Builder",
    hero_btn: "See my work",
    about_title: "About me",
    about_text: "I'm Mohammed Hossam, a web developer who builds AI agents that automate tasks and make work easier. I'm a third-year Business Administration student at Modern Academy in Maadi, and I combine business understanding with programming to build practical solutions people actually need.",
    skills_title: "Skills",
    projects_title: "Projects",
    contact_title: "Get in touch",
    contact_text: "Have an idea or a job opportunity? I'd love to hear from you.",
    footer: "All rights reserved",
    code: "Code",
    live: "Live demo",
  },
};

const skills = ["HTML", "CSS", "JavaScript", "AI Agents", "Git", "GitHub"];

// لإضافة مشروع جديد: انسخ كتلة { ... } وغيّر القيم.
// To add a project: copy a { ... } block and change the values.
// image: ضع اسم الصورة داخل مجلد images، أو اتركه "" لعرض لون بدلاً منها.
const projects = [
  {
    title: { ar: "موقع البورتفوليو الشخصي", en: "Personal Portfolio Website" },
    desc: {
      ar: "موقع شخصي بلغتين (عربي وإنجليزي) لعرض أعمالي، مبني بـ HTML وCSS وJavaScript ومنشور على Vercel.",
      en: "A bilingual (Arabic & English) personal site that showcases my work, built with HTML, CSS and JavaScript and hosted on Vercel.",
    },
    image: "",
    code: "https://github.com/mohammedelsherben/Portfolio",
    live: "https://portfolio-mohammedelsherben.vercel.app",
  },
  {
    title: { ar: "IRON HOUSE FITNESS: موقع نادي رياضي", en: "IRON HOUSE FITNESS: Gym Website" },
    desc: {
      ar: "موقع نادي رياضي متميز بلغتين (عربي وإنجليزي) مع لوحة تحكم تجريبية لإدارة الاشتراكات. بيانات تجريبية بالكامل، مبني بـ HTML وCSS وJavaScript.",
      en: "A premium bilingual (Arabic & English) gym website with a demo membership-management dashboard. All data is fictional; built with HTML, CSS and JavaScript.",
    },
    image: "",
    code: "https://github.com/mohammedelsherben/iron-house-fitness",
    live: "https://iron-house-fitness.vercel.app",
  },
];

// ===== الكود / Code =====

function getSavedLang() {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
}

let lang = getSavedLang() === "en" ? "en" : "ar";

function render() {
  const t = texts[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t.hero_name;
  document.getElementById("lang-btn").textContent = lang === "ar" ? "EN" : "عربي";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t[el.dataset.i18n];
  });

  document.getElementById("skills-list").innerHTML = skills
    .map((s) => `<li>${s}</li>`)
    .join("");

  document.getElementById("projects-grid").innerHTML = projects
    .map((p, i) => {
      return `
        <article class="project">
          <span class="idx">${String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>${p.title[lang]}</h3>
            <p>${p.desc[lang]}</p>
          </div>
          <div class="actions">
            ${p.code ? `<a href="${p.code}" target="_blank" rel="noopener">${t.code}</a>` : ""}
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">${t.live}</a>` : ""}
          </div>
        </article>`;
    })
    .join("");

  animateHero();
}

// ===== الحركة / Motion =====
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let heroRun = 0;

// يظهر الاسم كلمة كلمة، ويُكتب المسمى الوظيفي كأنه في تيرمينال
// The name appears word by word, and the role types out like a terminal
function animateHero() {
  const run = ++heroRun;

  const h1 = document.querySelector(".hero h1");
  const name = h1.textContent;
  const words = name.trim().split(/\s+/);
  h1.setAttribute("aria-label", name);
  h1.innerHTML = words
    .map((w, i) => `<span class="word" style="--i:${i}" aria-hidden="true">${w}</span>`)
    .join(" ");

  const role = document.querySelector(".hero .role");
  const full = role.textContent;
  role.setAttribute("aria-label", full);
  if (reduceMotion) return;

  role.textContent = "";
  let n = 0;
  const step = () => {
    if (run !== heroRun) return;
    n += 1;
    role.textContent = full.slice(0, n);
    if (n < full.length) setTimeout(step, 45);
  };
  setTimeout(step, words.length * 130 + 500);
}

// ===== الوضع الليلي / Dark mode =====
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeMeta.content = dark ? "#0E1330" : "#F7F7FB";
}
applyTheme(document.documentElement.dataset.theme === "dark");

document.getElementById("theme-btn").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  applyTheme(dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
});

document.getElementById("lang-btn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  render();
});

render();

// ظهور هادئ للأقسام عند التمرير / gentle fade-in on scroll
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
