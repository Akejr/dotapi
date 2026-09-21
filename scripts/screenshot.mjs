/**
 * Captures the built site so the implementation can be diffed against the design
 * files in /Assets. Dev-only utility.
 *
 *   node scripts/screenshot.mjs [baseUrl]
 *
 * Output lands in .tmp/shots/.
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

/* Use localhost, not 127.0.0.1: `next dev` treats the latter as a cross-origin
   dev request and refuses the hot-reload WebSocket upgrade. */
const baseUrl = process.argv[2] ?? 'http://localhost:3210';
const outDir = '.tmp/shots';

const targets = [
  { name: 'desktop-home', path: '/en', width: 1440, height: 1000 },
  { name: 'desktop-home-pt', path: '/pt', width: 1440, height: 1000 },
  { name: 'mobile-home', path: '/en', width: 390, height: 844 },
  { name: 'mobile-home-pt', path: '/pt', width: 390, height: 844 },
  { name: 'tablet-home', path: '/en', width: 834, height: 1112 },
  { name: 'desktop-docs', path: '/en/documentation', width: 1440, height: 1000 },
  { name: 'desktop-docs-pt', path: '/pt/documentation', width: 1440, height: 1000 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const target of targets) {
  const context = await browser.newContext({
    viewport: { width: target.width, height: target.height },
    deviceScaleFactor: 1,
    /* Freeze the reveal animations so captures are deterministic. */
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.goto(`${baseUrl}${target.path}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  await page.screenshot({ path: `${outDir}/${target.name}.png`, fullPage: true });

  /* Section-level captures make it easier to compare details side by side. */
  if (target.name === 'desktop-home') {
    for (const [label, selector] of [
      ['hero', 'section:first-of-type'],
      ['product', '#product'],
      ['benefits', '#benefits'],
      ['bridge', '#bridge'],
      ['contact', '#contact'],
      ['footer', 'footer'],
    ]) {
      const element = page.locator(selector).first();
      if (await element.count()) {
        await element.screenshot({ path: `${outDir}/desktop-${label}.png` });
      }
    }
  }

  console.log(
    `${target.name.padEnd(14)} ${target.width}x${target.height}` +
      (errors.length ? `  console errors: ${errors.length}` : '  clean'),
  );
  for (const error of errors) console.log(`   ! ${error}`);

  await context.close();
}

await browser.close();
console.log(`\nSaved to ${outDir}/`);
