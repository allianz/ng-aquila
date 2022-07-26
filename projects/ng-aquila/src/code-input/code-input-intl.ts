import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxCodeInputIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** Label that should replace the 'Enter key' of the aria-label. */
    inputFieldAriaLabel = 'Enter Key';

    /** Label that should replace the 'of' of the aria-label. */
    ofLabel?: string = 'of';
}
