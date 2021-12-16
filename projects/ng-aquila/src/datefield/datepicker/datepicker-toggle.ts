import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Optional,
    Inject,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { merge, of as observableOf, Subscription, Subject } from 'rxjs';

import { NxDatepickerIntl } from './datepicker-intl';
import { NxDatepickerComponent, DATEPICKER_DEFAULT_OPTIONS, DatepickerDefaultOptions } from './datepicker.component';
import { takeUntil } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';

/** Can be used to override the icon of a `nxDatepickerToggle`. */
@Directive({
    selector: '[nxDatepickerToggleIcon]',
})
// tslint:disable-next-line:directive-class-suffix
export class NxDatepickerToggleIconComponent {}

@Component({
    selector: 'nx-datepicker-toggle',
    templateUrl: 'datepicker-toggle.html',
    styleUrls: ['datepicker-toggle.scss'],
    host: {
        class: 'nx-datepicker-toggle',
        '[class.nx-datepicker-toggle-active]': 'datepicker && datepicker.opened',
        '[class.nx-datepicker-toggle--disabled]': 'disabled',
    },
    exportAs: 'nxDatepickerToggle',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxDatepickerToggleComponent<D> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _stateChanges = Subscription.EMPTY;

    private _disabled: boolean | undefined;
    private _tabindex: number | undefined;
    private _destroyed = new Subject();

    /** Custom icon set by the consumer. */
    @ContentChild(NxDatepickerToggleIconComponent) _customIcon!: NxDatepickerToggleIconComponent;

    @ViewChild('toggleButton') _toggleButton!: ElementRef<HTMLElement>;

    /** Datepicker instance that the button will toggle. */
    @Input('for')
    set datepicker(value: NxDatepickerComponent<D>) {
        this.registerDatepicker(value);
    }
    get datepicker(): NxDatepickerComponent<D> {
        return this._datepicker;
    }
    _datepicker!: NxDatepickerComponent<D>;

    private registerDatepicker(value: NxDatepickerComponent<D>) {
        if (value) {
            this._datepicker = value;
            this._datepicker.registerToggle(this);
        }
    }

    /** Whether the toggle button is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    /** Sets the tabindex for the toggle button. Default: 0. */
    @Input()
    set tabindex(value: number) {
        const newValue = coerceNumberProperty(value);
        if (this._tabindex !== newValue) {
            this._tabindex = newValue;
        }
    }
    get tabindex(): number {
        if (this._tabindex !== undefined) {
            return this._tabindex;
        }
        if (this._defaultOptions && this._defaultOptions.toggleIconTabindex !== undefined) {
            return this._defaultOptions.toggleIconTabindex;
        }
        return 0;
    }

    constructor(
        public _intl: NxDatepickerIntl,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) private _defaultOptions: DatepickerDefaultOptions,
        private _focusMonitor: FocusMonitor,
    ) {
        if (this._defaultOptions && this._defaultOptions.changes) {
            this._defaultOptions.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });
        }
    }

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._toggleButton);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    }

    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._toggleButton);
    }

    ngAfterContentInit() {
        this._watchStateChanges();
    }

    _open(event: Event): void {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }

    private _watchStateChanges() {
        const datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : observableOf();
        const inputDisabled = this.datepicker && this.datepicker._datepickerInput ? this.datepicker._datepickerInput._disabledChange : observableOf();
        const inputReadonly = this.datepicker && this.datepicker._datepickerInput ? this.datepicker._datepickerInput._readonlyChange : observableOf();
        const datepickerToggled = this.datepicker ? merge(this.datepicker.openedStream, this.datepicker.closedStream) : observableOf();

        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled, inputReadonly, datepickerToggled).subscribe(() =>
            this._changeDetectorRef.markForCheck(),
        );
    }

    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_tabindex: NumberInput;
}
