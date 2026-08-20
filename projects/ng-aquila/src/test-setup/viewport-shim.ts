/**
 * Replacement for the `viewport` global that `karma-viewport` used to provide.
 *
 * karma-viewport resized the iframe that Karma ran the specs in. Vitest's browser
 * mode also runs each spec file inside a same-origin iframe (`window.frameElement`
 * is reachable and is the `<iframe>` in the Vitest Browser Runner page), so the
 * shim does exactly the same thing: set an explicit pixel width/height on that
 * iframe. Reading a layout property afterwards forces a synchronous reflow, so by
 * the time `set()` returns both `window.innerWidth` and real layout
 * (`clientWidth`, `getBoundingClientRect()`, `getComputedStyle`) reflect the new
 * size.
 *
 * Overriding `window.innerWidth` alone would not be enough: `NxViewportService`
 * only reads `innerWidth`, but the comparison-table specs measure real element
 * rects, and those only change if the layout viewport actually shrinks.
 *
 * Being synchronous matters: these calls happen inside `fakeAsync` blocks, so
 * Vitest's async `page.viewport()` is not usable here.
 *
 * Note this deliberately does NOT dispatch a `resize` event — the specs dispatch
 * their own, and a second event would break the throttle-boundary assertions in
 * `utils/viewport.service.spec.ts`.
 *
 * The frame size is real browser state, not module state, so nothing resets it on its
 * own: a `viewport.set('mobile')` stays in effect for every following test until
 * something changes it back. `set()` therefore queues its own undo — see
 * `resetAfterCurrentTest`.
 */
import { onTestFinished } from 'vitest';

interface ViewportSize {
  width: number;
  height: number;
}

/** Same breakpoints the root `karma.conf.js` used to configure. */
const BREAKPOINTS: { [name: string]: ViewportSize } = {
  mobile: { width: 320, height: 480 },
  tablet: { width: 704, height: 1024 },
  desktop: { width: 1184, height: 900 },
};

/**
 * `window.frameElement` comes from the parent document, so it is an instance of the
 * parent* realm's `HTMLIFrameElement` and `instanceof` against ours would always be
 * false. Duck-type on `style` instead.
 */
function hostFrame(): HTMLElement {
  const frame = window.frameElement as HTMLElement | null;
  if (!frame?.style) {
    throw new Error(
      '[test-setup] `viewport` needs the spec to run inside a same-origin iframe, which is how ' +
        "Vitest's browser mode runs it. Check that `browsers` still targets a real browser.",
    );
  }
  return frame;
}

/**
 * The frame's own inline size, captured before we ever touch it, so `reset()` restores
 * whatever the runner set (`width: 100%`) rather than a hardcoded pixel guess.
 */
const DEFAULT_FRAME_SIZE = {
  width: hostFrame().style.width,
  height: hostFrame().style.height,
};

function applySize(width: string, height: string): void {
  const frame = hostFrame();
  frame.style.width = width;
  frame.style.height = height;
  // Force a synchronous reflow so the caller sees the new size immediately.
  void frame.offsetWidth;
}

/**
 * Queues the reset for the end of the currently running test.
 *
 * This has to be `onTestFinished` rather than a module-level `afterEach`. Setup files are
 * evaluated once per browser realm and the runner reuses that realm across spec files, so
 * an `afterEach` registered at module scope attaches only to the suite being collected at
 * that moment and silently stops running for every later file in the realm — verified: in
 * a 30-file run the module was evaluated once and its `afterEach` fired for exactly one
 * spec file. `onTestFinished` registers against the test that is actually executing, so it
 * cannot be orphaned that way. It also runs after the spec's own `afterEach`, which is
 * where a teardown belongs.
 *
 * Registering from `set()` keeps this to one hook per test that actually resizes, and all
 * 93 call sites are inside an `it`/`beforeEach`/`afterEach`, so a test is always active.
 */
function resetAfterCurrentTest(): void {
  onTestFinished(() => {
    applySize(DEFAULT_FRAME_SIZE.width, DEFAULT_FRAME_SIZE.height);
  });
}

const viewport = {
  /** Sets the viewport to a named breakpoint or to explicit dimensions. */
  set(widthOrBreakpoint: number | string, height?: number): void {
    resetAfterCurrentTest();

    if (typeof widthOrBreakpoint === 'string') {
      const breakpoint = BREAKPOINTS[widthOrBreakpoint];
      if (!breakpoint) {
        throw new Error(
          `[test-setup] Unknown viewport breakpoint '${widthOrBreakpoint}'. ` +
            `Known breakpoints: ${Object.keys(BREAKPOINTS).join(', ')}.`,
        );
      }
      applySize(`${breakpoint.width}px`, `${breakpoint.height}px`);
      return;
    }

    applySize(
      `${widthOrBreakpoint}px`,
      height === undefined ? DEFAULT_FRAME_SIZE.height : `${height}px`,
    );
  },

  /** Restores the viewport size the runner started the frame with. */
  reset(): void {
    applySize(DEFAULT_FRAME_SIZE.width, DEFAULT_FRAME_SIZE.height);
  },
};

(globalThis as any).viewport = viewport;
