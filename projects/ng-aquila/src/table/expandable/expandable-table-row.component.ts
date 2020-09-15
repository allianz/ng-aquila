import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NxExpandable } from './toggle-button.component';

/**
 * This is an expandable table row.
 * It can collapse its height to hide the content.
 * Requires the table cells to have the `[nxExpandableTableCell]` component.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[nxExpandableTableRow]',
  host: {
   'class': 'nx-expandable-table-row'
  },
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxExpandableTableRowComponent implements NxExpandable {
  expanded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  /**
   * Toggles the expansion of this row.
   */
  toggle() {
    if (this.expanded.value) {
      this.close();
    } else {
      this.expand();
    }
  }

  /**
   * Expands this row.
   */
  expand() {
    if (!this.expanded.value) {
      this.expanded.next(true);
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Closes this row.
   */
  close() {
    if (this.expanded.value) {
      this.expanded.next(false);
      this._changeDetectorRef.markForCheck();
    }
  }
}
