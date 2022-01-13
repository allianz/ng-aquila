import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
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
    private _condensed!: boolean;

    private _zebra!: boolean;

    private _sticky!: string;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** Change the table mode to condensed  */
    @Input() set condensed(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (value !== this._condensed) {
            this._condensed = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }

    get condensed(): boolean {
        return this._condensed;
    }

    /** Change the table mode to zebra  */
    @Input() set zebra(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (value !== this._zebra) {
            this._zebra = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }

    get zebra(): boolean {
        return this._zebra;
    }

    /**
     * Makes first or last column "sticky".
     *
     * Values: first | last | both
     */
    @Input() set sticky(value: string) {
        this._sticky = value;
        this._changeDetectorRef.markForCheck();
    }

    get sticky(): string {
        return this._sticky;
    }
}
