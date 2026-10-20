# SSR playground

An Angular SSR app that renders ng-aquila's documentation examples on the server and hydrates them in
the browser, so server-render failures (a component touching `window`, `document`,
`ResizeObserver` or layout APIs on Node) and hydration mismatches become visible. It builds against
the library **source**, so a fix shows up as soon as you save it.

`PLAYGROUND_PAGES` in `src/app/playground-pages.ts` is a hand-written list of one simple example per
group — 87 examples, 82 pages. A new example group reports nothing until you add an import and an
entry. Three kept examples are the **sole reproducer** of a fixed failure, so they are the regression
guard for it and must not be dropped: `dropdown/multi-select`, `datefield/datemask-basic`,
`number-stepper/number-stepper-auto-resizing`.

## Running it

```bash
npm run start:ssr-playground       # dev server, SSR + hydration, :4200
npm run build:ssr-playground       # production build into dist/ssr-playground
node dist/ssr-playground/server/server.mjs  # run that build on :4000
```

## Testing it

```bash
npm run test:ssr-playground        # `ng e2e`: starts `ng serve` on :4310 and runs Playwright
```

`ng e2e` uses the `playwright-ng-schematics` builder. It starts the `serve:e2e` configuration, runs
`playwright test` with `playwright.config.ts`, and stops the server again. `e2e/ssr.e2e.ts` has one
test per entry in `PLAYGROUND_PAGES`, so a new page is tested without further work. A separate test
checks that the nav links every page. Each page loads in Chromium. A page fails when:

- the response is not 200, or it has no `<section class="example">`
- the server `ErrorHandler` caught an error (`src/app/ssr-errors.ts` writes them into the HTML)
- an attribute in the server HTML contains `NaN`, e.g. `style="width: NaNpx"`
- the browser throws, logs a console error (except a failed load from another host), or logs an
  `NG0` warning
- the app never becomes stable, or Angular does not log hydration stats, or skips a component

The run also fails when the server catches an `uncaughtException` or `unhandledRejection`. That is
an error thrown from a timer after the render was sent, so no page can report it. `server.ts`
collects these errors and serves them on `/__ssr-playground/errors`, and `e2e/global-teardown.ts`
fails the run if that list is not empty.

The test uses `ng serve` because Angular logs hydration stats and full `NG0` messages only in dev
mode, and because it is the server developers use. It does not run the production-style
`server.ts` entry (`node dist/ssr-playground/server/server.mjs`).

To test a server that is already running, for example `npm run start:ssr-playground`:

```bash
SSR_PLAYGROUND_URL=http://localhost:4200 npx playwright test --config projects/ssr-playground/playwright.config.ts
```

On CI, a failed run uploads the Playwright report with screenshots and traces as the
`ssr-playground-report` artifact. Open it with `npx playwright show-report <folder>`.

### Regression set

These seven failed before the fixes landed. Each row's page is what catches a regression, and the
error counts are from that pre-fix run, as a sense of scale.

| Component | Failure before the fix | Kind | Errors | Page | Fix |
| --- | --- | --- | --- | --- | --- |
| `NxDropdown`, `NxMultiSelect` | `_updateTooltipText` — `TypeError: object is not iterable` | **killed the process** | 17 | `dropdown`, `surface` | #2036 |
| `NxSlider` | `_updateLabelPosition` — `getBoundingClientRect is not a function` | **killed the process** | 4 | `slider`, `rtl` | #2038 |
| `NxDatemask` | `shouldSeparatorBeGrayed` — `document is not defined` | caught | 2 | `datefield` | #2033 |
| `NxAutoResizeDirective` | `updateInputWidth` — `Error: NotYetImplemented` | caught | 2 | `number-stepper` | #2034 |
| `NxContextMenuTrigger` | constructor — `document is not defined` | caught | 1 | `context-menu` | #2032 |
| `NxMessageToastService` | `_initializeWrapper` — `document is not defined` | caught | 1 | `file-uploader` | #2035 |
| `nx-sidebar` | silently emitted `style="width: NaNpx"` | **silent** | 0 | every page, via the app shell | #2037 |

**Kind is the column that mattered.** The "killed the process" rows threw from a `setTimeout` firing
after the render was handed back, so they escaped Angular's per-component handling and would take down
a consumer's Node process — 21 of the 30 errors. The caught ones only degraded one component's HTML.

`nx-sidebar` is why a clean error log is not proof of anything: it never threw. Grep the log for
`NaNpx` as well as for `ERROR`.

Every failure was server-side only. Spot checks in a real browser produced no hydration mismatch and
no console errors, so the client recovered silently and none of it was visible to someone testing in a
browser.

## Not failures

- Viewport-adaptive components render their **desktop** branch on the server (`NxViewportService`
  returns `EMPTY` outside a browser) and correct themselves after hydration. `nx-multi-select` likewise
  shows a preselected value only once hydrated.
- **`/page/radio-button` looks unstyled.** Neither example preselects a value, and an unchecked
  `nx-radio` is by design an empty ring. Clicking one renders `.nx-radio__dot`.
- **`nx-icon` renders no glyph** and pages carry no brand theme — both ship with ngx-brand-kit, which
  this app does not pull in. Components branching on the `ALLIANZ_ONE` token are therefore untested.
