/**
 * Teaches zone.js about Vitest's `describe`/`it`/`beforeEach`/... globals so that
 * `fakeAsync`, `tick` and `flush` keep working.
 *
 * This MUST be a `setupFiles` entry and not a `polyfills` entry. The unit-test
 * builder loads setup files in the order
 * `['polyfills.js', 'init-testbed.js', 'vitest-mock-patch.js', ...setupFiles]`,
 * and the patch needs both `zone.js` (from polyfills) and `zone.js/testing`
 * (emitted into `init-testbed.js`) to be loaded already — otherwise it throws
 * `Missing ProxyZoneSpec`.
 */
import 'zone.js/plugins/vitest-patch';

if (!(globalThis as any).Zone) {
  throw new Error(
    '[test-setup] zone.js is not loaded. Check that the `test-build` target still has `"polyfills": ["zone.js"]`.',
  );
}

// The patch silently does nothing when the `vitest` global is missing, so assert
// the marker it sets on success rather than trusting the bare import.
if (!(globalThis as any).vitest?.['__zone_patch__']) {
  throw new Error(
    '[test-setup] zone.js/plugins/vitest-patch did not apply. This usually means the setup file ' +
      'ordering changed and it now runs before zone.js/testing.',
  );
}
