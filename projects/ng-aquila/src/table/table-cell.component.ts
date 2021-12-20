import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * This is a table cell.
 */
@Component({
    selector: 'td[nxTableCell], td[nxCell]',
    template: '<ng-content></ng-content>',
    host: {
        '[class.nx-table-cell]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableCellComponent {}
