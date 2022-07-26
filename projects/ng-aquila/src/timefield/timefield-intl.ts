import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxTimefieldIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** Label that should replace the 'hours' aria-label of the input field. */
    inputFieldHoursAriaLabel = 'hours';

    /** Label that should replace the 'minutes' input field of the aria-label. */
    inputFieldMinutesAriaLabel = 'minutes';
}
