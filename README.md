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
| `npm run seo` | SEO audit against a running server (see below) |
| `npm run check-console` | Fail on any browser console error, incl. hydration |
| `npm run shots` | Screenshot both locales at mobile, tablet and desktop |
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

## SEO

The audience is companies outside Angola searching for how to accept Angolan
payments, so the page is optimised for that intent rather than for the brand name.

**Search-facing copy is separate from on-page copy.** `src/content/*.ts` has a
`seo` block per locale. The hero says "Sell in Angola. Get paid globally." because
that is brand voice; the `<title>` says "Angola Payments API — Multicaixa Express"
because that is what gets typed into Google. Titles are budgeted to 60 characters
and descriptions to 160 so neither is truncated in the result.

**Long-tail coverage.** The FAQ section answers the eight questions foreign teams
actually ask, using native `<details>` so the answers are in the DOM whether or
not they are expanded, and is emitted as `FAQPage` structured data from the same
source. Around 6,000 indexable words per locale.

**One entity graph, not scattered snippets.** `src/lib/structured-data.ts` emits a
single JSON-LD `@graph` per page with cross-referenced `@id`s, so the
`Organization` publishing the `WebSite` is provably the same entity that provides
the `Service` the page is about:

| Page | Types |
|---|---|
| Home | `Organization` + `FinancialService`, `WebSite`, `Service` (with the two local methods as an `OfferCatalog`), `WebPage`, `FAQPage`, `ImageObject` |
| Documentation | the same, plus `TechArticle` and `BreadcrumbList` |

**Internationalisation signals.** Reciprocal `hreflang` for `en`, `pt-AO` and
`x-default` in both the HTML and the sitemap, self-referencing canonicals, and
`og:locale` / `alternateLocale` per page. `x-default` points at `/en` directly
rather than at `/`, to avoid sending crawlers through a redirect.

**Crawl hygiene.** `/` is a **308** permanent redirect to `/en` so signals
consolidate on the target. `max-snippet: -1` and `max-image-preview: large` lift
Google's default caps. Sitemap `lastmod` comes from `CONTENT_UPDATED_AT` in
`src/lib/seo.ts` — bump it by hand when copy changes, because a lastmod that moves
on every deploy teaches crawlers to ignore it.

### Running the audit

```bash
npm run build && npm start &
npm run seo -- http://localhost:3000
```

It fetches every page in every locale and fails on: missing or over-length titles
and descriptions, `noindex`, a missing or non-self-referential canonical, an
incomplete or non-reciprocal `hreflang` cluster, a missing or unreachable
`og:image`, JSON-LD that does not parse or is missing an expected `@type`, more or
fewer than one `h1`, images without `alt`, duplicate titles across pages, and
pages absent from the sitemap.

> It earns its keep. It caught `og:image` silently vanishing from all four pages:
> Next's `generateMetadata` *replaces* the parent `openGraph` object instead of
> deep-merging it, so a page that sets `openGraph` without images drops the card
> inherited from the layout. Every page now builds its card through
> `ogImages()` in `src/lib/seo.ts`, with an absolute URL.

## Copy

`src/lib/brand.ts` is the single source for the live host
(`business.dotangola.com`) and the contact address
(`evandrocasanova@dotangola.com`). Canonicals, the sitemap, `robots.txt`, Open
Graph tags, JSON-LD and the documentation mailto all read from it.

House style: **no em dashes in visitor-facing copy.** Use a colon for an aside,
or split the sentence. Sentences are short, voice is active, and every section
leads with the benefit before the mechanism. The rule applies to
`src/content/*.ts` and component strings; code comments are unaffected.

## The hero

Desktop and mobile show different things, because the desktop diagram does not
survive the narrower column.

- The currency flow diagram (`PaymentFlow`) is **desktop only**. Its section id
  was removed along with it, so the header's "How it works" points at
  `#product`, a link that exists at every breakpoint.
- A WebGL noise field sits behind the hero at every breakpoint:
  `src/components/ui/ShaderBackground.tsx`, mounted by
  `src/components/sections/HeroShader.tsx`.

Opacity and masking are the only things that differ between the two, and they
live together in `.hero-shader` in `globals.css`:

| | Opacity | Mask |
|---|---|---|
| Mobile | 45% | fades out towards the bottom |
| Desktop (`lg`) | 34% | radial, anchored behind the copy column |

Desktop pulls back for two reasons. The section is several times the area, so the
same value reads much brighter across it, and the flow diagram's cards are
translucent with only a `backdrop-blur` between them and this layer, so an
unmasked field shows through their own backgrounds.

The effect is composited with `mix-blend-mode: screen`, which drops the shader's
black areas and lets only its blue filaments lift the navy. That is what makes it
read as texture rather than as a video playing behind the copy.

`prefers-reduced-motion` skips it entirely, and the check runs in JS rather than
CSS so the browser never creates a GL context it would only hide. The drawing
buffer is capped at 1.2 megapixels, because the fragment shader takes five noise
samples per pixel and a full-width hero at `dpr` 2 would otherwise ask for around
4M pixels a frame. Compile and link status are checked before the first frame, so
a driver that rejects the program leaves the hero untouched instead of painting a
black rectangle over it. Frames pause when the tab is hidden or the hero scrolls
out of view. Pointer tracking was dropped from the source effect: half the
audience has no cursor to drive it, and a backdrop that chases the pointer
competes with the copy in front of it.

Adapted from [Paper Shaders](https://github.com/paper-design/shaders)
(Apache-2.0).

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

- [ ] Configure `CONTACT_WEBHOOK_URL`
- [ ] Confirm the Portuguese tagline — "Venda em Angola. Receba globalmente."
      is a translation, not an approved brand line
- [ ] Add any social profiles beyond Instagram (`src/lib/brand.ts`)
- [ ] Replace `src/app/[locale]/documentation/` with the real developer docs

## Accessibility and verification

`scripts/check-console.mjs` loads pages in headless Chromium and fails on any
console error or warning, which is how hydration mismatches get caught. Its
`IGNORED` list drops messages about the harness rather than the page: headless
Chromium has no GPU, so it falls back to SwiftShader for the hero shader and says
so on every run. A failed shader compile or link reports differently and still
fails the check.
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
