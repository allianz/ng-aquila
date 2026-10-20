import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

// Playwright collects the tests before the server answers, so the page ids are read from the source.
// Importing the file instead would pull in every Angular example.
const PAGE_IDS = Array.from(
  readFileSync(join(__dirname, '../src/app/playground-pages.ts'), 'utf8').matchAll(
    /^\s+id: '([^']+)',$/gm,
  ),
  (m) => m[1],
);
if (PAGE_IDS.length === 0) {
  throw new Error('No page ids found in src/app/playground-pages.ts.');
}

// Written by `provideSsrErrorReporting()` in src/app/ssr-errors.ts.
const SERVER_ERRORS = /<script type="application\/json" id="ssr-errors">(.*?)<\/script>/s;
const EXAMPLE_SECTION = /<section[^>]*\sclass="example"/;
const NAN_ATTRIBUTE = /[\w\-:]+="[^"]*\bNaN[^"]*"/g;
const HYDRATION_STATS =
  /Angular hydrated \d+ component\(s\) and \d+ node\(s\), (\d+) component\(s\) were skipped/;

test('the nav links every page', async ({ request }) => {
  const html = await (await request.get('/')).text();
  const linked = new Set(Array.from(html.matchAll(/href="\/page\/([^"]+)"/g), (m) => m[1]));
  expect([...linked].sort()).toEqual([...PAGE_IDS].sort());
});

for (const id of PAGE_IDS) {
  test(id, async ({ page, baseURL }) => {
    const problems: string[] = [];
    let skippedComponents: number | undefined;

    page.on('pageerror', (error) => problems.push(`browser error: ${error.message}`));
    page.on('console', (message) => {
      const text = message.text();
      const stats = HYDRATION_STATS.exec(text);
      if (stats) {
        skippedComponents = Number(stats[1]);
      } else if (message.type() === 'error') {
        // A missing file on another host (e.g. a YouTube thumbnail on `video`) is not our code.
        const external =
          text.startsWith('Failed to load resource') &&
          !message.location().url.startsWith(baseURL ?? '');
        if (!external) {
          problems.push(`console error: ${text.split('\n')[0]}`);
        }
      } else if (message.type() === 'warning' && /NG0\d+/.test(text)) {
        problems.push(`console warning: ${text.split('\n')[0]}`);
      }
    });

    // Not `load`: that also waits for images from other hosts, e.g. YouTube thumbnails on `video`.
    const response = await page.goto(`/page/${id}`, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), 'HTTP status').toBe(200);
    const html = (await response?.text()) ?? '';
    expect(EXAMPLE_SECTION.test(html), 'page renders an example').toBe(true);

    const serverErrors = SERVER_ERRORS.exec(html);
    if (!serverErrors) {
      problems.push('server error: no #ssr-errors element in the HTML');
    } else {
      for (const error of JSON.parse(serverErrors[1]) as string[]) {
        problems.push(`server error: ${error}`);
      }
    }
    for (const [attribute] of html.matchAll(NAN_ATTRIBUTE)) {
      problems.push(`NaN in server HTML: ${attribute}`);
    }

    await page
      .waitForSelector('html[data-ssr-stable]', { state: 'attached', timeout: 15_000 })
      .catch(() => problems.push('browser error: the app never became stable'));
    // Catches a same-origin file that fails after the app is stable. Capped for slow third-party images.
    await page.waitForLoadState('load', { timeout: 5_000 }).catch(() => {});

    if (skippedComponents === undefined) {
      problems.push('hydration: no hydration stats were logged, so the page did not hydrate');
    } else if (skippedComponents > 0) {
      problems.push(`hydration: ${skippedComponents} component(s) were skipped`);
    }

    expect(problems, 'problems').toEqual([]);
  });
}
