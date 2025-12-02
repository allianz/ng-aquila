import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NxExpandableTableCellComponent implements OnDestroy {
  readonly indented = input(false, { transform: booleanAttribute });
  _open = false;

  private readonly _destroyed = new Subject<void>();

  constructor(
    _row: NxExpandableTableRowComponent,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    _row.expanded.pipe(takeUntil(this._destroyed)).subscribe((open) => {
      this._open = open;
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
