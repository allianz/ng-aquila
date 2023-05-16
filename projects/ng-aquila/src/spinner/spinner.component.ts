import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

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
    /** Sets the size of the spinner. Default is 'small'. */
    @Input() set size(value: SpinnerSize) {
        if (value !== this._size) {
            this._size = value;
            this._cdr.markForCheck();
        }
    }
    get size(): SpinnerSize {
        return this._size;
    }
    private _size: SpinnerSize = DEFAULT_SIZE;

    /** Whether the spinner should use a negative styling. */
    @Input() set negative(value: BooleanInput) {
        if (value !== this._negative) {
            this._negative = coerceBooleanProperty(value);
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this._negative;
    }
    private _negative = false;

    constructor(private readonly _cdr: ChangeDetectorRef) {}
}
