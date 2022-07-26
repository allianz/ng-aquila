import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Popover data that requires internationalization. */
@Injectable({ providedIn: 'root' })
export class NxPopoverIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** Aria-label for the delete icon. */
    closeIconLabel = 'close';
}
