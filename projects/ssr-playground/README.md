# SSR playground

An Angular SSR app that renders ng-aquila's documentation examples on the server and hydrates them in
the browser, so server-render failures (a component touching `window`, `document`,
`ResizeObserver` or layout APIs on Node) and hydration mismatches become visible. It builds against
the library **source**, so a fix shows up as soon as you save it.

`PLAYGROUND_PAGES` in `src/app/playground-pages.ts` is a hand-written list of one simple example per
group — 85 examples, 81 pages. A new example group reports nothing until you add an import and an
entry. Three kept examples are the **sole reproducer** of a fixed failure, so they are the regression
guard for it and must not be dropped: `dropdown/multi-select`, `datefield/datemask-basic`,
`number-stepper/number-stepper-auto-resizing`.

## Running it

```bash
npm run start:ssr-playground                             # dev server, SSR + hydration, :4200
npm run build:ssr-playground                             # production build into dist/ssr-playground
node dist/ssr-playground/server/server.mjs  # run that build on :4000
```

## Reading the results

```bash
node projects/ssr-playground/tools/sweep.mjs       # BASE=http://localhost:4000 by default
```

The sweep requests `/` plus all 81 pages and asserts each returns 200 **and** mounts at least one
`<section class="example">` — an empty page still returns a valid 200, which hid 23 blank pages during
the original trim.

Neither check says anything about render *correctness*: Angular catches most render errors and still
returns HTML, so **read the server log** — a green sweep is consistent with the errors below.
Hydration errors only appear in a browser console, and nothing checks those automatically.

## Current state

With the SSR fixes (#2031–#2038) merged, all 81 pages return 200 with 85 examples mounted and the
server log carries **one** render error:

| Component | Where | Failure | Page | Status |
| --- | --- | --- | --- | --- |
| `NxComparisonTable` | constructor | `ReferenceError: ResizeObserver is not defined` | `comparison-table` | open; fix not merged yet |
| `NxPhoneInput` | `i18n-iso-countries` import | `Cannot find module './langs/br.json'` | none; unregistered | open, and unmeasured — see below |

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

### `NxPhoneInput`: is being left out

`@allianz/ng-aquila/phone-input` is the only entry point importing `i18n-iso-countries`, which makes a
working dev server impossible, so the group is left out of `PLAYGROUND_PAGES` entirely — its errors are
not in the counts above.

`i18n-iso-countries` is CommonJS and its `main` (`entry-node.js`) loops over every locale doing
`require("./langs/" + locale + ".json")`. The specifier is fully dynamic, so Vite's prebundle resolves
it against the cache directory and the first locale throws before any component renders. Excluding the
package from prebundling is worse: it then gets bundled into the app, `index.js` opens with
`require("diacritics")`, esbuild's `__require` shim throws during bootstrap, and **every route becomes
non-interactive** — server HTML paints, the client bundle dies, and the server log says nothing.

Any one of these fixes it: import `i18n-iso-countries/index.js` (the path browsers already get) instead
of the package root; load the country list lazily behind the first call that needs it; or replace the
dependency with `libphonenumber-js`, already a workspace dependency. Until then, consumers doing SSR
must keep `nx-phone-input` off server-rendered routes.

## Not failures

- Viewport-adaptive components render their **desktop** branch on the server (`NxViewportService`
  returns `EMPTY` outside a browser) and correct themselves after hydration. `nx-multi-select` likewise
  shows a preselected value only once hydrated.
- **`/page/radio-button` looks unstyled.** Neither example preselects a value, and an unchecked
  `nx-radio` is by design an empty ring. Clicking one renders `.nx-radio__dot`.
- **`nx-icon` renders no glyph** and pages carry no brand theme — both ship with ngx-brand-kit, which
  this app does not pull in. Components branching on the `ALLIANZ_ONE` token are therefore untested.
- **`NG0912` component ID collision** on every page: `_SimpleMessageToastComponent` and
  `_SimpleModalComponent` share the `ng-component` selector. Real, but unrelated to SSR.
