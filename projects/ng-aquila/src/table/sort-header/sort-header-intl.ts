import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NxSortHeaderIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** The aria label for a header that can be sorted ascending. */
  sortAscendingAriaLabel: string = 'sort ascending by';
  /** The aria label for a header that can be sorted descending. */
  sortDescendingAriaLabel: string = 'sort descending by';
}
