import { SignalErrorStateMatcher } from './signal-error-state-matcher';

describe('SignalErrorStateMatcher', () => {
  let matcher: SignalErrorStateMatcher;

  beforeEach(() => {
    matcher = new SignalErrorStateMatcher();
  });

  it('should create an instance', () => {
    expect(matcher).toBeTruthy();
  });

  it('should return false on a valid untouched field', () => {
    expect(matcher.isErrorState({ invalid: false, touched: false })).toBe(false);
  });

  it('should return false on a valid touched field', () => {
    expect(matcher.isErrorState({ invalid: false, touched: true })).toBe(false);
  });

  it('should return false on an invalid untouched field', () => {
    expect(matcher.isErrorState({ invalid: true, touched: false })).toBe(false);
  });

  it('should return true on an invalid touched field', () => {
    expect(matcher.isErrorState({ invalid: true, touched: true })).toBe(true);
  });
});
