import { _trustedHTML } from './trusted-types';

describe('_trustedHTML()', () => {
  const { trustedTypes } = window as unknown as {
    readonly trustedTypes: {
      isHTML(value: unknown): boolean;
    };
  };

  it('returns a TrustedHTML value', () => {
    expect(trustedTypes.isHTML(_trustedHTML('<svg></svg>'))).toBe(true);
  });

  it('keeps the HTML unchanged', () => {
    const html = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"></path></svg>';
    expect(String(_trustedHTML(html))).toBe(html);
  });
});
