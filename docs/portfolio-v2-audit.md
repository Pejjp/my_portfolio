# Portfolio V2 — Audit and implementation plan

Audit date: 2026-10-26 · Branch: `portfolio-v2` · Baseline commit: `4a428fb`

## 1. What exists today

| Area | Finding |
| --- | --- |
| Routing | Next.js 16 App Router, single route `app/[locale]/page.tsx`. `next-intl` with `proxy.ts` middleware, locales `en` (default) / `fr`, prefix always. No project routes: projects open in a client-side popup (`ProjectsPopup.tsx`), so there are no existing project URLs to preserve. In-page anchors: `#hero`, `#about`, `#projects`, `#work-experience`, `#contact`. |
| Content sources | Everything lives in `messages/en.json` / `messages/fr.json`: UI strings **and** the project list (`projects.projectsList`) **and** experience (`experiences`), read with `t.raw()` and cast to loose types. Same data duplicated per locale with drifting dates (e.g. "Jan 2026" vs "Janv. 2026"). |
| Components | `Hero`, `TechStack` (scrolling logo wall from external CDNs), `About`, `Projects` (carousel) + `ProjectsPopup`, `WorkExperience`, `Contact`, `Footer`, `Navbar`, `SwitchLang`, `ThemeToggle`. `TestComponent.tsx` is dead code imported but unused. `lib/types/footer.ts` describes newsletter/legal fields that are never rendered. |
| Theme | `next-themes` (class strategy, system default) + custom Tailwind palette (gold accent `#c08301`, warm darks). `ThemeToggle` reads `theme` instead of `resolvedTheme`, so with "system" + dark OS it shows the wrong icon. |
| Contact flow | `Contact.tsx` posts only the visitor's email to `app/api/contact/route.ts`, which sends a Gmail/nodemailer message using `EMAIL_*` env vars and `emails/templates/connect.html`. No server-side format validation, no rate limiting or spam protection, and the email is interpolated **unescaped** into the HTML template. Errors return 500 with no fallback path for the visitor. |
| Résumé | `public/cv/cv_jeff.pdf` and `cv_jeff_fr.pdf`, last changed 2026-02-08. Content predates SMARDT and Borrow'd, contains the phone number, and contains unverified metrics (Picto "60%", "$7,500+/year", Code to Give "60%"). |
| Metadata | Static `title: "Jeff J. Pendy P."`, `description: "My personnal portfolio"` for both locales. Favicon points to `/logo_color_4.png`, which does not exist. No Open Graph/Twitter, canonical, hreflang, sitemap, robots or JSON-LD. |
| Images | `next/image` used in Hero/About/Projects, but popup and tech wall use raw `<img>`. Several originals are very large (`image_classification_w_docker.jpg` 10 MB, `personal_image3.jpeg` 8 MB). No `sizes` attributes. |
| Tests | No test runner or tests. |

## 2. Issues from brief §2, checked against source

| Brief issue | Verdict |
| --- | --- |
| Hero "I'm Jeff / Welcome to my space" says nothing about specialization | Confirmed (`messages/*.json` `hero.*`). |
| About calls Jeff a "Computer Science student" | Confirmed (`about.about_me`, EN and FR). |
| SMARDT role not shown | Confirmed: no SMARDT entry anywhere. |
| Borrow'd / TA text repeated in the public extraction | **Real DOM duplication, not an extraction artifact.** `WorkExperience.tsx` renders every entry twice — a mobile block (`md:hidden`) and a desktop block (`hidden md:grid`) — and hides one with CSS. `Hero.tsx` does the same, producing **two `<h1>` elements**. Screen readers in some modes and all text extractors see both copies. |
| "www.mygithub.com" label | Confirmed in `Footer.tsx`. The `href` (`https://github.com/Pejjp`) is correct (HTTP 200); only the label is wrong. |
| Project cards thin on architecture/outcome | Confirmed. Several claims are generic ("production-ready", "seamless"). |
| Skill list unprioritized | Confirmed: 26 logos, mixing languages with IDEs (IntelliJ, VS Code), loaded from third-party CDNs, animated with no reduced-motion handling. |
| Picto "30% performance improvement" | **Unverified.** No baseline or method anywhere. The Picto360 repo's `docs/results.md` and `docs/evaluation.md` are unfilled templates, and the Feb résumé says "60%" for what looks like the same claim. The latest résumé (cv-52) drops it. → Removed. |
| Phone number public | Confirmed in `Footer.tsx` (`tel:+1-438-855-1291`). → Removed from the site. **Still inside both résumé PDFs** (flagged). |
| Other broken/odd links | Footer YouTube icon `href="#"`; Route Reservation "GitHub" points to the profile root, not a repo; Facebook/Instagram personal accounts in the footer; LinkedIn uses `http://`. |
| Accessibility | No skip link; `focus:outline-none` on many controls; mobile menu has no `aria-expanded` and stays focusable when hidden; language switch is a JS-only button with a 300 ms delay; carousel cards are `<div onClick>` wrapping `<a href="#projects">`; alt text such as `my_avatar`, `my logo`. |
| Motion | Infinite logo marquee, hover scaling everywhere, `scroll-behavior: smooth` with no `prefers-reduced-motion` fallback. |
| Lint baseline | `npm run lint`: 2 errors (`react/no-unescaped-entities` in Hero, `react-hooks/set-state-in-effect` in ThemeToggle), 22 warnings. `tsc --noEmit` passes. |
| Dependencies | `npm audit`: 20 advisories incl. **critical in `next@16.1.1`** (fix: `next@16.4.3`), high in `nodemailer` (fix: 10.2.1), `next-intl` moderate. Not changed on this branch (see plan §5). |

## 3. Verification sources used

- Repository source (this repo).
- Latest résumé `Jeff Pendy SWD cv-52.pdf` (2026-10-26), provided by Jeff during the run; older résumé in `public/cv/`.
- Public GitHub (read-only API):
  - `ceduni/picto360`: Jeff (`Pejjp`) is the top contributor (101 commits). The source confirms React/TS (Vite), Fastify, MongoDB/Mongoose, Firebase auth, Google Drive export through a pluggable `IStorageProvider` using Drive **resumable** uploads with SSE progress, `.picto` import/export, `sharp` compression, Jest tests, Husky and a GitHub Actions CI that Jeff authored. **No signed-URL direct upload, queue, worker, retry or lifecycle system exists**, so the brief's proposed architecture appears only as a clearly labelled "proposed next step".
  - `borrowd/borrowd` (public, open source): Jeff's merged PRs #503/#509/#540 (notification system, push channel, UI), #349/#378 (notify-when-available, `on_commit` race fix), #520, #526, #529, #539 (performance). PR #529 documents a measured before/after (9,000 → 187 queries, 2.21 s → 0.25 s, local SQLite, method described), so it qualifies under the brief's metric rule and is cited with a link.
  - `ParsaMakari/CodeToGive_2025`: Jeff has 23 commits, all on the React donor flows (donation flow, impact feedback, quiz, auth context, dark mode). The FastAPI RAG chatbot was committed by another contributor, so the site credits it to the team.
- Link checks: picto360.netlify.app, github.com/Pejjp, borrowd repo, LinkedIn URL all return HTTP 200.

## 4. Information architecture (after)

Nav: Home · Work · Projects · About · Contact / Accueil · Expérience · Projets · À propos · Contact.

`/[locale]` home: Hero (+ CTAs) → trust strip → featured projects (Picto360, Borrow'd, Code to Give) + other projects → experience timeline (SMARDT, Borrow'd, UdeM TA, earlier experience collapsed) → engineering focus + categorized skills → about → contact.
`/[locale]/projects` index; `/[locale]/projects/[slug]` case studies (statically generated, `dynamicParams = false`).
Existing anchors (`#projects`, `#about`, `#contact`, `#hero`) kept, `#work-experience` kept as the Work target.

## 5. Plan (small, reviewable commits)

1. **Foundation**: typed content model in `lib/content/` (`site`, `experience`, `projects`, `skills`) with `{ en, fr }` strings; messages files reduced to UI strings; new hero/about/focus/contact copy; categorized skills replace the logo wall; nav per brief; footer cleanup (phone removed, GitHub label fixed); delete dead code.
2. **Proof of work**: single-DOM experience timeline; featured cards; case-study pages with Problem → Context → Role → Architecture → Decisions → Tradeoffs → Outcome → Next; diagrams labelled *As implemented* / *Proposed*; status labels.
3. **Polish**: skip link, focus-visible styles, `<main>`, 44 px targets, reduced motion, `next/image` with `sizes`, per-locale metadata, canonical/hreflang, OG image, sitemap, robots, JSON-LD Person/CreativeWork; contact validation, honeypot, rate limit, HTML escaping, mailto fallback.
4. **Verification**: lint, `tsc`, build; add a light Vitest suite (content integrity, EN/FR message parity, contact validation); dev-server smoke check.

Out of scope: dependency upgrades (recommended as a separate PR, starting with `next@16.4.3` and `nodemailer@10.2.1`), replacing the résumé PDFs, deployment.
