/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  AppearanceType,
  FORMFIELD_DEFAULT_OPTIONS,
  FormfieldDefaultOptions,
  NxFormfieldComponent,
  NxFormfieldControl,
  NxFormfieldModule,
  NxFormfieldUpdateEventType,
} from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { ErrorStateMatcher, IdGenerationService, pad } from '@allianz/ng-aquila/utils';
import { ActiveDescendantKeyManager, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  inject,
  InjectionToken,
  Injector,
  Input,
  input,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  signal,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subject } from 'rxjs';

import { NxTimefieldIntl } from './timefield-intl';
import { NxTimefieldOption } from './timefield-option';
import { getClosestTime, getTimeArray } from './utils';

export const DEFAULT_END_TIME = '24:00';
export const DEFAULT_START_TIME = '00:00';
export const DEFAULT_TIME_SPAN = 30;

export type TimepickerOption = { value: string; label: string };
export type InputModeType = 'decimal' | 'numeric' | 'tel' | 'text';
export function TIMEFIELD_DEFAULT_OPTIONS_FACTORY(): TimefieldDefaultOptions {
  return {
    withTimepicker: false,
  };
}

export const TIMEFIELD_DEFAULT_OPTIONS = new InjectionToken<TimefieldDefaultOptions>(
  'FORMFIELD_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: TIMEFIELD_DEFAULT_OPTIONS_FACTORY,
  },
);

export class TimefieldDefaultOptions {
  withTimepicker = false;
}

@Component({
  selector: 'nx-timefield-control',
  template: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NxFormfieldControl, useExisting: NxTimefieldControl }],
})
export class NxTimefieldControl implements NxFormfieldControl<string> {
  timefield = inject(NxTimefieldComponent);
  ngControl = inject(NgControl, { optional: true, self: true });

  @Input() value: string | null = null;
  readonly stateChanges = new Subject<void>();
  get empty() {
    return !!this.value;
  }
  id: string = ''; // noop for now
  @Input() focused = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  readonly shouldLabelFloat = true;
  @Input() errorState = false;
  @Input() placeholder = '';
  controlType = 'nx-timefield';
  @Input() updateOn: NxFormfieldUpdateEventType = 'change';
  setDescribedByIds(ids: string[]): void {
    // noop
  }
  setAriaLabel?(value: string): void {
    // noop
  }
  get elementRef(): ElementRef<any> {
    return this.timefield.elementRef;
  }
}

@Component({
  selector: 'nx-timefield',
  templateUrl: './timefield.component.html',
  styleUrls: ['./timefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.has-error]': 'errorState()',
    '[class.is-negative]': 'negative',
    '[class.is-disabled]': 'disabled',
    '[class.has-timepicker]': 'withTimepicker',
    '(focusout)': '_onBlur($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxTimefieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxTimefieldComponent),
      multi: true,
    },
  ],
  imports: [
    NgClass,
    NxRadioModule,
    FormsModule,
    NxTimefieldControl,
    NxTimefieldOption,
    NxFormfieldModule,
    NxIconModule,
    NxRadioToggleModule,
    OverlayModule,
  ],
})
export class NxTimefieldComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy, DoCheck, OnInit, OnChanges, Validator
{
  /** @docs-private */
  errorState: WritableSignal<boolean> = signal(false);

  @ViewChild(NxFormfieldComponent) formfield!: NxFormfieldComponent;
  @ContentChild(NxErrorComponent) error: NxErrorComponent | undefined;
  _toggleAMPM!: string | null;
  protected isOpen = false;

  protected readonly intl = inject(NxTimefieldIntl);
  protected readonly focusMonitor = inject(FocusMonitor);
  ngControl: NgControl | null = null;

  /* The appearance of the formfield. Should be mostly handled via dependency injection and not over this input. */
  readonly appearance = input<AppearanceType>(this._formfieldDefaultOptions?.appearance ?? 'auto');
  /* The hint to be shown below the field. */
  @Input() hint = '';
  /* The optional label for the formfield. */
  readonly optionalLabel = input<string>('');
  /** The inputmode for the formfield. */
  readonly inputMode = input<InputModeType>('decimal');

  private _withTimepicker = false;
  /* Whether to show the timepicker. Not enabled by default. */
  @Input({ transform: booleanAttribute }) set withTimepicker(value: boolean) {
    this.focusMonitor.stopMonitoring(this.toggleButton?.nativeElement);
    this._withTimepicker = value;

    setTimeout(
      () => this.toggleButton && this.focusMonitor.monitor(this.toggleButton.nativeElement),
    );
  }
  get withTimepicker(): boolean {
    return this._withTimepicker;
  }

  /* Opt-in for the time validation. */
  readonly enableTimeValidation = input(false, { transform: booleanAttribute });

  /* Event that emits the time in 24h ISO format. */
  @Output() readonly valueChange = new EventEmitter<string>();

  @ViewChild('list') timePickerList?: ElementRef<HTMLUListElement>;
  @ViewChild('toggleButton') toggleButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('overlayOrigin') overlayOrigin!: CdkOverlayOrigin;
  @ViewChild('inputMinutes') inputMinutes!: ElementRef<HTMLInputElement>;
  @ViewChild('inputHours') inputHours!: ElementRef<HTMLInputElement>;
  @ViewChild(CdkConnectedOverlay) overlay?: CdkConnectedOverlay;
  @ViewChildren(NxTimefieldOption) timepickerOptions!: QueryList<NxTimefieldOption>;

  private readonly destroyRef = inject(DestroyRef);

  timeList: TimepickerOption[] = [];
  pickerValue: any;
  protected _keyManager?: ActiveDescendantKeyManager<NxTimefieldOption>;
  protected _focusOrigin: WritableSignal<FocusOrigin> = signal(null);

  handleKeyDown(event: KeyboardEvent) {
    this._focusOrigin.set('keyboard');
    if (!this.withTimepicker) {
      return;
    }
    if (
      !this.isOpen &&
      event.target instanceof HTMLButtonElement &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      // avoid triggering the button's click
      event.preventDefault();
    }

    if (this.isOpen) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.selectOption(this._keyManager?.activeItem?.value());
          break;
        default:
          this._keyManager?.onKeydown(event);
          break;
      }
    } else if (!this.isOpen && event.key !== 'Tab' && event.key !== 'Shift') {
      this.toggleOverlay();
    }
  }

  private readonly _idMinutes = inject(IdGenerationService).nextId('nx-timefield__minutes');
  /** The id of the minutes input field. */
  get idMinutes(): string {
    return this._idMinutes;
  }

  private readonly _idHours = inject(IdGenerationService).nextId('nx-timefield__hours');
  /** The id of the hours input field. */
  get idHours(): string {
    return this._idHours;
  }

  private readonly _idRadioGroup = inject(IdGenerationService).nextId('nx-timefield__radio-group');
  /** The id of the am/pm selection. */
  get idRadioGroup(): string {
    return this._idRadioGroup;
  }

  private readonly _idOptionList = inject(IdGenerationService).nextId('nx-timefield__list');
  /** The id of option list in the timepicker overlay. */
  get idOptionList(): string {
    return this._idOptionList;
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

  private readonly _maxMinutes = 59;
  /** @docs-private */
  get maxMinutes() {
    return this._maxMinutes;
  }

  private readonly _minMinutes = 0;
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
    return this._time!;
  }

  /** Whether to show the time in 12-hour format with AM/PM toggle. Default: false. */
  @Input() set twelveHourFormat(value: BooleanInput) {
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
  private _twelveHourFormat = false;

  /** Sets the label which is displayed on top of timefield. */
  @Input() set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._cdr.markForCheck();
    }
  }
  get label(): string {
    return this._label;
  }
  private _label!: string;

  /** Sets the AM radio button label which is displayed in radio group. */
  @Input() set labelAM(value: string) {
    if (this._labelAM !== value) {
      this._labelAM = value;
      this._cdr.markForCheck();
    }
  }
  get labelAM(): string {
    return this._labelAM;
  }
  private _labelAM = 'AM';

  /** Sets the PM radio button label which is displayed in radio group. */
  @Input() set labelPM(value: string) {
    if (this._labelPM !== value) {
      this._labelPM = value;
      this._cdr.markForCheck();
    }
  }
  get labelPM(): string {
    return this._labelPM;
  }
  private _labelPM = 'PM';

  /** Sets the placeholder of hours field. Default: 'hh' */
  @Input() set placeholderHours(value: string) {
    if (this._placeholderHours !== value) {
      this._placeholderHours = value;
      this._cdr.markForCheck();
    }
  }
  get placeholderHours(): string {
    return this._placeholderHours;
  }
  private _placeholderHours = 'hh';

  /** Sets the placeholder of minutes field. Default: 'mm' */
  @Input() set placeholderMinutes(value: string) {
    if (this._placeholderMinutes !== value) {
      this._placeholderMinutes = value;
      this._cdr.markForCheck();
    }
  }
  get placeholderMinutes(): string {
    return this._placeholderMinutes;
  }
  private _placeholderMinutes = 'mm';

  /** Whether the timefield is required. */
  @Input() set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  get required(): boolean {
    return this._required;
  }
  private _required!: boolean;

  /** Whether the timefield uses the negative set of styling. */
  @Input() set negative(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this._negative !== newValue) {
      this._negative = newValue;
      this._cdr.markForCheck();
    }
  }
  get negative() {
    return this._negative;
  }
  private _negative = false;

  readonly pickerStartTime = input(DEFAULT_START_TIME);
  readonly pickerEndTime = input(DEFAULT_END_TIME);
  readonly pickerTimeInterval = input(DEFAULT_TIME_SPAN, { transform: numberAttribute });

  /** Whether the timefield is disabled. */
  @Input() set disabled(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._cdr.markForCheck();
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

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

  protected hasFocus = false;

  get elementRef(): ElementRef<HTMLElement> {
    return this._elementRef;
  }

  protected _overlayWidth: string | number = '';

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _errorStateMatcher: ErrorStateMatcher,
    @Optional() private readonly _parentForm: NgForm | null,
    @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    readonly _intl: NxTimefieldIntl,
    private readonly _elementRef: ElementRef,
    private readonly injector: Injector,

    @Optional()
    @Inject(FORMFIELD_DEFAULT_OPTIONS)
    private readonly _formfieldDefaultOptions?: FormfieldDefaultOptions,
    @Optional()
    @Inject(TIMEFIELD_DEFAULT_OPTIONS)
    private readonly _timefieldDefaultOptions?: TimefieldDefaultOptions,
  ) {
    if (_timefieldDefaultOptions) {
      this.withTimepicker = this._timefieldDefaultOptions?.withTimepicker ?? false;
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.enableTimeValidation() || (!this.hours && !this.minutes)) {
      return null;
    }

    const hours = Number(this.hours);
    const minutes = Number(this.minutes);

    if (!this._isValidTime(hours, 'hours') || !this._isValidTime(minutes, 'minutes')) {
      return { timefieldValueError: true };
    }

    return control.value === null ? { timefieldValueError: true } : null;
  }

  ngAfterViewInit() {
    // this.focusMonitor.monitor(this.toggleButton?.nativeElement);
    this._keyManager = new ActiveDescendantKeyManager(this.timepickerOptions).withWrap();
    this._keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this._keyManager?.activeItem) {
        this.scrollOptionIntoView(this._keyManager?.activeItem);
      }
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

  ngOnInit() {
    this._createTimelist();
    this.ngControl = this.injector.get(NgControl, null);
  }

  private _createTimelist() {
    this.timeList = getTimeArray(
      this.pickerStartTime(),
      this.pickerEndTime(),
      this.pickerTimeInterval(),
      this.twelveHourFormat,
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.time ||
      changes.pickerStartTime ||
      changes.pickerEndTime ||
      changes.pickerTimeInterval ||
      changes.twelveHourFormat
    ) {
      this._createTimelist();
      setTimeout(() => this.scrollSelectedItemIntoView());
    }
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.toggleButton?.nativeElement);
  }

  /** @docs-private */
  updateErrorState() {
    const oldState = this.errorState();
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);
    if (newState !== oldState) {
      this.errorState.set(newState);
    }
  }

  toggleOverlay() {
    this.isOpen ? this.closeOverlay() : this.openOverlay();
  }

  openOverlay() {
    if (this.disabled) {
      return;
    }
    this._overlayWidth = this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    this.isOpen = true;
    setTimeout(() => {
      this.scrollSelectedItemIntoView();
    });
  }

  closeOverlay() {
    this.isOpen = false;
    this._onTouchedCallback();
  }

  toggleButtonClick() {
    this._focusOrigin.set('mouse');
    this.toggleOverlay();
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
    this.hasFocus = true;
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

  _onInput(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    if (type === 'hours') {
      this.hours = target.value;
      if (target.value.length === 2 && target.selectionStart === 2) {
        this.inputMinutes.nativeElement.focus();
      }
      // user has entered the first digit again. for quicker typing select the second digit
      if (target.value.length === 2 && target.selectionStart === 1) {
        target.selectionEnd = 2;
      }
    } else if (type === 'minutes') {
      this.minutes = target.value;
    }
    this._updateTime();
    const closestOption = this.findClosestOption(this.time);
    if (closestOption) {
      this._keyManager?.setActiveItem(closestOption);
    }
  }

  _onBlur(event: FocusEvent) {
    if (
      !this.elementRef.nativeElement.contains(event.relatedTarget as HTMLElement) &&
      !this.overlay?.overlayRef?.overlayElement?.contains(event.relatedTarget as HTMLElement)
    ) {
      this._onTouchedCallback();
      this.hasFocus = false;
      this.closeOverlay();
    }
  }

  _onInputBlur(element: 'hours' | 'minutes') {
    // set 0X is the value entered in X
    if (element === 'hours' && Number(this.hours) < 10 && this.hours !== '') {
      this.hours = pad(String(this.hours));
    } else if (element === 'minutes' && Number(this.minutes) < 10 && this.minutes !== '') {
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

  selectOption(value?: string) {
    if (!value) {
      return;
    }
    const [hours] = value.split(':');

    this._toggleAMPM = Number(hours) >= 12 ? 'PM' : 'AM';
    this.writeValue(value);
    this.closeOverlay();
  }

  preventFocus(event: Event) {
    event.preventDefault();
  }

  scrollSelectedItemIntoView() {
    const selectedItem = this.findClosestOption(this.time);
    if (selectedItem) {
      this._keyManager?.setActiveItem(selectedItem);
      this.scrollOptionIntoView(selectedItem);
    }
  }

  findClosestOption(time: string) {
    const closestTime = getClosestTime(
      this.timeList.map((t) => t.value),
      time || '00:00',
    );
    const option = this.timepickerOptions?.find(
      (timepickerOption) => timepickerOption.value() === closestTime,
    );
    return option;
  }

  scrollOptionIntoView(option: NxTimefieldOption) {
    option.element.scrollIntoView({ block: 'center' });
  }

  writeValue(value: string) {
    this._hours = '';
    this._minutes = '';
    this._time = null;
    if (value) {
      this.time = this._parseAndSetTime(value)!;
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

  getLabelledBy() {
    if (this.formfield) {
      return this.formfield.labelId;
    }
    return null;
  }
}
