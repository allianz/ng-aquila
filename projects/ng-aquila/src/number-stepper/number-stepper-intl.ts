import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NxNumberStepperIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void> = new Subject<void>();

    /** The aria label for the decrement '-' button */
    decrementAriaLabel: string = 'Decrement';
    /** The aria label for the increment '+' button */
    incrementAriaLabel: string = 'Increment';
}
