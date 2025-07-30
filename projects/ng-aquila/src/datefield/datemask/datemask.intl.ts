import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NxDatemaskIntl {
  /** ARIA label for the day input field (used by screen readers) */
  readonly dayInputAriaLabel = signal('Day');

  /** ARIA label for the month input field (used by screen readers) */
  readonly monthInputAriaLabel = signal('Month');

  /** ARIA label for the year input field (used by screen readers) */
  readonly yearInputAriaLabel = signal('Year');

  readonly dayInputPlaceholder = signal('dd');
  readonly monthInputPlaceholder = signal('mm');
  readonly yearInputPlaceholder = signal('yyyy');
}
