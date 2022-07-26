import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxNumberStepperIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** The aria label for the decrement '-' button */
    decrementAriaLabel = 'Decrement';
    /** The aria label for the increment '+' button */
    incrementAriaLabel = 'Increment';
}
