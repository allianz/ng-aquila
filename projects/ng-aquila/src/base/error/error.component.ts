import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injectable, InjectionToken, Input, OnDestroy, Optional } from '@angular/core';
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
    /** Whether an icon should be displayed. Only has an effect for type 'text' */
    @Input() set showIcon(value: BooleanInput) {
        this._showIcon = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get showIcon(): boolean {
        return this._showIcon;
    }
    private _showIcon = true;

    /**
     * Id of the nx-error.
     *
     * If not set, the selectable card gets an incremented value by default.
     */
    @Input() set id(value: string) {
        if (value && value !== this._id) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-error-${nextId++}`;

    /**
     * Whether the error should have message or text styling.
     *
     * Default: `'message'`.
     */
    @Input() set appearance(value: ErrorStyleType | undefined | '') {
        if (value !== this.appearance) {
            this._appearance = value ? value : 'message';
            this._cdr.markForCheck();
        }
    }
    get appearance(): ErrorStyleType {
        return this._appearance || this._defaultOptions?.appearance || 'message';
    }
    private _appearance!: ErrorStyleType;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        @Optional() @Inject(ERROR_DEFAULT_OPTIONS) private readonly _defaultOptions: ErrorDefaultOptions | null,
    ) {
        this._defaultOptions?.changes?.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
