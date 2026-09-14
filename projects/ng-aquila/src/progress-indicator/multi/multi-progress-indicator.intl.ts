import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NxMultiProgressIndicatorIntl {
  /** Visually-hidden prefix announced before a completed step's label */
  readonly completedLabel = signal('Completed: ');

  /** Visually-hidden prefix announced before the current step's label */
  readonly currentLabel = signal('Current: ');
}
