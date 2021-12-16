import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxSortHeaderIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void> = new Subject<void>();

    /** The aria label for a header that can be clicked to sort ascending. */
    sortAscendingAriaLabel: string = 'click to sort ascending';
    /** The aria label for a header that can be clicked to sort descending. */
    sortDescendingAriaLabel: string = 'click to sort descending';
    /** The aria label for a column that is sorted ascending. */
    sortedAscendingAriaLabel: string = 'sorted ascending by';
    /** The aria label for a column that is sorted descending. */
    sortedDescendingAriaLabel: string = 'sorted descending by';
}
