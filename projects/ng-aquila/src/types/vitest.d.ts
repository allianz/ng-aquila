/**
 * Types for the custom matcher and globals registered in `src/test-setup/`.
 *
 * The `import 'vitest'` is required: without a top-level import this file would
 * be an ambient script, and `declare module 'vitest'` would then *replace* the
 * real module declaration instead of augmenting it.
 */
import 'vitest';

interface CustomMatchers<R = unknown> {
  /** Runs axe-core against the element and fails with the list of violations. */
  toBeAccessible(): Promise<R>;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<T = any> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends CustomMatchers<T> {}
}

declare global {
  /** Provided by `src/test-setup/viewport-shim.ts`, replacing `karma-viewport`. */
  const viewport: {
    set(widthOrBreakpoint: number | string, height?: number): void;
    reset(): void;
  };
}
