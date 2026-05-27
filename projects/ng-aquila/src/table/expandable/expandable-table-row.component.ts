import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NxExpandable } from './toggle-button.component';

/**
 * This is an expandable table row.
 * It can collapse its height to hide the content.
 * Requires the table cells to have the `[nxExpandableTableCell]` component.
 */
@Component({
  selector: 'tr[nxExpandableTableRow]',
  host: {
    class: 'nx-expandable-table-row',
  },
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NxExpandableTableRowComponent implements NxExpandable {
  /* Whether the row is expanded. */
  @Input() set isExpanded(value: BooleanInput) {
    this._isExpanded = coerceBooleanProperty(value);
    this.expanded.next(this._isExpanded);
  }
  get isExpanded() {
    return this._isExpanded;
  }
  private _isExpanded!: boolean;

  readonly expanded = new BehaviorSubject<boolean>(false);

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
    }
  }

  /**
   * Closes this row.
   */
  close() {
    if (this.expanded.value) {
      this.expanded.next(false);
    }
  }
}
