# Content maintenance

All site content lives in two places:

| What | Where | Format |
| --- | --- | --- |
| Projects and case studies | `lib/content/projects.ts` | Typed `Project` objects, every string is `{ en, fr }` |
| Jobs and education | `lib/content/experience.ts` | Typed `Experience` objects, dates as `YYYY-MM` |
| Skills | `lib/content/skills.ts` | Grouped, with a level: `work`, `project`, `exploring` |
| Name, email, GitHub, LinkedIn, résumé paths, site URL | `lib/content/site.ts` | Constants |
| UI copy (nav, hero, headings, buttons, form messages, metadata) | `messages/en.json`, `messages/fr.json` | next-intl messages, same keys in both files |

Types are in `lib/content/types.ts`. A missing French string is a type error, and `npm test` fails if the EN and FR message files drift apart.

## Update a job

1. Edit the entry in `lib/content/experience.ts` (newest first).
2. Set `end: null` while the role is ongoing, `end: 'YYYY-MM'` when it ends. If the exact dates aren't confirmed, leave `end` out and set `periodLabel`.
3. `tier: 'primary'` appears in the main timeline. `tier: 'earlier'` goes in the collapsed "Earlier experience" group.
4. Draft bullets that still need approval go in `pendingBullets`. They are never rendered. Move them to `bullets` once approved.

## Add or update a project

1. Add an object to `lib/content/projects.ts` with a unique kebab-case `slug`. The page appears at `/en/projects/<slug>` and `/fr/projects/<slug>` on the next build, and in the sitemap.
2. `featured: true` puts it in the three home-page cards. Otherwise it is listed under "More projects". `order` sets the position.
3. `status` must be one of `shipped`, `inProgress`, `prototype` or `concept`.
4. Keep `chips` to five items at most. `stack` can be longer.
5. Write a full `caseStudy` (problem, context, role, architecture, decisions, tradeoffs, outcome, next), or just `highlights` for smaller projects.
6. Diagrams need a `kind`: `implemented` (read from source), `illustrative` or `proposed` (not built). Never mark a design as implemented unless the code exists.
7. Use `published: false` to keep a draft in source without rendering it.
8. Metrics need a documented baseline and measurement method. Link the evidence in `links.evidence`.

## Translations

- UI strings: add the key to **both** `messages/en.json` and `messages/fr.json`.
- Content strings: fill both `en` and `fr`. Write the French for Canadian readers (courriel, infonuagique, téléversement) instead of translating word for word.

## Screenshots and images

1. Put the file in `public/projects_screenshots/` (or `public/`). Prefer images 2,000 px wide or less. `next/image` resizes them, but huge originals slow down builds.
2. Import it statically at the top of `projects.ts`. That gives `next/image` the dimensions and a blur placeholder.
3. Set `image: { src, alt: { en, fr } }`. Alt text should describe what the image shows.
4. Only publish screenshots of products you have permission to show. Without one, the card shows a plain typographic panel.

## Résumé

Replace `public/cv/cv_jeff.pdf` (EN) and `public/cv/cv_jeff_fr.pdf` (FR) and keep the file names. If you rename them, update `resume` in `lib/content/site.ts`. Every résumé link reads from there.

## Metadata and SEO

- Site title and description per locale: `meta` in `messages/*.json`.
- Canonical URL base: `site.url` in `lib/content/site.ts`.
- Case-study metadata, the sitemap (`app/sitemap.ts`) and JSON-LD come from the content files automatically.
- The Open Graph image is generated from the hero copy (`app/[locale]/opengraph-image.tsx`).

## Checks before publishing

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Pending approvals

Items marked `REVIEW` in source are waiting for Jeff's confirmation. Search for `REVIEW` to find them all. The full list, with locations, is in the PR description and in `docs/portfolio-v2-audit.md`.
