# Jeff Pendy — Portfolio

Bilingual (EN/FR) portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, next-intl and next-themes. Live at [jeffpendy.com](https://www.jeffpendy.com).

## Structure

- `app/[locale]/` — home page, `projects/` index and `projects/[slug]` case studies (statically generated per locale), Open Graph image.
- `app/api/contact/` — contact endpoint (Nodemailer). Needs `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` and optionally `EMAIL_FROM`. Without them it returns 503 and the form offers a mailto fallback.
- `app/sitemap.ts`, `app/robots.ts` — generated from the content model.
- `lib/content/` — typed, bilingual content: projects, experience, skills, site links.
- `messages/` — UI strings per locale.
- `components/` — page sections and shared UI.
- `tests/` — Vitest checks for content integrity, translation parity and contact validation.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Editing content

See [docs/CONTENT.md](docs/CONTENT.md) for updating jobs, projects, translations, screenshots, the résumé and metadata.
