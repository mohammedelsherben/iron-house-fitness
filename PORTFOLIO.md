# IRON HOUSE FITNESS: Portfolio Notes

## Short project description (copy-paste)

**IRON HOUSE FITNESS** is a premium gym website and membership-management dashboard concept, designed and built from scratch as a showcase for fitness businesses. The public site pairs a bold dark/electric-lime brand with filterable workout programs, a trainer showcase, EGP membership plans with a validated sign-up flow, and a filterable weekly class schedule. A companion dashboard demo gives gym owners a feel for day-to-day management: KPI cards, a revenue chart, expiring-membership alerts, and a searchable, sortable members table. Built with accessible, responsive, dependency-free HTML, CSS and JavaScript. All content is fictional demo data.

**One-liner:** *A premium gym website with an interactive dashboard, designed to convert visitors and simplify membership management.*

## Features you can demonstrate to clients

**Website**
- High-impact hero with clear calls to action and animated statistics counters
- Interactive workout programs: category + difficulty filters, detail modal with sample week
- Exercise library: 30 exercises (5 per muscle across 6 muscle groups) with target muscle, live joint-angle readout, step-by-step how-to, tips, and a muscle filter; 10–12 reps per set
- Ready for AI-generated exercise videos: drop `assets/exercises/<id>.mp4` and a "Watch the AI video" tab appears automatically; ready-made prompts for all 30 exercises are in AI-VIDEO-PROMPTS.md
- "Coach Karim in the gym" explainer: on-screen captions synced with his voice, progress bar and per-step playback; supports dropping in real recorded videos per exercise
- Coach Karim Hassan (the demo trainer, with his photo) explains each targeted muscle and every exercise, in English or Arabic, with a "Listen" button that reads his explanation aloud using the browser's built-in voice
- Workout timer: "Start exercise" opens a player with a rep counter synced to the animation, set tracker, workout clock, rest countdown, pause/resume and a completion screen
- Full Arabic (RTL) version with a language switcher
- Trainer showcase cards with a "Book with a trainer" flow: session type, date picker, available time slots (opening hours respected, trainer's own classes and existing bookings blocked), validation and a success state; bookings appear in the dashboard's Bookings tab
- Three membership plans (EGP) with a registration modal, inline validation and a clear success state
- Weekly class schedule filtered by day and training type, with empty states
- Contact form with validation, opening hours, and social links
- Calorie calculator (Mifflin-St Jeor): daily calorie target for fat loss / maintenance / muscle gain, BMR, maintenance calories, BMI and a protein/carbs/fat split, with validation, safe-minimum and under-18 notices, and a "book a trainer" call to action
- Floating WhatsApp button (language-aware message), FAQ accordion with FAQPage structured data, privacy-friendly click-to-load map, privacy policy page and storage notice
- SEO basics: Open Graph/Twitter tags, ExerciseGym + FAQPage JSON-LD, robots.txt, sitemap.xml
- Sticky header with scroll-spy, mobile menu, scroll-reveal animations (respects reduced-motion)
- SEO basics, social-sharing tags, accessible forms and dialogs, fully responsive

**Dashboard**
- Sidebar navigation with a mobile slide-in drawer
- KPI cards (members, active, expiring, revenue) calculated live from the data
- Custom SVG revenue chart with hover/keyboard tooltips (no chart library)
- Expiring-soon list with one-click renew
- Members table: search, status and plan filters, sortable columns, pagination, status editing, add, delete (with confirmation), CSV export
- Plans view with member counts and editable prices that also update the public website
- Loading skeletons, empty states and an error state with recovery
- Website sign-ups appear in the dashboard, which shows the end-to-end flow

## Features that require backend integration before real-world use

| Feature | What is needed |
|---|---|
| Trainer bookings | A booking API with real trainer calendars, double-booking protection, confirmation emails/SMS and cancellation (currently `localStorage`, one browser only) |
| Membership sign-ups | A database and API to store registrations (currently `localStorage`, one browser only) |
| Payments | A payment provider (e.g. Paymob, Fawry, Stripe) with server-side checkout and webhooks. None is included |
| Dashboard login | Authentication and role-based access. The demo dashboard is open to anyone |
| Members, renewals, status changes | Server-side persistence, validation and audit log |
| Revenue and KPIs | Real transaction data instead of fictional numbers |
| Contact form | An email service or form endpoint (SMTP, SendGrid, Formspree, etc.) |
| Email/SMS reminders | A messaging service and scheduled jobs (the "remind" button is a demo toast) |
| Class booking and capacity | Booking API, capacity limits, waitlists, cancellations |
| Content management | A CMS or admin screens so owners can edit programs, trainers and schedule without touching code |
| Legal and privacy | Real privacy policy, terms, cookie consent and data-protection handling for member data |
| Images and contact details | Replace Unsplash photos and placeholder contact details with the gym's own |

## Selling points to mention

- Fast: no framework or build step, tiny payload
- Easy to re-brand: one set of colour variables, all content in one data file
- Honest by design: demo content is labelled, and no fake payments or medical claims
