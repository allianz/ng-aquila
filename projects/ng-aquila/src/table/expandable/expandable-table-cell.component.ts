import { booleanAttribute, ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NxExpandableTableRowComponent } from './expandable-table-row.component';

/**
 * This is an expandable table cell.
 * Only works in conjunction with the `[nxExpandableTableRow]` component.
 */
@Component({
  selector: 'td[nxExpandableTableCell]',
  templateUrl: './expandable-table-cell.component.html',
  styleUrl: './expandable-table-cell.component.scss',
  host: {
    class: 'nx-expandable-table-cell',
    '[class.nx-expandable-table-cell--indented]': 'indented()',
    '[class.is-expanded]': '_open()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NxExpandableTableCellComponent {
  readonly indented = input(false, { transform: booleanAttribute });
  readonly _open: Signal<boolean>;

  constructor(_row: NxExpandableTableRowComponent) {
    this._open = toSignal(_row.expanded, { initialValue: false });
  }
}
