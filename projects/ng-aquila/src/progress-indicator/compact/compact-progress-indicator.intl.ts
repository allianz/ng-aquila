import { Injectable, signal } from '@angular/core';

import { NxMultiProgressIndicatorIntl } from '../multi/multi-progress-indicator.intl';

@Injectable({ providedIn: 'root' })
export class NxCompactProgressIndicatorIntl extends NxMultiProgressIndicatorIntl {
  /** Builds the "X of Y" counter */
  readonly stepCounterLabel = signal((current: number, total: number) => `${current} of ${total}`);

  /** Button label, read after the counter: "2 of 3 steps" */
  readonly expandLabel = signal('steps');
}
