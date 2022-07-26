import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxSortHeaderIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** The aria label for a header that can be clicked to sort ascending. */
    sortAscendingAriaLabel = 'click to sort ascending';
    /** The aria label for a header that can be clicked to sort descending. */
    sortDescendingAriaLabel = 'click to sort descending';
    /** The aria label for a column that is sorted ascending. */
    sortedAscendingAriaLabel = 'sorted ascending by';
    /** The aria label for a column that is sorted descending. */
    sortedDescendingAriaLabel = 'sorted descending by';
}
