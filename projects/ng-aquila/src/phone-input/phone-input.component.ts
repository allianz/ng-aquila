import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NxDropdownComponent, NxDropdownOption } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent, NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { LocalizedCountryNames } from 'i18n-iso-countries';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getCountryCallingCodeFromNumber, getCountryCodeforCallingCode, getDialCodeByCountryCode, getSortedCountryCodes } from './country-data';
import { NxPhoneInputIntl } from './phone-input-intl';

let next = 0;

@Component({
    selector: 'nx-phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NxFormfieldControl, useExisting: NxPhoneInputComponent },
        { provide: NxAbstractControl, useExisting: NxPhoneInputComponent },
    ],
    host: {
        '[attr.id]': 'id',
    },
})
export class NxPhoneInputComponent implements ControlValueAccessor, NxFormfieldControl<any>, OnDestroy, DoCheck, OnInit, AfterViewInit, NxAbstractControl {
    @ViewChild(NxDropdownComponent, { static: true }) dropdown!: NxDropdownComponent;
    @Output() readonly focusOut = new EventEmitter<boolean>();
    @Output() readonly focusIn = new EventEmitter<boolean>();

    value: any;

    _inputValue = '';

    _describedBy = '';

    readonly stateChanges = new Subject<any>();

    get empty() {
        return !!this._inputValue;
    }

    focused = false;

    private readonly _uid = 'phone-input-' + next++;

    /** Sets the id of the phone input component. */
    @Input() set id(value: string) {
        this._id = value;
        this.stateChanges.next();
    }
    get id() {
        return this._id || this._uid;
    }
    private _id!: string;

    /** Whether the component should be required. */
    @Input() set required(value: BooleanInput) {
        const coercedValue = coerceBooleanProperty(value);
        if (this.#required !== coercedValue) {
            this.#required = coercedValue;
            this._cdr.markForCheck();
        }
    }
    get required(): boolean {
        return this.#required;
    }
    #required = false;

    /** Whether the component should be disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = value! as any; // TODO properly coerce input value
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Whether the component should be read only. */
    @Input() set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get readonly(): boolean {
        return this._readonly;
    }
    private _readonly = false;

    /** set readonly state */
    setReadonly(value: boolean) {
        this.readonly = value;
        this._cdr.markForCheck();
    }

    private _initialCountryCode = 'DE';

    /**
     * Sets the initial country to be selected in the dropdown. Format is the international
     * country code like DE, US.
     * If there is already a number in the input field changing this property has no effect.
     */
    @Input() set countryCode(value: string) {
        if (this._inputValue) {
            return;
        }
        this._initialCountryCode = value;
        this._countryCode = value;
    }
    get countryCode() {
        return this._countryCode;
    }
    private _countryCode = 'DE';

    /** Set the text at the top of the dropdown. The default value is 'Area Code'. */
    @Input() set areaCodeLabel(value: string) {
        this._areaCodeLabel = value;
    }
    get areaCodeLabel() {
        return this._areaCodeLabel || this._intl.areaCodeLabel;
    }
    private _areaCodeLabel!: string;

    /** Set the translations of the countries. */
    @Input() set countryNames(value: LocalizedCountryNames<any>) {
        this._countryNames = value;
        this._sortCountries();
    }
    get countryNames() {
        return this._countryNames || this._intl.countryNames;
    }
    private _countryNames!: LocalizedCountryNames<any>;

    /** The placeholder to be shown in the input field. */
    @Input() set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get placeholder() {
        return this._placeholder;
    }
    private _placeholder = '';

    // TODO we are disabling the floating label for now. the problem is: the label
    // is supposed to float next to the dropdown. we could introduce some changes to the
    // formfield that a control can also give something like an offset for the floating label
    // but for capacity reasons this has to be done at a later stage.
    readonly shouldLabelFloat?: boolean = true;
    /** @docs-private */
    errorState = false;
    readonly controlType?: string = 'nx-phone-input';

    _sortedCountries!: NxDropdownOption[];
    _countryCallingCode = getDialCodeByCountryCode(this.countryCode);

    private readonly _destroyed = new Subject<void>();

    /**
     * Function to format the value in the input part of the component.
     * The function is called on blur. The default function removes leading zeros.
     * Please note: to determine the model value the component will remove parenthesis,
     * whitespace and dash characters from the formatted input.
     */
    @Input() set inputFormatter(formatFn) {
        this._inputFormatter = formatFn;
        this._inputValue = this._inputFormatter(this._inputValue, this._countryCallingCode);
    }
    get inputFormatter() {
        return this._inputFormatter;
    }
    private _inputFormatter = (inputValue: string, countryCode: string) => this._removeLeadingZero(inputValue);

    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void = () => {};

    /** `View -> model callback called when select has been touched` */
    _onTouched = () => {};

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        private readonly _intl: NxPhoneInputIntl,
        @Optional() private readonly formFieldComponent: NxFormfieldComponent | null,
        /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        _intl.changes.pipe(takeUntil(this._destroyed)).subscribe(_ => {
            this._sortCountries();
            this._cdr.detectChanges();
        });
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnInit(): void {
        this._sortCountries();
    }

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this.dropdown.elementRef);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    setDescribedByIds(ids: string[]): void {
        this._describedBy = ids.join(' ');
        this.dropdown.setDescribedByIds(ids);
    }

    get _ariaLabelledBy() {
        return this.formFieldComponent?.labelId;
    }

    get elementRef(): ElementRef {
        return this._elementRef;
    }

    writeValue(value: any): void {
        if (typeof value === 'string') {
            const noWhitespaceNumber = value.replace(/\s/g, '');
            const { countryCallingCode, number } = getCountryCallingCodeFromNumber(noWhitespaceNumber || '+' + getDialCodeByCountryCode(this.countryCode)); // requires string starting with '+'
            this._countryCallingCode = countryCallingCode;
            this._inputValue = this.inputFormatter(number, countryCallingCode);
            this._countryCode = getCountryCodeforCallingCode(countryCallingCode);
        } else {
            this.value = '';
            this._inputValue = '';
            this._countryCode = this._initialCountryCode;
        }
        this._cdr.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
        this.stateChanges.next();
    }

    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    _onInputBlur() {
        this._onTouched();
        this._inputValue = this.inputFormatter(this._inputValue, this._countryCallingCode);

        if (!this.disabled) {
            this.focusOut.emit(true);
        }
    }

    _onInputFocus() {
        if (!this.disabled) {
            this.focusIn.emit(true);
        }
    }

    _onInput() {
        this.updateModel();
    }

    _onCountryChange(countryCode: string) {
        this._countryCode = countryCode;
        this._countryCallingCode = getDialCodeByCountryCode(this.countryCode);
        this._inputValue = this.inputFormatter(this._inputValue, this._countryCallingCode);

        this._onInput();
    }

    updateModel() {
        const hasNumber = typeof this._inputValue === 'string' && this._removeLeadingZero(this._trimInputValue(this._inputValue)).length > 0;

        if (hasNumber) {
            this._onChange(this.getModelValue());
        } else {
            this._onChange('');
        }
    }

    private _trimInputValue(value: string) {
        return value.replace(/[\s()\-/]/g, '');
    }

    private _removeLeadingZero(value: string) {
        // It is valid for an Italian landline phone numbers to start with 0.
        const italyCountryCallingCode = '39';
        const isItaly = this._countryCallingCode === italyCountryCallingCode;
        return isItaly ? value : value.replace(/^0/, '');
    }

    /** Returns the combined string of selected calling code + input number */
    getModelValue() {
        return '+' + this._getCallingCode(this.dropdown.value) + this._trimInputValue(this._removeLeadingZero(this._inputValue));
    }

    _getCallingCode(country: string) {
        return getDialCodeByCountryCode(country);
    }

    _sortCountries() {
        this._sortedCountries = getSortedCountryCodes(this.countryNames).map(country => this._getDropdownOption(country));
    }

    _getDropdownOption(country: string): NxDropdownOption {
        return {
            value: country,
            label: `${this._getCountryName(country)} (+${this._getCallingCode(country)})`,
        };
    }

    _getCountryName(countryCode: string) {
        const name = this.countryNames[countryCode];
        return Array.isArray(name) ? name[0] : name;
    }

    _getReadonlyValue() {
        return this.getModelValue();
    }
}
