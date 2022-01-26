import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, pad } from '@aposin/ng-aquila/utils';

import { NxTimefieldIntl } from './timefield-intl';

let nextId = 0;

@Component({
    selector: 'nx-timefield',
    templateUrl: './timefield.component.html',
    styleUrls: ['./timefield.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.has-error]': 'errorState',
        '[class.is-negative]': 'negative',
        '[class.is-disabled]': 'disabled',
    },
})
export class NxTimefieldComponent implements ControlValueAccessor, DoCheck {
    /** @docs-private */
    errorState = false;

    _toggleAMPM!: string | null;

    /** Event that emits the time in 24h ISO format. */
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _idHours = `nx-timefield__hours-${nextId++}`;
    /** @docs-private */
    get idHours(): string {
        return this._idHours;
    }

    private _idMinutes = `nx-timefield__minutes-${nextId++}`;
    /** @docs-private */
    get idMinutes(): string {
        return this._idMinutes;
    }

    private _idRadioGroup = `nx-timefield__radio-group-${nextId++}`;
    /** @docs-private */
    get idRadioGroup(): string {
        return this._idRadioGroup;
    }

    private _maxHours = 23;
    /** @docs-private */
    get maxHours() {
        return this._maxHours;
    }

    private _minHours = 0;
    /** @docs-private */
    get minHours() {
        return this._minHours;
    }

    private _maxMinutes = 59;
    /** @docs-private */
    get maxMinutes() {
        return this._maxMinutes;
    }

    private _minMinutes = 0;
    /** @docs-private */
    get minMinutes() {
        return this._minMinutes;
    }

    /* The time in 24h ISO format example: 12:54, 23:59,... */
    private _time!: string | null;
    /** @docs-private */
    set time(value: string) {
        this._time = value;
        this._onChangeCallback(value);
        this._cdr.markForCheck();
    }
    get time(): string {
        return this._time as string;
    }

    private _twelveHourFormat = false;
    /** Whether to show the time in 12-hour format with AM/PM toggle. Default: false. */
    @Input()
    set twelveHourFormat(value: BooleanInput) {
        this._twelveHourFormat = coerceBooleanProperty(value);
        if (this._twelveHourFormat) {
            this._maxHours = 12;
            this._minHours = 1;
            this._toggleAMPM = 'AM';
        } else {
            this._maxHours = 23;
            this._minHours = 0;
            this._toggleAMPM = null;
        }
        this._cdr.markForCheck();
    }
    get twelveHourFormat(): boolean {
        return this._twelveHourFormat;
    }

    private _label!: string;
    /** Sets the label which is displayed on top of timefield. */
    @Input()
    set label(value: string) {
        if (this._label !== value) {
            this._label = value;
            this._cdr.markForCheck();
        }
    }
    get label(): string {
        return this._label;
    }

    private _labelAM = 'AM';
    /** Sets the AM radio button label which is displayed in radio group. */
    @Input()
    set labelAM(value: string) {
        if (this._labelAM !== value) {
            this._labelAM = value;
            this._cdr.markForCheck();
        }
    }
    get labelAM(): string {
        return this._labelAM;
    }

    private _labelPM = 'PM';
    /** Sets the PM radio button label which is displayed in radio group. */
    @Input()
    set labelPM(value: string) {
        if (this._labelPM !== value) {
            this._labelPM = value;
            this._cdr.markForCheck();
        }
    }
    get labelPM(): string {
        return this._labelPM;
    }

    private _placeholderHours = 'hh';
    /** Sets the placeholder of hours field. Default: 'hh' */
    @Input()
    set placeholderHours(value: string) {
        if (this._placeholderHours !== value) {
            this._placeholderHours = value;
            this._cdr.markForCheck();
        }
    }
    get placeholderHours(): string {
        return this._placeholderHours;
    }

    private _placeholderMinutes = 'mm';
    /** Sets the placeholder of minutes field. Default: 'mm' */
    @Input()
    set placeholderMinutes(value: string) {
        if (this._placeholderMinutes !== value) {
            this._placeholderMinutes = value;
            this._cdr.markForCheck();
        }
    }
    get placeholderMinutes(): string {
        return this._placeholderMinutes;
    }

    private _required!: boolean;
    /** Whether the timefield is required. */
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }

    private _negative = false;
    /** Whether the timefield uses the negative set of styling. */
    @Input()
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._negative !== newValue) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }
    get negative() {
        return this._negative;
    }

    private _disabled = false;

    /** Whether the timefield is disabled. */
    @Input()
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }

    private _hours!: string;
    /** @docs-private */
    set hours(value: string) {
        this._hours = value;
        this._cdr.markForCheck();
    }
    get hours(): string {
        return this._hours;
    }

    private _minutes!: string;
    /** @docs-private */
    set minutes(value: string) {
        this._minutes = value;
        this._cdr.markForCheck();
    }
    get minutes(): string {
        return this._minutes;
    }

    private _hasFocus!: any;
    /** @docs-private */
    get hasFocus() {
        return this._hasFocus ? 'has-focus' : null;
    }

    constructor(
        private _cdr: ChangeDetectorRef,
        /** @docs-private */ @Optional() @Self() public ngControl: NgControl,
        private _errorStateMatcher: ErrorStateMatcher,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        public _intl: NxTimefieldIntl,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);
        if (newState !== oldState) {
            this.errorState = newState;
        }
    }

    private _convertToISOFormat(hours: string, minutes: string) {
        return `${hours}:${minutes}`;
    }

    _updateTime() {
        this._time = null;
        if (this._isValidInput(this.hours) && this._isValidInput(this.minutes)) {
            const hours = Number(this.hours);
            const minutes = Number(this.minutes);
            if (this._isValidTime(hours, 'hours') && this._isValidTime(minutes, 'minutes')) {
                this._time = this._timeInTwentyFourHourFormat(hours, minutes);
            }
        }
        this._onChangeCallback(this._time);
    }

    _onFocus() {
        this._hasFocus = true;
    }

    _getAriaLabel(type: string) {
        let label!: string;
        switch (type) {
            case 'hours':
                label = this._intl.inputFieldHoursAriaLabel;
                break;
            case 'minutes':
                label = this._intl.inputFieldMinutesAriaLabel;
                break;
        }
        return label;
    }

    _onInput(event: any, type: string) {
        this._onTouchedCallback();
        if (type === 'hours') {
            this.hours = event.target.value;
        } else if (type === 'minutes') {
            this.minutes = event.target.value;
        }
        this._updateTime();
    }

    _onBlur(type: string) {
        this._onTouchedCallback();
        this._hasFocus = false;
        // set 0X is the value entered in X
        if (type === 'hours' && Number(this.hours) < 10 && this.hours !== '') {
            this.hours = pad(String(this.hours));
        } else if (type === 'minutes' && Number(this.minutes) < 10 && this.minutes !== '') {
            this.minutes = pad(String(this.minutes));
        }
    }

    private _timeInTwentyFourHourFormat(hours: number, minutes: number) {
        if (this.twelveHourFormat) {
            // 12h to 24h conversion
            if (this._toggleAMPM === 'AM') {
                if (hours === 12) {
                    hours -= 12;
                }
            } else if (this._toggleAMPM === 'PM') {
                if (hours >= 1 && hours < 12) {
                    hours += 12;
                }
            }
        }
        return this._convertToISOFormat(pad(String(hours)), pad(String(minutes)));
    }

    private _isValidInput(value: string) {
        const numExp = /^\d{1,2}$/;
        return numExp.test(value);
    }

    private _isValidTime(value: number, type: string) {
        let valid = false;
        const numVal = Number(value);
        if (type === 'minutes') {
            valid = !!(numVal >= this._minMinutes && numVal <= this._maxMinutes);
        } else if (type === 'hours') {
            valid = !!(numVal >= this._minHours && numVal <= this._maxHours);
        }
        return valid;
    }

    private _parseAndSetTime(value: string): string | null {
        const valueInHoursAndMinutes = value.split(':');
        if (
            valueInHoursAndMinutes &&
            valueInHoursAndMinutes.length === 2 &&
            this._isValidInput(valueInHoursAndMinutes[0]) &&
            this._isValidInput(valueInHoursAndMinutes[1])
        ) {
            let hours = Number(valueInHoursAndMinutes[0]);
            const minutes = Number(valueInHoursAndMinutes[1]);
            if (this.twelveHourFormat) {
                // 24h to 12h conversion
                if (hours === 0) {
                    hours += 12;
                    this._toggleAMPM = 'AM';
                } else if (hours > 12 && hours <= 23) {
                    hours -= 12;
                    this._toggleAMPM = 'PM';
                } else if (hours === 12) {
                    this._toggleAMPM = 'PM';
                }
            }
            if (this._isValidTime(hours, 'hours') && this._isValidTime(minutes, 'minutes')) {
                this.hours = pad(String(hours));
                this.minutes = pad(String(minutes));
                // model value should always be in 24h format
                return this._timeInTwentyFourHourFormat(hours, minutes);
            }
        }

        return null;
    }

    writeValue(value: string) {
        this._hours = '';
        this._minutes = '';
        this._time = null;
        if (value) {
            this.time = this._parseAndSetTime(value) as string;
        }
        this.valueChange.emit(this.time);
    }

    private _onTouchedCallback: () => void = () => {};
    private _onChangeCallback: (_: any) => void = () => {};

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
