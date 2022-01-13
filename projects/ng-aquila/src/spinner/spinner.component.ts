import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

/** Options for sizing of the spinner. */
export type SpinnerSize = 'small' | 'medium' | 'large';

const DEFAULT_SIZE = 'small';

@Component({
    selector: 'nx-spinner',
    templateUrl: './spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./spinner.component.scss'],
    host: {
        '[class.nx-spinner--small]': 'size === "small"',
        '[class.nx-spinner--medium]': 'size === "medium"',
        '[class.nx-spinner--large]': 'size === "large"',
        '[class.nx-spinner--negative]': 'negative',
        '[attr.role]': '"status"',
        '[attr.aria-busy]': '"true"',
        '[attr.aria-live]': '"assertive"',
    },
})
export class NxSpinnerComponent {
    private _size: SpinnerSize = DEFAULT_SIZE;

    /** Sets the size of the spinner. Default is 'small'. */
    @Input('nxSize')
    set size(value: SpinnerSize) {
        if (value !== this._size) {
            this._size = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get size(): SpinnerSize {
        return this._size;
    }

    private _negative: boolean = false;

    /** Whether the spinner should use a negative styling. */
    @Input()
    set negative(value: BooleanInput) {
        if (value !== this._negative) {
            this._negative = coerceBooleanProperty(value);
            this._changeDetectorRef.markForCheck();
        }
    }
    get negative(): boolean {
        return this._negative;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
