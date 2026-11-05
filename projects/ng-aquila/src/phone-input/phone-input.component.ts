import {
  NxDropdownComponent,
  NxDropdownModule,
  NxDropdownOption,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent, NxFormfieldControl } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { ErrorStateMatcher } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  NgControl,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LocalizedCountryNames } from 'i18n-iso-countries';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  getCountryCallingCodeFromNumber,
  getCountryCodeforCallingCode,
  getDialCodeByCountryCode,
  getSortedCountryCodes,
} from './country-data';
import { NxPhoneInputIntl } from './phone-input-intl';

let next = 0;

/**
 * Parses a number into calling code + line number, or returns `null` if it can't be
 * parsed. Unparseable values are a normal state here: `nxPhoneInputParseValidator`
 * reports them instead of `writeValue()` throwing during a CVA lifecycle call.
 */
function parseNumber(value: string): { countryCallingCode: string; number: string } | null {
  try {
    return getCountryCallingCodeFromNumber(value.replace(/\s/g, ''));
  } catch {
    return null;
  }
}

/**
 * Reports values the component cannot represent, e.g. a number without a leading '+'
 * and calling code. Whether such a number is a real, dialable one stays with the
 * consumer's validators.
 */
const nxPhoneInputParseValidator: ValidatorFn = (control) => {
  const value = control.value;

  // An empty value is the concern of `Validators.required`, not of parsing.
  if (typeof value !== 'string' || value === '') {
    return null;
  }

  return parseNumber(value) ? null : { nxPhoneInputParse: { text: value } };
};

/** The phone input's current value split into its parts. */
export interface NxPhoneInputParsedValue {
  /** The calling code with a leading '+', e.g. '+49'. */
  callingCode: string;
  /** The country code, e.g. 'DE'. */
  countryCode: string;
  /** The line number without calling code and formatting characters, e.g. '89123456'. */
  number: string;
}

@Component({
  selector: 'nx-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NxFormfieldControl, useExisting: NxPhoneInputComponent },
    { provide: NxAbstractControl, useExisting: NxPhoneInputComponent },
    { provide: NG_VALIDATORS, useValue: nxPhoneInputParseValidator, multi: true },
  ],
  host: {
    '[attr.id]': 'id',
    role: 'group',
    '[attr.aria-labelledby]': '_ariaLabelledBy',
  },
  imports: [NxDropdownModule, FormsModule, NxIconModule],
})
export class NxPhoneInputComponent
  implements
    ControlValueAccessor,
    NxFormfieldControl<any>,
    OnDestroy,
    DoCheck,
    OnInit,
    AfterViewInit,
    NxAbstractControl
{
  @ViewChild(NxDropdownComponent, { static: true }) dropdown!: NxDropdownComponent;
  private readonly _numberInput = viewChild<ElementRef<HTMLInputElement>>('numberInput');
  private readonly _readonlyNumberInput =
    viewChild<ElementRef<HTMLInputElement>>('readonlyNumberInput');
  @Output() readonly focusOut = new EventEmitter<boolean>();
  @Output() readonly focusIn = new EventEmitter<boolean>();

  value: any;

  protected readonly _inputValue = signal('');

  _describedBy = '';

  readonly stateChanges = new Subject<void>();

  get empty() {
    return !this._inputValue();
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
    this._required = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get required(): boolean {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  protected _required: boolean | undefined;

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
    if (this._inputValue()) {
      return;
    }
    this._initialCountryCode = value;
    this._countryCode.set(value);
  }
  get countryCode() {
    return this._countryCode();
  }
  private readonly _countryCode = signal('DE');

  /** Set the text at the top of the dropdown and aria-label of area code field. The default value is 'Area Code'. */
  @Input() set areaCodeLabel(value: string) {
    this._areaCodeLabel = value;
  }
  get areaCodeLabel() {
    return this._areaCodeLabel || this._intl.areaCodeLabel;
  }
  private _areaCodeLabel!: string;

  /** Sets the aria-label of line number field. */
  @Input() set lineNumberLabel(value: string) {
    this._lineNumberLabel = value;
  }
  get lineNumberLabel() {
    return this._lineNumberLabel || this._intl.lineNumberAriaLabel;
  }
  private _lineNumberLabel: string = '';

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
  private readonly _countryCallingCode = computed(
    () => getDialCodeByCountryCode(this._countryCode()) ?? '',
  );

  /**
   * The current value split into calling code, country code and line number, e.g.
   * `{ callingCode: '+49', countryCode: 'DE', number: '89123456' }`.
   * It is `null` while there is no line number or the value cannot be parsed.
   */
  readonly parsedValue = computed<NxPhoneInputParsedValue | null>(() => {
    const parsed = parseNumber(this.getModelValue());
    if (!parsed?.number) {
      return null;
    }
    return {
      callingCode: '+' + parsed.countryCallingCode,
      countryCode: this._resolveCountryCode(parsed.countryCallingCode),
      number: parsed.number,
    };
  });

  private readonly _destroyed = new Subject<void>();

  /**
   * Function to format the value in the input part of the component.
   * The function is called on blur. The default function removes leading zeros.
   * Please note: to determine the model value the component will remove parenthesis,
   * whitespace and dash characters from the formatted input.
   */
  @Input() set inputFormatter(formatFn) {
    this._inputFormatter = formatFn;
    this._formatInputValue();
  }
  get inputFormatter() {
    return this._inputFormatter;
  }
  private _inputFormatter = (inputValue: string, countryCode: string) =>
    this._removeLeadingZero(inputValue);

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

    _intl.changes.pipe(takeUntil(this._destroyed)).subscribe((_) => {
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

  /**
   * Moves focus to the line number input, not the country dropdown, since the label names
   * the phone number.
   */
  onContainerClick(): void {
    (this._readonlyNumberInput() ?? this._numberInput())?.nativeElement.focus();
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
      const parsed = parseNumber(
        noWhitespaceNumber ||
          '+' + getDialCodeByCountryCode(this.countryCode || this._initialCountryCode),
      );
      if (parsed) {
        this._countryCode.set(this._resolveCountryCode(parsed.countryCallingCode));
        this._inputValue.set(this.inputFormatter(parsed.number, parsed.countryCallingCode));
      } else {
        this._inputValue.set(noWhitespaceNumber);
        this._countryCode.set('');
      }
    } else {
      this.value = '';
      this._inputValue.set('');
      this._countryCode.set(this._initialCountryCode);
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
    const modelValue = this.getModelValue();
    const parsed = parseNumber(this._trimInputValue(this._inputValue()));
    if (parsed) {
      this._countryCode.set(this._resolveCountryCode(parsed.countryCallingCode));
      this._inputValue.set(parsed.number);
    }

    this._formatInputValue();

    if (this.getModelValue() !== modelValue) {
      this.updateModel();
    }
    // Last, so that `updateOn: 'blur'` controls commit the updated model value.
    this._onTouched();

    if (!this.disabled) {
      this.focused = false;
      this.focusOut.emit(true);
    }
  }

  _onInputFocus() {
    if (!this.disabled) {
      this.focused = true;
      this.focusIn.emit(true);
    }
  }

  _onInput() {
    this.updateModel();
  }

  _onCountryChange(countryCode: string) {
    this._countryCode.set(countryCode);
    this._formatInputValue();

    this._onInput();
  }

  updateModel() {
    const trimmed = this._trimInputValue(this._inputValue());
    const parsed = parseNumber(trimmed);
    const hasNumber = parsed
      ? this._removeLeadingZero(parsed.number, parsed.countryCallingCode).length > 0
      : this._removeLeadingZero(trimmed).length > 0;

    if (hasNumber) {
      this._onChange(this.getModelValue());
    } else {
      this._onChange('');
    }
  }

  private _formatInputValue() {
    this._inputValue.set(
      this.inputFormatter(this._trimInputValue(this._inputValue()), this._countryCallingCode()),
    );
  }

  /**
   * Keeps the selected country, or the initial one while none is selected, when it shares
   * the calling code, e.g. CA and US share +1.
   */
  private _resolveCountryCode(callingCode: string) {
    const countryCode = this._countryCode() || this._initialCountryCode;
    return getDialCodeByCountryCode(countryCode) === callingCode
      ? countryCode
      : getCountryCodeforCallingCode(callingCode);
  }

  private _trimInputValue(value: string) {
    return (value ?? '').replace(/[\s()\-/]/g, '');
  }

  private _removeLeadingZero(value: string, callingCode = this._countryCallingCode()) {
    // It is valid for an Italian landline phone numbers to start with 0.
    const italyCountryCallingCode = '39';
    const isItaly = callingCode === italyCountryCallingCode;
    // Without a calling code there is nothing to read the 0 as a trunk prefix against,
    // and the value has to round-trip so the input, the model and the
    // `nxPhoneInputParse` error text keep showing the same number.
    const hasNoCountry = !callingCode;
    return isItaly || hasNoCountry ? value : value.replace(/^0/, '');
  }

  /** Returns the combined string of selected calling code + input number */
  getModelValue() {
    const trimmed = this._trimInputValue(this._inputValue());
    // A typed number brings its own calling code, which blur then moves into the dropdown.
    if (trimmed.startsWith('+')) {
      const parsed = parseNumber(trimmed);
      return parsed
        ? '+' +
            parsed.countryCallingCode +
            this._removeLeadingZero(parsed.number, parsed.countryCallingCode)
        : trimmed;
    }
    const number = this._removeLeadingZero(trimmed);
    // No country selected yet (e.g. un-parsable number): there is no calling code to
    // prefix, so only the special characters are removed and the number stays unparseable.
    if (!this.countryCode) {
      return number;
    }
    return '+' + this._getCallingCode(this.countryCode) + number;
  }

  _getCallingCode(country: string) {
    return getDialCodeByCountryCode(country);
  }

  _sortCountries() {
    this._sortedCountries = getSortedCountryCodes(this.countryNames).map((country) =>
      this._getDropdownOption(country),
    );
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
