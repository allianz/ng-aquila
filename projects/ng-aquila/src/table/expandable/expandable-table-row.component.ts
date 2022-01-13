import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
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
    private _isExpanded!: boolean;

    /* Whether the row is expanded. */
    @Input()
    set isExpanded(value: BooleanInput) {
        this._isExpanded = coerceBooleanProperty(value);
        this.expanded.next(this._isExpanded);
        this._changeDetectorRef.markForCheck();
    }
    get isExpanded() {
        return this._isExpanded;
    }

    expanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
