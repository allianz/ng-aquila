import { nxOptionalBooleanAttribute } from './coercion.functions';

describe('nxOptionalBooleanAttribute()', () => {
  // Coercing the unset case to `false` would make every adopter shadow its fallback.
  it('passes an unset value through instead of coercing it to false', () => {
    expect(nxOptionalBooleanAttribute(undefined)).toBeUndefined();
    expect(nxOptionalBooleanAttribute(null)).toBeUndefined();
  });

  it('coerces everything else like booleanAttribute', () => {
    expect(nxOptionalBooleanAttribute(true)).toBe(true);
    expect(nxOptionalBooleanAttribute('')).toBe(true);
    expect(nxOptionalBooleanAttribute('anything')).toBe(true);
    expect(nxOptionalBooleanAttribute(false)).toBe(false);
    expect(nxOptionalBooleanAttribute('false')).toBe(false);
  });
});
