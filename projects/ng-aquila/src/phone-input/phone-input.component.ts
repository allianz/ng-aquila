import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NxDropdownComponent, NxDropdownOption } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent, NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { LocalizedCountryNames } from 'i18n-iso-countries';
import { Subject, Subscription } from 'rxjs';

import { getCountryCallingCodeFromNumber, getCountryCodeforCallingCode, getDialCodeByCountryCode, getSortedCountryCodes } from './country-data';
import { NxPhoneInputIntl } from './phone-input-intl';

let next = 0;

@Component({
    selector: 'nx-phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NxFormfieldControl, useExisting: NxPhoneInputComponent }],
    host: {
        '[attr.id]': 'id',
    },
})
export class NxPhoneInputComponent implements ControlValueAccessor, NxFormfieldControl<any>, OnDestroy, DoCheck, OnInit, AfterViewInit {
    @ViewChild(NxDropdownComponent, { static: true }) dropdown!: NxDropdownComponent;

    value: any;

    _inputValue: string = '';

    _describedBy = '';

    readonly stateChanges = new Subject<any>();

    get empty() {
        return !!this._inputValue;
    }

    focused: boolean = false;

    private _uid = 'phone-input-' + next++;

    private _id!: string;

    /** Sets the id of the phone input component. */
    @Input()
    get id() {
        return this._id || this._uid;
    }
    set id(value: string) {
        this._id = value;
        this.stateChanges.next();
    }

    /** Whether the component should be required. */
    @Input() required!: boolean;
    private _disabled: boolean = false;

    /** Whether the component should be disabled. */
    @Input()
    get disabled() {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    private _readonly = false;

    /** Whether the component should be read only. */
    @Input()
    get readonly() {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _countryCode = 'DE';
    private _initialCountryCode = 'DE';

    /** Sets the initial country to be selected in the dropdown. Format is the international
     * country code like DE, US.
     * If there is already a number in the input field changing this property has no effect.
     */
    @Input()
    set countryCode(value: string) {
        if (this._inputValue) {
            return;
        }
        this._initialCountryCode = value;
        this._countryCode = value;
    }
    get countryCode() {
        return this._countryCode;
    }

    private _areaCodeLabel!: string;

    /** Set the text at the top of the dropdown. The default value is 'Area Code'. */
    @Input()
    get areaCodeLabel() {
        return this._areaCodeLabel || this._intl.areaCodeLabel;
    }
    set areaCodeLabel(value: string) {
        this._areaCodeLabel = value;
    }

    private _countryNames!: LocalizedCountryNames<any>;

    /** Set the translations of the countries. */
    @Input()
    get countryNames() {
        return this._countryNames || this._intl.countryNames;
    }
    set countryNames(value: LocalizedCountryNames<any>) {
        this._countryNames = value;
        this._sortCountries();
    }

    private _placeholder: string = '';

    /** The placeholder to be shown in the input field. */
    @Input()
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    /**
     * Function to format the value in the input part of the component.
     * The function is called on blur. The default function removes leading zeros.
     * Please note: to determine the model value the component will remove parenthesis,
     * whitespace and dash characters from the formatted input.
     */
    @Input()
    get inputFormatter() {
        return this._inputFormatter;
    }
    set inputFormatter(formatFn) {
        this._inputFormatter = formatFn;
        this._inputValue = this._inputFormatter(this._inputValue, this._countryCallingCode);
    }

    // TODO: we are disabling the floating label for now. the problem is: the label
    // is supposed to float next to the dropdown. we could introduce some changes to the
    // formfield that a control can also give something like an offset for the floating label
    // but for capacity reasons this has to be done at a later stage.
    readonly shouldLabelFloat?: boolean = true;
    /** @docs-private */
    errorState: boolean = false;
    readonly controlType?: string = 'nx-phone-input';

    _sortedCountries!: NxDropdownOption[];
    _countryCallingCode: string = '';

    private _subscriptions = new Subscription();

    private _inputFormatter = (inputValue: string, countryCode: string) => {
        return this._removeLeadingZero(inputValue);
    };

    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void = () => {};

    /** `View -> model callback called when select has been touched` */
    _onTouched = () => {};

    constructor(
        private _elementRef: ElementRef,
        private _focusMonitor: FocusMonitor,
        private _changeDetectorRef: ChangeDetectorRef,
        private _errorStateMatcher: ErrorStateMatcher,
        private _intl: NxPhoneInputIntl,
        @Optional() private formFieldComponent: NxFormfieldComponent,
        /** @docs-private */
        @Self() @Optional() public ngControl: NgControl,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        const intlSubscription = _intl.changes.subscribe(_ => {
            this._sortCountries();
            this._changeDetectorRef.detectChanges();
        });

        this._subscriptions.add(intlSubscription);
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnInit() {
        this._sortCountries();
    }

    ngAfterViewInit() {
        this._focusMonitor.monitor(this.dropdown.elementRef);
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    setDescribedByIds(ids: string[]): void {
        this._describedBy = ids.join(' ');
        this.dropdown.setDescribedByIds(ids);
    }

    get _ariaLabelledBy() {
        return this.formFieldComponent.labelId;
    }

    get elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    writeValue(value: any): void {
        if (value) {
            const noWhitespaceNumber = value.replace(/\s/g, '');
            const { countryCallingCode, number } = getCountryCallingCodeFromNumber(noWhitespaceNumber);
            this._countryCallingCode = countryCallingCode;
            this._inputValue = this.inputFormatter(number, countryCallingCode);
            this._countryCode = getCountryCodeforCallingCode(countryCallingCode);
        } else {
            this.value = '';
            this._inputValue = '';
            this._countryCode = this._initialCountryCode;
        }
        this._changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
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
    }

    _onInput() {
        this.updateModel();
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
        return value.replace(/[()\-\/\s]/g, '');
    }

    private _removeLeadingZero(value: string) {
        return value.replace(/^0/, '');
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

    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
}
