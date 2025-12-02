import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { MappedStyles } from '@allianz/ng-aquila/core';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  ErrorStateMatcher,
  IdGenerationService,
  mapClassNames,
  pad,
} from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty, NumberInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  DoCheck,
  effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  inject,
  Injector,
  Input,
  input,
  LOCALE_ID,
  OnDestroy,
  Output,
  Renderer2,
  signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  Validator,
} from '@angular/forms';
import { Decimal } from 'decimal.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxAutoResizeDirective } from './auto-resize.directive';
import { NxNumberStepperIntl } from './number-stepper-intl';

const SIZE_MAPPING = {
  big: 'nx-stepper--big',
  normal: '',
};
const DEFAULT_CLASSES = ['nx-stepper'];
const INPUT_CLASSES = ['nx-stepper__input'];

const ALLOWED_CHARACTERS = new RegExp(/^-?\d+([,.]\d+)?$/g);
const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NxNumberStepperComponent),
  multi: true,
};
const CUSTOM_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NxNumberStepperComponent),
  multi: true,
};

/**
 * `Input('size') classNames` defines the size of the number stepper.
 *
 * Values: `'big' | 'normal'`.
 *
 * Default: `'normal'`.
 */
@Component({
  selector: 'nx-number-stepper',
  templateUrl: 'number-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['number-stepper.component.scss'],
  inputs: ['classNames: size'],
  host: {
    '[class.is-negative]': 'negative',
    '[class.is-disabled]': 'disabled',
    '[class.is-error]': '_isError()',
  },
  providers: [CUSTOM_VALUE_ACCESSOR, CUSTOM_VALIDATOR],
  imports: [NxButtonModule, NxIconModule, NxAutoResizeDirective, NgClass],
})
export class NxNumberStepperComponent
  extends MappedStyles
  implements ControlValueAccessor, Validator, OnDestroy, AfterViewInit, DoCheck
{
  /** @docs-private */
  numberInputValue!: string;

  decimalSeperator = '.';

  /** @docs-private */
  inputClassNames: string = mapClassNames('regular', INPUT_CLASSES);

  /** @docs-private */
  readonly inputId = inject(IdGenerationService).nextId('nx-number-stepper');

  /** @docs-private */
  readonly labelId = inject(IdGenerationService).nextId('nx-number-stepper-label');

  projectedLabel = viewChild(HTMLLabelElement);

  /** @docs-private */
  inputWidth!: number;

  ariaDescribedBy = input<string | null>(null);

  ariaDescribedByComputed = computed<string | null>(() => {
    this._errorState();
    // This is a workaround to not cause a breaking change for projected labels that are not wrapped in a label element.
    // if there is a projected label without a html label, we don't want to add the label id to the described by
    // should be removed with the next major version
    const hasProjectedLabelWithoutHtmlLabel =
      this.projectedLabelWrapper() && !this.projectedLabel();
    const hasDescribedBy = !!this.ariaDescribedBy() || this._isError();
    if (!hasDescribedBy && !hasProjectedLabelWithoutHtmlLabel) {
      return null;
    }

    const describedByIds = [
      ...(this._isError() ? this.errorMessages().map((e) => e.id) : []),
      this.ariaDescribedBy(),
    ];

    // Still the workaround for the projected label without html label
    // should be removed with the next major version
    if (hasProjectedLabelWithoutHtmlLabel) {
      describedByIds.push(this.labelId);
    }

    return describedByIds.join(' ');
  });

  /** @docs-private */
  projectedLabelWrapper = viewChild<ElementRef>('customLabel');
  projectedLabelElement = computed(() =>
    this.projectedLabelWrapper()?.nativeElement.querySelector('label'),
  );

  errorMessages = contentChildren(NxErrorComponent);

  /** @docs-private */
  @ViewChild(NxAutoResizeDirective, { static: true }) autoResize!: NxAutoResizeDirective;

  /** @docs-private */
  @ViewChild('nativeInput') nativeInput!: ElementRef;

  /** An event emitted on value change. */
  @Output('valueChange') readonly valueChange = new EventEmitter<number | null>();

  /** Whether the input should be resized. Default: false */
  @Input() set resize(value: BooleanInput) {
    this._resize = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get resize(): boolean {
    return this._resize;
  }
  private _resize = false;

  label = input<string | null>(null);

  /** Sets the aria-label for the increment button. */
  @Input() set incrementAriaLabel(value: string) {
    this._incrementAriaLabel = value;
  }
  get incrementAriaLabel(): string {
    return this._incrementAriaLabel;
  }
  private _incrementAriaLabel = '';

  /** Sets the aria-label for the decrement button. */
  @Input() set decrementAriaLabel(value: string) {
    this._decrementAriaLabel = value;
  }
  get decrementAriaLabel(): string {
    return this._decrementAriaLabel;
  }
  private _decrementAriaLabel = '';

  /** Sets the aria-label for the input of the number stepper. */
  inputAriaLabel = input<string | null>(null);

  ariaLabelledByComputed = computed(() => {
    const hasLabelValue = !!this.label();
    const hasProjectedLabel = this.projectedLabelWrapper()?.nativeElement?.children?.length > 0;
    return hasLabelValue || hasProjectedLabel ? this.labelId : null;
  });

  /** Sets the step size. Default: 1 */
  @Input() set step(value: NumberInput) {
    // only internal changes no need to call markForCheck
    this._step = Number(value);
  }
  get step(): number {
    return this._step;
  }
  private _step = 1;

  /** Sets the minimum accepted number. Default: 0 */
  @Input() set min(value: NumberInput) {
    this._min = Number(value);
  }
  get min(): number {
    return this._min;
  }
  private _min = 0;

  /** Sets the maximum accepted number. Default: 100 */
  @Input() set max(value: NumberInput) {
    this._max = Number(value);
  }
  get max(): number {
    return this._max;
  }
  private _max = 100;

  _value: WritableSignal<number | null> = signal(0);
  private inputValue: number | null | string = '';

  /** Sets the value of the number-stepper. */
  @Input() set value(value: number | null) {
    this._value.set(value);
    this.inputValue = value;
  }
  get value(): number | null {
    return this._value();
  }

  /** @docs-private */
  viewValue = computed(() => {
    if (this._value() === null && (this.inputValue === '' || this.inputValue === this._value())) {
      return '';
    }
    let value = this._value() ?? '';

    const isInputChange = this._value() !== this.inputValue;
    if (isInputChange && this.nativeInput?.nativeElement?.value) {
      value = this.nativeInput?.nativeElement?.value || '';
    }

    // remove front zero
    let viewValue = this.removeFrontZero(value!.toString());

    // padding format
    viewValue = this.leadingZero() ? pad(viewValue!.toString(), 2) : viewValue!.toString();

    // decimal format
    viewValue = viewValue.replace(/[,.]/g, this.decimalSeperator);
    return viewValue;
  });

  private removeFrontZero(str: string) {
    const isNegative = str[0] === '-';
    const numStr = isNegative ? str.slice(1) : str;

    const [intPart, decPart] = numStr.split('.');

    const cleanIntPart = intPart.replace(/^0+(?=\d)/, '');

    const result = decPart !== undefined ? `${cleanIntPart}.${decPart}` : cleanIntPart;

    return isNegative ? `-${result}` : result;
  }

  /** @docs-private */
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    // Apply trimmed value to input
    (event.target as HTMLInputElement).value = inputValue;
    this.inputValue = inputValue;
    let newValue;
    if (inputValue === '' || !this.validateUserInput(inputValue)) {
      newValue = null;
    } else {
      newValue = Number(inputValue.replace(/[,.]/g, '.'));
    }

    this._value.set(newValue);
    this.valueChange.emit(newValue);
    this.onChangeCallback(newValue);
  }

  /** Whether the negative set of styling should be used. */
  @Input() set negative(value: BooleanInput) {
    if (this._negative !== value) {
      this._negative = coerceBooleanProperty(value);
      this._cdr.markForCheck();
    }
  }
  get negative(): boolean {
    return this._negative;
  }
  private _negative = false;

  /**
   * Whether the number stepper value should have a leading zero.
   *
   * Default: `true`.
   */
  leadingZero = input(true, {
    transform: booleanAttribute,
  });

  /**
   * Whether the user input in the number stepper should be disabled.
   *
   * Default: `false`.
   */
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Whether the user can directly interact with the input field and buttons. Default: false */
  @Input('readonly') set readonly(value: BooleanInput) {
    this._readonly = coerceBooleanProperty(value);
  }
  get readonly(): boolean {
    return this._readonly;
  }
  private _readonly = false;

  /** Whether the user can directly interact with the input value via input field. Default: false */
  inputFieldReadonly = input(false, {
    transform: booleanAttribute,
    alias: 'inputFieldReadonly',
  });

  private readonly _destroyed = new Subject<void>();

  private readonly injector = inject(Injector);

  protected _errorState = signal(false);
  private readonly _errorStateMatcher = inject(ErrorStateMatcher);
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });
  protected _ngControl = signal<NgControl | null>(null);
  protected _isError = computed(() =>
    this._ngControl() ? this._errorState() : this.errorMessages().length > 0,
  );

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    _renderer: Renderer2,
    _elementRef: ElementRef,
    readonly _intl: NxNumberStepperIntl,
    @Inject(LOCALE_ID) private readonly localeId: string,
  ) {
    super(SIZE_MAPPING, _elementRef, _renderer, DEFAULT_CLASSES);

    this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._cdr.markForCheck());

    this.decimalSeperator = this.getDecimalSeparator(this.localeId);

    effect(() => {
      if (this.viewValue()) {
        afterNextRender(
          () => {
            this.triggerResize();
          },
          {
            injector: this.injector,
          },
        );
      }

      if (this.projectedLabelElement()) {
        this.projectedLabelElement()!.setAttribute('for', this.inputId);
      }
    });
  }

  ngAfterViewInit(): void {
    this._ngControl.set(this.injector.get(NgControl, null));
  }

  ngDoCheck(): void {
    const control = this._ngControl()?.control as FormControl | null;
    if (!control) {
      return;
    }
    this._updateErrorState();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _updateErrorState() {
    const oldState = this._errorState(),
      parent = this._parentFormGroup || this._parentForm,
      control = this._ngControl() ? (this._ngControl()?.control as FormControl) : null,
      newState = this._errorStateMatcher.isErrorState(control, parent);
    if (newState !== oldState) {
      this._errorState.set(newState);
    }
  }

  disabledButton() {
    if (this.readonly || this.disabled) {
      return true;
    }
    return null;
  }

  /* ControlValueAccessor Implementations */
  writeValue(value: number | null): void {
    this.value = value;
  }

  private onChangeCallback: (value: number | null) => void = () => {};

  registerOnChange(onChange: (value: number | null) => void): void {
    this.onChangeCallback = onChange;
  }
  /** @docs-private */
  onTouchedCallback: () => void = () => {};

  registerOnTouched(onTouched: () => void): void {
    this.onTouchedCallback = onTouched;
  }

  /**
   * Disables the stepper. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._cdr.markForCheck();
  }

  private getDecimalSeparator(locale: string) {
    const sampleDecimalNumber = 1.1;
    return (
      Intl.NumberFormat(locale)
        .formatToParts(sampleDecimalNumber)
        .find((part) => part.type === 'decimal')?.value || '.'
    );
  }

  /** @docs-private */
  validateUserInput(input: string) {
    return !!input.match(ALLOWED_CHARACTERS);
  }

  /** @docs-private */
  incrementOnClick() {
    this._increment();
    this.onTouchedCallback();
  }

  /** @docs-private */
  incrementOnKey(event: Event) {
    this._increment();
    event.preventDefault();
  }

  /** @docs-private */
  _increment() {
    let newValue;
    if (this.isBetweenLimits(this.value || 0)) {
      newValue = this.getNextGreaterValue(this.value || 0);
    } else {
      newValue = this.enforceLimits(this.value || 0);
    }

    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChangeCallback(newValue);
  }

  /** @docs-private */
  triggerResize() {
    if (this.resize) {
      this.autoResize.updateInputWidth();
      this._cdr.markForCheck();
    }
  }

  /** @docs-private */
  decrementOnClick() {
    this._decrement();
    this.onTouchedCallback();
  }

  /** @docs-private */
  decrementOnKey(event: Event) {
    this._decrement();
    event.preventDefault();
  }

  /** @docs-private */
  _decrement() {
    let newValue;
    if (this.isBetweenLimits(this.value || 0)) {
      newValue = this.getNextLowerValue(this.value || 0);
    } else {
      newValue = this.enforceLimits(this.value || 0);
    }

    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChangeCallback(newValue);
  }

  /** @docs-private */
  enforceLimits(value: number): number {
    if (value > this._max) {
      return this._max;
    } else if (value < this._min) {
      return this._min;
    }
    return value;
  }

  /** @docs-private */
  getNextLowerValue(start: number): number {
    // if there is an invalid input start is null
    if (!start) {
      start = 0;
    }

    let next: number;
    if (this.isValidStep(start)) {
      next = new Decimal(start).minus(new Decimal(this._step)).toNumber();
    } else {
      next = new Decimal(start).toNearest(this._step, Decimal.ROUND_DOWN).toNumber();
    }
    return this.enforceLimits(next);
  }

  /** @docs-private */
  getNextGreaterValue(start: number) {
    let next;
    if (!start) {
      start = 0;
    }
    if (this.isValidStep(start)) {
      next = new Decimal(start).plus(new Decimal(this._step)).toNumber();
    } else {
      next = new Decimal(start).toNearest(this._step, Decimal.ROUND_UP).toNumber();
    }
    return this.enforceLimits(next);
  }

  /** @docs-private */
  isBetweenLimits(value: number | Decimal) {
    const decimalMin = new Decimal(this._min);
    const decimalMax = new Decimal(this._max);
    const valueDecimal = new Decimal(value);
    return (
      valueDecimal.lessThanOrEqualTo(decimalMax) && valueDecimal.greaterThanOrEqualTo(decimalMin)
    );
  }

  /** @docs-private */
  isMinimum() {
    return this.value === this._min;
  }

  /** @docs-private */
  isMaximum() {
    return this.value === this._max;
  }

  /** @docs-private */
  isValidStep(value: number | Decimal | null) {
    if (value === null) {
      value = new Decimal(0);
    }
    const min = new Decimal(this._min);
    const valueDec = new Decimal(value);
    const checkValue = min.minus(valueDec).mod(new Decimal(this._step)).toNumber();

    if (this.isBetweenLimits(value) && (this.isMinimum() || this.isMaximum() || checkValue === 0)) {
      return true;
    }
    return false;
  }

  /** @docs-private */
  userInputToNumber(value: string): number {
    return parseInt(value, 10) || 0;
  }

  _validateFn() {
    if (this.value === null || !this.validateUserInput(String(this.value))) {
      if (this.inputValue === '') {
        return null;
      } else if (!this.validateUserInput(String(this.inputValue))) {
        return { nxNumberStepperFormatError: 'Not a valid number' };
      }
      return null;
    } else if (!this.isValidStep(this.value)) {
      // the manual user input must match min + n * step, e.g. minimum 1 step 2: 1, 3, 5, 7 etc.
      return { nxNumberStepperStepError: 'Value is not a valid step' };
    }
    return null;
  }

  handleBlur() {
    this.onTouchedCallback();
  }

  /** @docs-private */
  validate(c: FormControl) {
    return this._validateFn();
  }

  get _buttonType(): string {
    return 'secondary' + (this.negative ? ' negative' : '');
  }
}
