import { fakeAsync, tick } from '@angular/core/testing';

/**
 * Guards the zone.js <-> Vitest wiring. If these fail, the `setupFiles` order in
 * the `test` target or the `polyfills` of the `test-build` target has drifted,
 * and every `fakeAsync` spec in the suite is affected.
 */
describe('zone.js/Vitest integration', () => {
  it('applies the vitest patch', () => {
    expect((globalThis as any).vitest.__zone_patch__).toBe(true);
  });

  it('runs specs inside a ProxyZone', () => {
    expect(Zone.current.name).toContain('ProxyZone');
  });

  it('supports fakeAsync and tick', fakeAsync(() => {
    let fired = false;
    setTimeout(() => (fired = true), 500);

    tick(499);
    expect(fired).toBe(false);

    tick(1);
    expect(fired).toBe(true);
  }));
});
