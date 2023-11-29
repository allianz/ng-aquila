/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { AfterContentInit, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, Optional, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NX_INPUT_VALUE_ACCESSOR } from '@aposin/ng-aquila/input';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NX_DATE_FORMATS, NX_DATE_STRICT, NxDateAdapter, NxDateFormats } from './adapter/index';
import { NxDateValidators } from './date-validators';
import { createMissingDateImplError } from './datefield.functions';
import { NxDatepickerComponent } from './datepicker/datepicker.component';

export const NX_DATEFIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NxDatefieldDirective),
    multi: true,
};

export const NX_DATEFIELD_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NxDatefieldDirective),
    multi: true,
};

/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use NxDatepickerInputEvent instead.
 */
export class NxDatepickerInputEvent<D> {
    /** The new value for the target datepicker input. */
    value: D | null;

    constructor(
        /** Reference to the datepicker input component that emitted the event. */
        readonly target: NxDatefieldDirective<D>,
        /** Reference to the native input element associated with the datepicker input. */
        readonly targetElement: HTMLElement,
    ) {
        this.value = this.target.value;
    }
}

/**
 * Directive used to provide date processing functionality to an input.
 */
@Directive({
    selector: 'input[nxDatefield]',
    providers: [
        NX_DATEFIELD_VALUE_ACCESSOR,
        NX_DATEFIELD_VALIDATORS,
        // {provide: NX_INPUT_VALUE_ACCESSOR, useExisting: NxDatefieldDirective},
        { provide: NX_INPUT_VALUE_ACCESSOR, useExisting: NxDatefieldDirective },
        { provide: NxAbstractControl, useExisting: NxDatefieldDirective },
    ],
    host: {
        '[attr.aria-haspopup]': 'true',
        '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
        '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
        '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
        '[disabled]': 'disabled',
        '[readonly]': 'readonly',
        '(input)': '_onInput($event.target.value)',
        '(change)': '_onChange()',
        '(blur)': '_onBlur()',
        '(keydown)': '_onKeydown($event)',
    },
    exportAs: 'nxDatefield',
})
export class NxDatefieldDirective<D> implements AfterContentInit, ControlValueAccessor, OnDestroy, Validator, NxAbstractControl {
    /** @docs-private */
    currentFormattedDate: string | null = null;

    /** Whether the component has been initialized. */
    private _isInitialized?: boolean;

    /** The datepicker that this input is associated with. */
    @Input() set datepicker(value: NxDatepickerComponent<D>) {
        this.registerDatepicker(value);
    }
    _datepicker!: NxDatepickerComponent<D>;

    /** Function that can be used to filter out dates within the datepicker and invalidate values in the datefield. */
    @Input() set datefieldFilter(value: (date: D | null) => boolean) {
        this._dateFilter = value;
        this._validatorOnChange();
    }

    /** Provide or read the current date. It's type <D> depends on the chosen date implementation */
    @Input() set value(value: D | null) {
        value = this._dateAdapter.deserialize(value);
        value = this._getValidDateOrNull(value);
        const oldDate = this.value;
        this._value = value;
        this._formatValue(this.value);
        if (!this._dateAdapter.sameDate(oldDate, value)) {
            this._valueChange.emit(value);
        }
    }
    get value(): D | null {
        return this._value;
    }
    private _value!: D | null;

    /** Sets the minimum valid date. */
    @Input() set min(value: D | null) {
        this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    get min(): D | null {
        return this._min;
    }
    private _min!: D | null;

    /** Sets the maximum valid date. */
    @Input() set max(value: D | null) {
        this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    get max(): D | null {
        return this._max;
    }
    private _max!: D | null;

    /**
     * If supported by the date implementation enable strict parsing (applies to Moment's parse function here).
     *
     * The date value is not updated on a `strict` change.
     */
    @Input() set strict(value: any) {
        this._strict = coerceBooleanProperty(value);
    }
    get strict() {
        return this._strict;
    }
    private _strict = true;

    /**
     * Override the parse format given with parse.dateInput with the token NX_DATE_FORMATS.
     *
     * The date value is not updated on a `parseFormat` change.
     */
    @Input() set parseFormat(value: string | string[]) {
        this._parseFormat = value;
    }
    get parseFormat() {
        return this._parseFormat;
    }
    private _parseFormat!: string | string[];

    /** Override the display format given with display.dateInput with the token NX_DATE_FORMATS  */
    @Input() set displayFormat(value: string) {
        this._displayFormat = value;
        this._formatValue(this.value);
    }
    get displayFormat() {
        return this._displayFormat;
    }
    private _displayFormat!: string;

    /** Whether the datepicker-input is disabled. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._disabledChange.emit(newValue);
        }
        // In Ivy static bindings are invoked earlier, before the element is attached to the DOM.
        // This can cause an error to be thrown in some browsers (IE/Edge) which assert that the
        // element has been inserted.
        if (newValue && this._isInitialized) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            this._elementRef.nativeElement.blur();
        }
    }
    get disabled(): boolean {
        return !!this._disabled;
    }
    private _disabled!: boolean;

    /** Whether the datefield is readonly. */
    @Input() set readonly(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (this._readonly !== newValue) {
            this._readonly = newValue;
            this._readonlyChange.emit(newValue);
        }
    }
    get readonly(): boolean {
        return !!this._readonly;
    }
    private _readonly!: boolean;

    /** set readonly state */
    setReadonly(value: boolean) {
        this.readonly = value;
    }

    /** Emits when a `change` event is fired on this `<input>`. */
    @Output() readonly dateChange = new EventEmitter<NxDatepickerInputEvent<D>>();

    /** Emits when an `input` event is fired on this `<input>`. */
    @Output() readonly dateInput = new EventEmitter<NxDatepickerInputEvent<D>>();

    /** Emits when the value changes (either due to user input or programmatic change). */
    readonly _valueChange = new EventEmitter<D | null>();

    /** Emits when the disabled state has changed. */
    readonly _disabledChange = new EventEmitter<boolean>();

    /** Emits when the readonly state has changed. */
    readonly _readonlyChange = new EventEmitter<boolean>();

    readonly _dateAdapter: NxDateAdapter<D>;
    private readonly _dateFormats: NxDateFormats;

    private readonly _destroyed = new Subject<void>();

    _dateFilter!: (date: D | null) => boolean;

    _onTouched = () => {};

    private _cvaOnChange: (value: any) => void = () => {};

    private _validatorOnChange = () => {};

    constructor(
        private readonly _elementRef: ElementRef,
        @Optional() _dateAdapter: NxDateAdapter<D> | null,
        @Optional() @Inject(NX_DATE_FORMATS) _dateFormats: NxDateFormats | null,
        @Optional() @Inject(NX_DATE_STRICT) _dateStrict: boolean | null,
        @Optional() private readonly _formField: NxFormfieldComponent | null,
    ) {
        if (!_dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._dateAdapter = _dateAdapter;

        if (!_dateFormats) {
            throw createMissingDateImplError('NX_DATE_FORMATS');
        }
        this._dateFormats = _dateFormats;

        this._strict = _dateStrict ?? true;

        // Update the displayed date when the locale changes.
        _dateAdapter.localeChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
            const value = this.value;
            this.value = value; // invoke setter
        });
    }

    ngAfterContentInit(): void {
        this._datepicker?.selectedChanged.pipe(takeUntil(this._destroyed)).subscribe((selected: D) => {
            this.value = selected;
            this._cvaOnChange(selected);
            this._onTouched();
            this.dateInput.emit(new NxDatepickerInputEvent(this, this._elementRef.nativeElement));
            this.dateChange.emit(new NxDatepickerInputEvent(this, this._elementRef.nativeElement));
        });
        this._isInitialized = true;
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._valueChange.complete();
        this._disabledChange.complete();
        this._readonlyChange.complete();
    }

    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void {
        this._validatorOnChange = fn;
    }

    /** @docs-private */
    validate(c: AbstractControl): ValidationErrors | null {
        const validator = Validators.compose(this.getValidators());
        return validator ? validator(c) : null;
    }

    /**
     * Gets the element that the datepicker popup should be connected to.
     * @returns The element to connect the popup to.
     * @docs-private
     */
    getConnectedOverlayOrigin(): ElementRef {
        // formfield not yet accessible as we don't have them in a secondary entry point to import yet.
        // return this._elementRef;
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    }

    // Implemented as part of ControlValueAccessor.
    writeValue(value: D): void {
        this.value = value;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn: (value: any) => void): void {
        this._cvaOnChange = fn;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _onKeydown(event: KeyboardEvent) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    }

    _onInput(value: string) {
        let date = this._dateAdapter.parse(value, this._parseFormat || this._dateFormats.parse.dateInput, this.strict);
        date = this._getValidDateOrNull(date);
        this._value = date;

        if (date) {
            this.currentFormattedDate = this._dateAdapter.format(date, this._displayFormat || this._dateFormats.display.dateInput);
        } else {
            this.currentFormattedDate = null;
        }

        this._cvaOnChange(date);
        this._valueChange.emit(date);

        this.dateInput.emit(new NxDatepickerInputEvent(this, this._elementRef.nativeElement));
    }

    _onChange() {
        this.dateChange.emit(new NxDatepickerInputEvent(this, this._elementRef.nativeElement));
    }

    _focus() {
        this._elementRef.nativeElement.focus();
    }

    _onBlur() {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    }

    /** Returns the validators of the datefield. */
    getValidators(): ValidatorFn[] {
        return [
            NxDateValidators.parse(this._dateAdapter, this._dateFormats, this._elementRef.nativeElement, this._strict, this._parseFormat),
            NxDateValidators.min(this._dateAdapter, this.min),
            NxDateValidators.max(this._dateAdapter, this.max),
            NxDateValidators.filter(this._dateAdapter, this._dateFilter),
        ];
    }

    /** Formats a value and sets it on the input native element. */
    private _formatValue(value: D | null) {
        this._elementRef.nativeElement.value = value ? this._dateAdapter.format(value, this._displayFormat || this._dateFormats.display.dateInput) : '';
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    private registerDatepicker(value: NxDatepickerComponent<D>) {
        if (value) {
            this._datepicker = value;
            this._datepicker.registerInput(this);
        }
    }
}
