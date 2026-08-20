# Project Notes

## Overview
ng-aquila is an Angular component library supporting the Allianz design system.

## Project Structure
- `projects/ng-aquila/src/` - Main library source code
- Components are organized in folders by feature (e.g., `dropdown/`, `virtual-scroll/`)
- Each component typically has:
  - `*.ts` - Component logic
  - `*.html` - Template
  - `*.scss` - Styles
  - `*.spec.ts` - Tests
  - `*.md` - Documentation
- example components for the documentation are in `projects/ng-aquila/documentation/examples
  - they are organized per component (entry-point) as the main folder and then each example in a subfolder
  - they can be used by name with a placeholder in the markdown file, e.g. `<!-- example(virtual-scroll-basic) -->`

## Running Tests

Tests run on Vitest in browser mode (headless Chromium via Playwright). zone.js is still
in use, so `fakeAsync` / `tick` / `flush` / `waitForAsync` all work as before.

### Run tests for a specific component
`--include` globs are relative to the project source root, and brace expansion works.
```bash
npx ng test ng-aquila --include="virtual-scroll/**/*.spec.ts" --watch=false
npx ng test ng-aquila --include="{dropdown,autocomplete}/**/*.spec.ts" --watch=false
```

### Run all library tests
```bash
npx ng test ng-aquila --watch=false
```

### Writing tests
- Spec files run one after another, never in parallel, but they **share one browser realm**:
  with `isolate: false` (the builder default, chosen to match Karma) the runner reuses a
  single iframe for the whole run. Anything you put on `window`/`globalThis`, and the iframe
  size itself, therefore outlives the file that set it. Clean up after yourself in the spec
  that made the mess.
- Because of that shared realm, **a `beforeEach`/`afterEach` registered at the top level of
  a `setupFiles` module only covers one spec file.** Setup modules are evaluated once per
  realm, so such a hook binds to whichever suite was being collected at that moment and
  silently does nothing for every other file — measured on a 30-file run: one evaluation,
  hooks fired for 18 of 647 tests. For per-test teardown in a setup file, either set a
  runtime config flag the runner applies itself (`vi.setConfig({ restoreMocks: true })`, see
  `test-setup/restore-mocks.ts`) or register from within the running test via
  `onTestFinished` (see `test-setup/viewport-shim.ts`). Hooks written inside a `.spec.ts`
  are unaffected — those are re-registered every time the file is collected.
- Shared test helpers belong in a `*.test-utils.ts` file rather than being exported from a
  `.spec.ts`. Importing one spec from another makes the same suite run twice and, under
  some conditions, makes the imported file report "No test suite found in file".
- The default `testTimeout` is 15s. A whole-suite run on a loaded machine can push slow
  specs past it, so a batch of `Test timed out in 15000ms` failures usually means the
  machine was busy, not that the specs regressed — re-run before investigating.
- `vi.mock` throws for relative paths (the `angular:vitest-mock-patch` plugin). Use
  TestBed provider overrides instead.
- Prefer a plain `async` test with `await fixture.whenStable()` over `fakeAsync` for new
  tests. `fakeAsync` with an `async` body does work (zone identity survives the `await`,
  and `tick()` afterwards still drains the fake timer queue), but mixing the two makes it
  much harder to tell which clock a given line advances.
- `expect(x).toMatch('foo')` is a literal substring check, not a regex. Pass a `RegExp`
  when you mean one.
- Mocks are restored automatically after each test (`test-setup/restore-mocks.ts`), so
  spies do not need manual cleanup. This covers `vi.spyOn`/`vi.fn` only — a global you
  replace by hand or with `vi.stubGlobal` has to be put back by the spec that changed it.
  Note Vitest's `vi.spyOn` differs from Jasmine's
  `spyOn` in that it calls through by default — add an explicit `.mockReturnValue(…)` to
  stub.
- A pending `ngModel` write-back needs `fakeAsync` plus `flushMicrotasks()`.
- `document.hasFocus()` is `false` inside the runner iframe; don't assert on it.
- The global `viewport.set('mobile' | 'tablet' | 'desktop')` / `viewport.set(width, height)`
  / `viewport.reset()` shim (`test-setup/viewport-shim.ts`) replaces `karma-viewport`. It
  resizes the iframe the spec runs in and forces a synchronous reflow, so both
  `window.innerWidth` and real layout are up to date when it returns. It does not
  dispatch a `resize` event — do that in the spec.
- `test-setup/axe-matcher.ts` registers `toBeAccessible()` (axe-core under the hood), used as
  `await expect(fixture.nativeElement).toBeAccessible()`. It must run in a plain `async` test,
  never `fakeAsync` — the matcher itself is async and can't be awaited inside a fake-async zone.
- No spec uses `fixture.componentRef.setInput()`; the convention for signal `input()`s is
  binding to a plain property on an inline test-host component and calling
  `fixture.detectChanges()`. Angular v22 defaults new `@Component`s to `OnPush`, so inline
  test-host components need explicit `changeDetection: ChangeDetectionStrategy.Eager` for that
  mutate-then-`detectChanges()` idiom to keep working without `markForCheck()`.

## Building

### Build the library
```bash
npx ng build ng-aquila
```

## Component Patterns
- Uses Angular signals for reactive state
- Components use `ChangeDetectionStrategy.OnPush`
- Input properties use the `input()` function (signal-based inputs)
- Output events use the `output()` function
- View queries use `viewChild()` / `viewChildren()`

## Naming Conventions
- Protected variables must be prefixed with an underscore (e.g., `protected _myVariable`)
