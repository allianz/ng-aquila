import type { AbstractControl } from '@angular/forms';

import type { NxDateAdapter } from './adapter';
import { NxDateRangeValidators } from './date-validators';

describe('NxDateRangeValidators.filter', () => {
  const dateAdapter = {
    deserialize: (value: Date | null) => value,
    isDateInstance: (value: unknown) => value instanceof Date,
    isValid: (value: Date) => !Number.isNaN(value.getTime()),
  } as unknown as NxDateAdapter<Date>;
  const validate = NxDateRangeValidators.filter(
    dateAdapter,
    (date) => date !== null && date.getDate() % 2 === 0,
  );
  const control = (value: unknown) => ({ value }) as unknown as AbstractControl;

  it('does not reject an empty range because its endpoints are null', () => {
    expect(validate(control({ start: null, end: null }))).toBeNull();
  });

  it('filters only present endpoints', () => {
    expect(validate(control({ start: new Date(2026, 0, 2), end: null }))).toBeNull();
    expect(validate(control({ start: null, end: new Date(2026, 0, 3) }))).toEqual({
      nxDateRangeEndFilter: true,
    });
  });
});
