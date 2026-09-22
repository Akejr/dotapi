/**
 * Loads pages and reports every console message and page error, so hydration
 * mismatches and other runtime warnings cannot slip through unnoticed.
 *
 *   node scripts/check-console.mjs [baseUrl] [path...]
 *
 * Use localhost, not 127.0.0.1: `next dev` treats the latter as a cross-origin
 * dev request and refuses the hot-reload WebSocket upgrade.
 */
import { chromium } from 'playwright';

const [, , baseArg, ...pathArgs] = process.argv;
const baseUrl = baseArg ?? 'http://localhost:3000';
const paths = pathArgs.length > 0 ? pathArgs : ['/'];

/**
 * Messages that say something about the test environment rather than the page.
 *
 * The WebGL entries are headless Chromium complaining about itself: with no GPU
 * it falls back to SwiftShader and logs that plus driver performance notes. The
 * hero shader would otherwise fail every run on a machine that has a GPU sitting
 * right there. Anything the shader itself gets wrong, a failed compile or link or
 * a lost context, surfaces as a different message and still fails the check.
 */
const IGNORED = [
  '/_next/hmr',
  'Download the React DevTools',
  'Automatic fallback to software WebGL',
  'GroupMarkerNotSet',
  'GL Driver Message',
  'SwiftShader',
];

const browser = await chromium.launch();
let failures = 0;

for (const path of paths) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const messages = [];
  page.on('console', (message) => {
    const type = message.type();
    if (type === 'error' || type === 'warning') messages.push(`[${type}] ${message.text()}`);
  });
  page.on('pageerror', (error) => messages.push(`[pageerror] ${String(error)}`));

  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
  /* Give React time to finish hydrating and report any mismatch. */
  await page.waitForTimeout(1500);

  const noise = messages.filter((m) => !IGNORED.some((pattern) => m.includes(pattern)));

  if (noise.length === 0) {
    console.log(`PASS  ${path}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${path}  (${noise.length})`);
    for (const message of noise) {
      console.log(
        message
          .split('\n')
          .map((line) => `        ${line}`)
          .join('\n'),
      );
    }
  }

  await context.close();
}

await browser.close();
process.exit(failures > 0 ? 1 : 0);
