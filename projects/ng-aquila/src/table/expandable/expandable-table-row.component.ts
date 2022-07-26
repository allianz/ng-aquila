import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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
})
export class NxExpandableTableRowComponent implements NxExpandable {
    /* Whether the row is expanded. */
    @Input() set isExpanded(value: BooleanInput) {
        this._isExpanded = coerceBooleanProperty(value);
        this.expanded.next(this._isExpanded);
        this._cdr.markForCheck();
    }
    get isExpanded() {
        return this._isExpanded;
    }
    private _isExpanded!: boolean;

    readonly expanded = new BehaviorSubject<boolean>(false);

    constructor(private readonly _cdr: ChangeDetectorRef) {}

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
            this._cdr.markForCheck();
        }
    }

    /**
     * Closes this row.
     */
    close() {
        if (this.expanded.value) {
            this.expanded.next(false);
            this._cdr.markForCheck();
        }
    }
}
