/**
 * Restores spies before every test, the way Jasmine did.
 *
 * Jasmine removed every `spyOn` at the end of the spec that installed it.
 * Vitest does not: `vi.spyOn` leaves the spy in place, and a second `vi.spyOn`
 * on the same object/key returns the *existing* spy with its call history
 * intact. Without this, a spy installed in a `beforeEach` accumulates calls
 * across specs.
 *
 * `restoreMocks: true` is the idiomatic way to express this, but it is a Vitest config
 * option and the `unit-test` builder's schema has no equivalent; the only other way to
 * reach the underlying config — `runnerConfig` — makes the builder skip its dependency
 * validation. `vi.setConfig` writes to that same live config object, so setting the flag
 * here has exactly the effect the config file would have had.
 *
 * This is deliberately not an `afterEach`. Setup files are evaluated once per browser realm
 * and, with the builder's default `isolate: false`, the runner reuses one realm for the
 * whole run — so a hook registered at module scope attaches only to the suite being
 * collected at that moment. The config flag has no such limitation: the runner applies it
 * itself in `onBeforeTryTask`, ahead of every test. See `ng-aquila/src/test-setup/restore-mocks.ts`,
 * which hit this same defect first.
 *
 * Note this covers `vi.spyOn`/`vi.fn` only. A global replaced with `vi.stubGlobal` needs
 * `vi.unstubAllGlobals()`, which is not settable through `vi.setConfig`, so specs that stub
 * a global have to undo it themselves.
 */
import { vi } from 'vitest';

vi.setConfig({ restoreMocks: true });
