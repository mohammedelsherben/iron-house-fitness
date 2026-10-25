# IRON HOUSE FITNESS

A premium, dark-and-lime gym website with an interactive membership-management dashboard.
**Everything is demo content**: fictional trainers, prices, members, and statistics. See [PORTFOLIO.md](PORTFOLIO.md) for the portfolio description and feature lists.

- `index.html`: the public website (home, programs, trainers, membership plans, class schedule, testimonials, contact)
- `dashboard.html`: the gym-management dashboard demo (overview, members table, plans)

## Arabic version (RTL)

Both pages have a language button (**العربية / English**) in the header. Arabic switches the whole page to right-to-left with the Cairo font. Your choice is remembered in the browser.

- All Arabic text lives in one file: `js/i18n.js` (the `DICT` list maps each English text to its Arabic text). Anything missing from the list simply stays in English.
- If you add new text to the website, add its Arabic translation to `DICT` (or a rule to `PATTERNS` for text with numbers or names).
- Right-to-left layout fixes are in `css/rtl.css`.
- Demo member names in the dashboard and the placeholder email stay in English on purpose.

## Exercise videos and Coach Karim

Each of the 30 exercises opens a window with **Coach Karim in the gym**: his photo with live captions that follow his voice (the browser's text-to-speech), a progress bar, and per-step playback. The workout timer and joint angles sit under it.

### Adding AI-generated videos
The site cannot generate videos by itself. Generate them with any AI video tool, then drop the files in:
1. Open [AI-VIDEO-PROMPTS.md](AI-VIDEO-PROMPTS.md): it has a character description for Coach Karim and a ready prompt for each of the 30 exercises.
2. Save each clip as `assets/exercises/<exercise-id>.mp4` (for example `assets/exercises/squat.mp4`). Create the `assets/exercises` folder next to `index.html`.
3. That is all. When the file exists, the exercise window shows a **Watch the AI video** tab next to **Coach Karim explains**. Exercises without a file keep the Coach Karim scene.

Check each AI video before publishing (AI can show wrong technique) and label it as AI-generated.

Photos (for example AI-generated pictures of Coach Karim) can replace the default gym scene: save one as `assets/exercises/squat.jpg` and add `"squat"` to the `PHOTOS` list at the top of `js/exercises.js`. Exercise ids are the keys in `EXERCISES` in that file.

The older cartoon-athlete drawings are still in `js/exercises.js` (`exerciseSVG`) but are no longer shown.

## How to run it (no installation needed)

This project is plain HTML, CSS and JavaScript, so there is nothing to install and nothing to build.

**Easiest way:** double-click `index.html`. It opens in your browser.

**Better way (recommended, behaves like a real website):** run a tiny local server.

- If you have Python: open a terminal in this folder and run
  ```
  python -m http.server 5173
  ```
  then visit <http://localhost:5173>.
- If you have Node.js: `npx serve .`
- With VS Code: install the "Live Server" extension, right-click `index.html`, choose **Open with Live Server**.

> Why no React/Vite? The build machine had no Node.js installed, so the project uses a simpler stack that works everywhere. The code is still split into reusable renderer functions and shared modules, and can be ported to React later if a client needs it.

An internet connection is needed to load the Google Fonts and the Unsplash photos. If a photo fails to load, a dark placeholder is shown instead and the layout does not break.

## Project structure

```
iron-house-fitness/
├── index.html          Public website
├── dashboard.html      Dashboard demo
├── css/
│   ├── base.css        Colours, buttons, forms, modal, toast (shared)
│   ├── site.css        Website sections
│   └── dashboard.css   Dashboard layout
├── js/
│   ├── data.js         ALL demo content + browser-storage helpers (edit this first!)
│   ├── exercises.js    Animated athlete illustrations (30 exercises, 5 per muscle), target-muscle highlight, joint angles, sets/rest per program
│   ├── exercise-info.js  How-to steps, tip and target muscle for every exercise (English + Arabic)
│   ├── ui.js           Shared helpers: icons, modal, toast, form validation
│   ├── main.js         Website behaviour
│   └── dashboard.js    Dashboard behaviour
└── assets/favicon.svg
```

## Customising it for a real gym

1. **Colours / brand**: change the variables at the top of `css/base.css` (`--lime` is the accent colour).
2. **Content**: edit `js/data.js`: plans and prices (EGP), programs, trainers, class schedule, testimonials.
3. **Photos**: replace the Unsplash URLs in `js/data.js` and `index.html` with the gym's own photos (put files in an `assets/` folder).
4. **Contact details**: edit the placeholder phone, email, address, hours and social links in `index.html` (search for "placeholder").
5. **Name**: search and replace `IRON HOUSE` across the files.

## Calorie calculator

Section `id="calculator"` in `index.html`, logic in `js/main.js` (`calculateCalories`). It uses the Mifflin-St Jeor equation, activity multipliers (1.2 to 1.9) and three goals: lose fat (20% below maintenance), maintain, build muscle (10% above). Targets are never lower than 1,200 kcal (women) or 1,500 kcal (men), protein is 1.6 to 2 g per kg, fat is 25% of calories and carbs fill the rest. It is a general estimate with a medical disclaimer; change the numbers in the `GOALS` object if your gym uses different rules.

## Professional basics: WhatsApp, FAQ, map, privacy and SEO

| Feature | Where | What to change for a real gym |
|---|---|---|
| **WhatsApp button** (floating, bottom corner) | `js/data.js` → `SITE.whatsapp` | Put the gym's number in international format without `+`, for example `"201001234567"`. While empty, WhatsApp opens with the message ready and lets the visitor pick the contact. The message follows the page language. |
| **FAQ section** (accordion, 8 questions) | `index.html` → `id="faq"` | Replace the answers with the gym's real policies. Keep the matching text in the `FAQPage` block in the `<head>` (it helps Google show the questions in results). |
| **Map** (loads only after the visitor presses *Show map*) | `index.html` (`map-card`) and `js/main.js` (`#map-load`) | The location is an example in Cairo. Change the coordinates in the iframe URL (`bbox` and `marker`) and in the "Open in Google Maps" link. |
| **Privacy Policy** page + storage notice | `privacy.html`, `UI.storageNotice()` in `js/ui.js` | It is a template, not legal advice. Have a lawyer review it before launch. If you add analytics or ads you also need a real cookie-consent banner. |
| **SEO** | `index.html` `<head>`, `robots.txt`, `sitemap.xml` | Replace `your-domain.example` in `robots.txt` and `sitemap.xml`, then add `url`, `telephone` and `address` to the `ExerciseGym` block. Add `<link rel="canonical">` with the real URL. Submit the sitemap in Google Search Console. |

## How the demo "database" works

There is no backend. Registrations from the website and all dashboard changes are saved in your browser's `localStorage`:

- Choose a plan on the website → the registration appears in **Dashboard → Members** as *Pending*.
- Change a plan price in **Dashboard → Membership plans** → the website's plan cards update.
- Click **Book with a trainer** on a trainer card → pick a session, date and time → the booking appears in **Dashboard → Bookings**.
- **Reset demo data** (sidebar) restores the original sample data.

Data never leaves your browser and is not shared between devices.

## What was tested

- Navigation links, mobile menu, dashboard sidebar and hash routing (`#overview`, `#members`, `#plans`)
- Program filters (category + level), empty states, program-details modal
- Schedule filters (day + type) and empty state
- Registration modal and contact form: validation errors, success states
- Members table: search, status/plan filters, sorting, pagination, add, renew, delete, set status, CSV export
- Revenue chart rendering and tooltips
- No horizontal overflow at phone width; no console errors

## Accessibility and SEO

Semantic landmarks, one `h1` per page, skip link, labelled form fields with inline errors, keyboard-accessible modals (Esc closes, focus is trapped), `aria-pressed` filter chips, reduced-motion support, page title and meta description, Open Graph / Twitter tags, descriptive image alt text.

## What needs a backend before real-world use

See the full list in [PORTFOLIO.md](PORTFOLIO.md). In short: real sign-up storage, payments, authentication for the dashboard, email sending, and a database.

## Credits

Photos from [Unsplash](https://unsplash.com). Fonts: Barlow Condensed and Inter (Google Fonts). Icons are inline SVG line icons.
