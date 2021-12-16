import { ChangeDetectionStrategy, Component, Input, Optional, Inject, InjectionToken } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

let nextId = 0;

export interface LabelDefaultOptions {
    /** Sets the default appearance. (optional) */
    size?: LABEL_SIZE_TYPE;
}

/** Options for sizing of the label. */
export type LABEL_SIZE_TYPE = 'small' | 'large';
const DEFAULT_SIZE = 'large';

export const LABEL_DEFAULT_OPTIONS = new InjectionToken<LabelDefaultOptions>('LABEL_DEFAULT_OPTIONS');
@Component({
    selector: 'nx-label',
    templateUrl: './label.component.html',
    styleUrls: ['label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.disabled]': 'disabled',
        '[attr.aria-labelledby]': 'id || null',
        '[class.nx-label--negative]': 'negative',
        '[class.nx-label--large]': 'size === "large"',
        '[class.nx-label--small]': 'size === "small"',
        '[attr.id]': 'id',
    },
})
export class NxLabelComponent {
    readonly _stateChanges = new Subject<void>();
    private _disabled: boolean = false;
    private _negative: boolean = false;
    private _size: LABEL_SIZE_TYPE | undefined;

    /** Sets the label to disabled */
    @Input()
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._stateChanges.next();
    }

    get disabled(): boolean {
        return this._disabled;
    }

    /** Sets the label to disabled */
    @Input()
    set negative(value: boolean) {
        this._negative = coerceBooleanProperty(value);
        this._stateChanges.next();
    }

    get negative(): boolean {
        return this._negative;
    }

    private _id: string = `nx-label-${nextId++}`;
    /** Sets the Id of the label */
    @Input()
    set id(value: string) {
        if (this._id !== value) {
            this._id = value;
        }
    }

    get id(): string {
        return this._id;
    }

    /**
     * **Expert option**
     * Sets the appearance of the label */
    @Input()
    set size(value: LABEL_SIZE_TYPE) {
        this._size = value;
        this._stateChanges.next();
    }

    get size(): LABEL_SIZE_TYPE {
        return this._size || (this._defaultOptions && this._defaultOptions.size) || DEFAULT_SIZE;
    }

    constructor(@Optional() @Inject(LABEL_DEFAULT_OPTIONS) private _defaultOptions: LabelDefaultOptions) {}

    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_negative: BooleanInput;
}
