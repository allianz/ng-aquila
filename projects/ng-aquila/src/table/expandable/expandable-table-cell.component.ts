import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NxExpandableTableRowComponent } from './expandable-table-row.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * This is an expandable table cell.
 * Only works in conjunction with the `[nxExpandableTableRow]` component.
 */
@Component({
    selector: 'td[nxExpandableTableCell]',
    templateUrl: './expandable-table-cell.component.html',
    host: {
        class: 'nx-expandable-table-cell',
    },
    animations: [
        trigger('openClose', [
            state(
                'open',
                style({
                    height: '*',
                    visibility: 'visible',
                }),
            ),
            state(
                'closed, void',
                style({
                    height: '0',
                    visibility: 'hidden', // visibility and height to toggle instead of display: none to prevent cell width jumping
                }),
            ),
            transition('closed <=> open, void => closed', [animate('225ms cubic-bezier(0.4,0.0,0.2,1)')]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxExpandableTableCellComponent implements OnDestroy {
    private _destroyed = new Subject();

    _open: boolean = false;

    constructor(_row: NxExpandableTableRowComponent, private _changeDetectorRef: ChangeDetectorRef) {
        _row.expanded.pipe(takeUntil(this._destroyed)).subscribe(open => {
            this._open = open;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
