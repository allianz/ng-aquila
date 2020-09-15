import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NxTimefieldIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** Label that should replace the 'hours' aria-label of the input field. */
  inputFieldHoursAriaLabel: string = 'hours';

  /** Label that should replace the 'minutes' input field of the aria-label. */
  inputFieldMinutesAriaLabel: string = 'minutes';
}
