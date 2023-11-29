import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional } from '@angular/core';

import { NxExpandableTableDirective } from './expandable/expandable-table.directive';

/**
 * This is a table.
 * The table supports a `zebra` and a `condensed` mode.
 */
@Component({
    selector: 'table[nxTable]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./table.component.scss'],
    inputs: ['sticky'],
    host: {
        class: 'nx-table',
        '[class.nx-table--condensed]': 'condensed',
        '[class.nx-table--zebra]': 'zebra',
        '[class.nx-table--sticky-first]': 'sticky === "first" || sticky === "both"',
        '[class.nx-table--sticky-last]': 'sticky === "last" || sticky === "both"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableComponent {
    /** Change the table mode to condensed  */
    @Input() set condensed(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (value !== this._condensed) {
            this._condensed = newValue;
            this._cdr.markForCheck();
        }
    }
    get condensed(): boolean {
        return this._condensed;
    }
    private _condensed!: boolean;

    /** Change the table mode to zebra  */
    @Input() set zebra(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (value !== this._zebra) {
            this._zebra = newValue;
            this._cdr.markForCheck();
        }
    }
    get zebra(): boolean {
        return this._expandableTableDirective ? false : this._zebra;
    }
    private _zebra!: boolean;

    /**
     * Makes first or last column "sticky".
     *
     * Values: `'first' | 'last' | 'both'`.
     */
    @Input() set sticky(value: string) {
        this._sticky = value;
        this._cdr.markForCheck();
    }
    get sticky(): string {
        return this._sticky;
    }
    private _sticky!: string;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly _expandableTableDirective: NxExpandableTableDirective | null,
    ) {}
}
