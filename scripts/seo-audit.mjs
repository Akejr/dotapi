/**
 * SEO audit. Fetches the rendered HTML of every page in every locale and asserts
 * the things that silently break and cost traffic.
 *
 *   node scripts/seo-audit.mjs [baseUrl]
 *
 * Exits non-zero on any FAIL, so it can gate a deploy. WARNs are judgement calls
 * worth a look but not worth blocking on.
 */

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');

const LOCALES = ['en', 'pt'];
const PATHS = ['/', '/documentation'];

/* Google truncates titles around 60 characters and descriptions around 160. */
const TITLE = { min: 20, max: 60 };
const DESCRIPTION = { min: 70, max: 160 };

let failures = 0;
let warnings = 0;

const fail = (page, message) => {
  failures += 1;
  console.log(`  FAIL  ${message}`);
  void page;
};
const warn = (message) => {
  warnings += 1;
  console.log(`  WARN  ${message}`);
};
const pass = (message) => console.log(`  ok    ${message}`);

const attr = (html, regex) => html.match(regex)?.[1] ?? null;
const decode = (value) =>
  value
    ?.replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>') ?? value;

async function fetchPage(url) {
  const response = await fetch(url, { redirect: 'manual' });
  return { status: response.status, headers: response.headers, html: await response.text() };
}

/* -------------------------------------------------------------------------- */

async function auditRedirect() {
  console.log(`\n${baseUrl}/  (root redirect)`);
  const { status, headers } = await fetchPage(`${baseUrl}/`);

  if (status === 308 || status === 301) pass(`permanent redirect (${status})`);
  else if (status === 307 || status === 302)
    fail('/', `root redirects with ${status}; use 308 so signals consolidate on the target`);
  else fail('/', `expected a redirect from /, got ${status}`);

  const location = headers.get('location');
  if (location?.endsWith('/en')) pass(`-> ${location}`);
  else fail('/', `root should land on /en, got ${location}`);
}

async function auditPage(locale, path) {
  const url = `${baseUrl}/${locale}${path === '/' ? '' : path}`;
  console.log(`\n${url}`);

  const { status, html } = await fetchPage(url);
  if (status !== 200) {
    fail(url, `status ${status}`);
    return;
  }

  /* -- title -- */
  const title = decode(attr(html, /<title>([^<]*)<\/title>/));
  if (!title) fail(url, 'no <title>');
  else if (title.length > TITLE.max)
    fail(url, `title is ${title.length} chars, will truncate (max ${TITLE.max}): "${title}"`);
  else if (title.length < TITLE.min) warn(`title is only ${title.length} chars: "${title}"`);
  else pass(`title ${title.length} chars: "${title}"`);

  /* -- description -- */
  const description = decode(attr(html, /<meta name="description" content="([^"]*)"/));
  if (!description) fail(url, 'no meta description');
  else if (description.length > DESCRIPTION.max)
    fail(url, `description is ${description.length} chars, will truncate (max ${DESCRIPTION.max})`);
  else if (description.length < DESCRIPTION.min)
    warn(`description is only ${description.length} chars`);
  else pass(`description ${description.length} chars`);

  /* -- indexability -- */
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  if (robots?.includes('noindex')) fail(url, `noindex present: ${robots}`);
  else pass(`indexable${robots ? ` (${robots})` : ''}`);

  /* -- single h1 -- */
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length === 1) pass('exactly one h1');
  else fail(url, `expected 1 h1, found ${h1s.length}`);

  /* -- heading order: no h3 before the first h2 -- */
  const firstH2 = html.search(/<h2[\s>]/);
  const firstH3 = html.search(/<h3[\s>]/);
  if (firstH3 !== -1 && firstH2 !== -1 && firstH3 < firstH2)
    warn('an h3 appears before the first h2; heading order is not nested');

  /* -- canonical -- */
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const expected = `${path === '/' ? `/${locale}` : `/${locale}${path}`}`;
  if (!canonical) fail(url, 'no canonical');
  else if (!/^https?:\/\//.test(canonical)) fail(url, `canonical is not absolute: ${canonical}`);
  else if (!canonical.endsWith(expected))
    fail(url, `canonical should end with ${expected}, got ${canonical}`);
  else pass(`canonical ${canonical}`);

  /* -- hreflang cluster -- */
  const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi)];
  const tags = alternates.map(([, tag]) => tag);
  for (const required of ['en', 'pt-AO', 'x-default']) {
    if (!tags.includes(required)) fail(url, `hreflang missing "${required}"`);
  }
  const selfTag = locale === 'pt' ? 'pt-AO' : 'en';
  const selfRef = alternates.find(([, tag]) => tag === selfTag)?.[2];
  if (selfRef && selfRef.endsWith(expected)) pass(`hreflang self-reference present (${selfTag})`);
  else if (tags.includes(selfTag)) fail(url, `hreflang "${selfTag}" does not point at this page`);
  if (tags.length) pass(`hreflang: ${tags.join(', ')}`);

  /* -- Open Graph + Twitter -- */
  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale']) {
    if (!html.includes(`property="${property}"`)) fail(url, `missing ${property}`);
  }
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (ogImage) {
    if (!/^https?:\/\//.test(ogImage)) fail(url, `og:image must be absolute: ${ogImage}`);
    /* The tag carries the production host; fetch the same path from whatever we
       are auditing so this works against localhost too. */
    const probe = `${baseUrl}${new URL(ogImage, baseUrl).pathname}`;
    const head = await fetch(probe, { method: 'HEAD' }).catch(() => null);
    if (head?.ok) pass(`og:image absolute and reachable (${ogImage})`);
    else fail(url, `og:image not reachable at ${probe}`);
  }
  if (html.includes('name="twitter:card"')) pass('twitter card present');
  else warn('no twitter:card');

  /* -- structured data -- */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) {
    fail(url, 'no JSON-LD');
  } else {
    const types = new Set();
    for (const [, raw] of blocks) {
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (error) {
        fail(url, `JSON-LD does not parse: ${String(error).slice(0, 80)}`);
        continue;
      }
      const nodes = parsed['@graph'] ?? [parsed];
      for (const node of nodes) {
        for (const type of [node['@type']].flat()) types.add(type);
      }
    }
    const required = path === '/'
      ? ['Organization', 'WebSite', 'Service', 'FAQPage', 'WebPage']
      : ['Organization', 'WebSite', 'Service', 'BreadcrumbList'];
    for (const type of required) {
      if (!types.has(type)) fail(url, `JSON-LD missing @type ${type}`);
    }
    pass(`JSON-LD: ${[...types].sort().join(', ')}`);
  }

  /* -- language -- */
  const lang = attr(html, /<html lang="([^"]*)"/);
  const expectedLang = locale === 'pt' ? 'pt-AO' : 'en';
  if (lang === expectedLang) pass(`html lang="${lang}"`);
  else fail(url, `html lang is "${lang}", expected "${expectedLang}"`);

  /* -- images must not be silently unlabelled -- */
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
  const missingAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  if (missingAlt.length) fail(url, `${missingAlt.length} <img> without an alt attribute`);
  else pass(`${imgs.length} images, all with alt`);

  return { url, title, description };
}

async function auditSitemap(seen) {
  console.log(`\n${baseUrl}/sitemap.xml`);
  const { status, html } = await fetchPage(`${baseUrl}/sitemap.xml`);
  if (status !== 200) {
    fail('sitemap', `status ${status}`);
    return;
  }

  const locs = [...html.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => loc);
  pass(`${locs.length} urls`);

  for (const { url } of seen) {
    const path = new URL(url).pathname;
    if (locs.some((loc) => new URL(loc).pathname === path)) pass(`listed: ${path}`);
    else fail('sitemap', `page not in sitemap: ${path}`);
  }

  if (html.includes('hreflang')) pass('declares hreflang alternates');
  else warn('sitemap has no hreflang alternates');

  const lastmods = [...html.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map(([, d]) => d);
  const today = new Date().toISOString().slice(0, 10);
  if (lastmods.every((d) => d.startsWith(today)))
    warn('every lastmod is today; if that is the build date rather than a content change, crawlers learn to ignore it');
}

async function auditRobots() {
  console.log(`\n${baseUrl}/robots.txt`);
  const { status, html } = await fetchPage(`${baseUrl}/robots.txt`);
  if (status !== 200) {
    fail('robots', `status ${status}`);
    return;
  }
  if (/Disallow:\s*\/\s*$/m.test(html)) fail('robots', 'robots.txt disallows the whole site');
  else pass('does not block the site');
  if (/Sitemap:/i.test(html)) pass('points at the sitemap');
  else fail('robots', 'no Sitemap directive');
}

/* -------------------------------------------------------------------------- */

console.log(`SEO audit — ${baseUrl}`);
await auditRedirect();

const seen = [];
for (const path of PATHS) {
  for (const locale of LOCALES) {
    const result = await auditPage(locale, path);
    if (result) seen.push(result);
  }
}

/* Duplicate titles and descriptions across locales mean one of them will be
   filtered out of the results as a near-duplicate. */
console.log('\nuniqueness');
for (const field of ['title', 'description']) {
  const values = seen.map((entry) => entry[field]);
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) fail('uniqueness', `duplicate ${field}: "${duplicates[0]}"`);
  else pass(`all ${field}s unique across ${values.length} pages`);
}

await auditSitemap(seen);
await auditRobots();

console.log(`\n${failures} failures, ${warnings} warnings`);
process.exit(failures > 0 ? 1 : 0);
