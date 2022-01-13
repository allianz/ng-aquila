import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, InjectionToken, Inject, Optional, Injectable, OnDestroy } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Types of error notification styles */
export type ErrorStyleType = 'message' | 'text';

let nextId = 0;

/**
 * Represents the default options for the error notification that can be configured
 * using the `ERROR_DEFAULT_OPTIONS` injection token.
 */
@Injectable()
export class ErrorDefaultOptions {
    /**
     * Stream that emits whenever the default options are changed. Use this to notify
     * components if the default options have changed after initialization.
     */
    changes?: Subject<void>;

    /** Defines the style type of the error notification. */
    appearance?: ErrorStyleType;
}

export const ERROR_DEFAULT_OPTIONS = new InjectionToken<ErrorDefaultOptions>('ERROR_DEFAULT_OPTIONS');

@Component({
    selector: 'nx-error',
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./error.component.scss'],
    host: {
        '[attr.role]': '"alert"',
        '[attr.id]': 'id',
        '[class.nx-error--message]': 'appearance == "message"',
    },
})
export class NxErrorComponent implements OnDestroy {
    private _showIcon: boolean = true;
    private _appearance!: ErrorStyleType;
    private _id: string = `nx-error-${nextId++}`;
    private _destroyed = new Subject();

    /** Whether an icon should be displayed. Only has an effect for type 'text' */
    @Input()
    set showIcon(value: BooleanInput) {
        this._showIcon = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get showIcon(): boolean {
        return this._showIcon;
    }

    /**
     * Id of the nx-error.
     *
     * If not set, the selectable card gets an incremented value by default.
     */
    @Input()
    set id(value: string) {
        if (value && value !== this._id) {
            this._id = value;
            this._changeDetectorRef.markForCheck();
        }
    }

    get id(): string {
        return this._id;
    }

    /**
     * Whether the error should have message or text styling.
     *
     * Default is 'message'.
     */
    @Input()
    set appearance(value: ErrorStyleType) {
        if (value !== this.appearance) {
            this._appearance = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get appearance(): ErrorStyleType {
        return this._appearance || (this._defaultOptions && this._defaultOptions.appearance) || 'message';
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef, @Optional() @Inject(ERROR_DEFAULT_OPTIONS) private _defaultOptions: ErrorDefaultOptions) {
        if (this._defaultOptions && this._defaultOptions.changes) {
            this._defaultOptions.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });
        }
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
