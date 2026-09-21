# DOT — API landing page

Marketing site for the DOT payments API, aimed at companies outside Angola that
want to sell into the market. DOT already operates Angola's largest digital
payments platform; this page explains how to plug into it.

**Sell in Angola. Get paid globally.**

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Font | Poppins, self-hosted via `next/font` |
| Runtime deps | React and Next only — no UI or utility libraries |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate brand assets from `Novos assets/` (Windows only) |

## Internationalisation

English and Portuguese, route-based so each language has its own indexable URL.

- `/en`, `/pt` and `/en/documentation`, `/pt/documentation` — all prerendered
- `src/middleware.ts` sends `/` to **English** regardless of `Accept-Language`;
  visitors switch with the header control
- All copy lives in `src/content/en.ts` and `src/content/pt.ts` behind the
  explicit `SiteContent` interface in `src/content/types.ts` — adding a locale
  produces a type error for every string left untranslated
- `hreflang` alternates, per-locale `canonical`, `og:locale` and a locale-aware
  sitemap are generated from the same source

Components never import copy directly; the locale's content is passed down as a
prop from `src/app/[locale]/`.

## Brand assets

`scripts/build-assets.ps1` derives everything the site serves from the design
files in `Novos assets/`:

| Output | Source |
|---|---|
| `public/brand/dot-wordmark.png` | the DOT lockup, minus the ® |
| `public/brand/dot-mark.png` | the standalone O, the disc with the bolt |
| `public/images/globe.png` | `World.png`, used untouched |
| `public/images/og.png` | the full lockup composed on brand navy |
| `src/app/icon.png`, `apple-icon.png` | the O mark on a navy rounded square |

`scripts/ImgTool.ps1` is the measuring/cropping helper behind it — it was also
used to sample the palette in `src/app/[locale]/globals.css` straight from the
artwork.

The generated files are committed, because the script needs PowerShell and
`System.Drawing` and will not run on a Linux build agent. Re-run `npm run assets`
on Windows whenever the source art changes, and commit the result.

> If you replace a file in `public/images/` with the same name, delete `.next`
> before rebuilding. Next caches optimised images by URL and will keep serving
> the old render.

## Contact form

`POST /api/contact` validates with the same rules as the browser
(`src/lib/contact-schema.ts`), rate limits per IP, and drops submissions that
fill the honeypot field. Error messages are returned in the visitor's language.

Delivery is **not configured out of the box**. Set `CONTACT_WEBHOOK_URL` to a
Slack/Teams/Zapier style endpoint, or replace `deliver()` in
`src/app/api/contact/route.ts` with a transactional email provider. Until then
submissions are logged server-side and nothing leaves the server.

```bash
cp .env.example .env.local
```

The in-memory rate limiter is per instance. Move it to a shared store (Redis,
Upstash, Vercel KV) before relying on it across multiple instances.

## Before going live

- [ ] Replace the placeholders in `src/lib/brand.ts` — `url` and `contactEmail`
      feed the canonical URLs, sitemap, robots.txt, Open Graph tags and JSON-LD
- [ ] Configure `CONTACT_WEBHOOK_URL`
- [ ] Confirm the Portuguese tagline — "Venda em Angola. Receba globalmente."
      is a translation, not an approved brand line
- [ ] Add any social profiles beyond Instagram (`src/lib/brand.ts`)
- [ ] Replace `src/app/[locale]/documentation/` with the real developer docs

## Accessibility and verification

`scripts/check-console.mjs` loads pages in headless Chromium and fails on any
console error or warning, which is how hydration mismatches get caught.
`scripts/screenshot.mjs` captures both locales at mobile, tablet and desktop.

```bash
npm start &
node scripts/check-console.mjs http://localhost:3000 /en /pt
node scripts/screenshot.mjs http://localhost:3000
```

Use `localhost`, not `127.0.0.1` — `next dev` treats the latter as a
cross-origin request and refuses the hot-reload WebSocket.

## Notes

- The security headers and CSP live in `next.config.ts`. Development relaxes
  `unsafe-eval` and `ws:` because React's dev build and Turbopack's hot reload
  need them; production does not.
- Scroll reveals are progressive enhancement: content is visible by default and
  only animates once the inline bootstrap script in the layout has run.
- `Assets/` holds the retired KWAN artwork this project was rebranded from. It is
  no longer referenced by any code and can be deleted.
