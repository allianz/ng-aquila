import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NxProgressStepperIntl {
  /** Prefix announced before a completed step's label */
  readonly completedLabel = signal('Completed: ');

  /** Prefix announced before the current step's label */
  readonly currentLabel = signal('Current: ');

  /** Prefix announced before the label of a step that is neither completed nor current */
  readonly notCompletedLabel = signal('Not completed: ');
}
