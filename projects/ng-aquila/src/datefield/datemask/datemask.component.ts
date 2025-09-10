import { NxFormfieldComponent, NxFormfieldControl } from '@allianz/ng-aquila/formfield';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { ErrorStateMatcher, IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  DoCheck,
  effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  input,
  model,
  ModelSignal,
  OnInit,
  runInInjectionContext,
  Signal,
  signal,
  ViewChild,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

import { NX_DATE_STRICT } from '../adapter';
import { NxDateAdapter } from '../adapter/date-adapter';
import { NxDateValidators } from '../date-validators';
import { NxDatefieldDirective } from '../datefield.directive';
import { NxDatepickerComponent } from '../datepicker/datepicker.component';
import { NxDatepickerInputInterface } from '../datepicker/datepicker-input.directive';
import { NxDatemaskIntl } from './datemask.intl';

@Directive({
  selector: 'input[nxDatemaskInput]',
  standalone: true,
  exportAs: 'nxDatemaskInput',
})
export class NxDatemaskInput {
  readonly elementRef = inject(ElementRef);
}
@Directive({
  selector: 'input[nxDatemaskDay]',
  standalone: true,
  exportAs: 'nxDatemaskDay',
})
export class NxDatemaskDayInput extends NxDatemaskInput {}

@Directive({
  selector: 'input[nxDatemaskMonth]',
  standalone: true,
  exportAs: 'nxDatemaskMonth',
})
export class NxDateMaskMonthInput extends NxDatemaskInput {}
@Directive({
  selector: 'input[nxDatemaskYear]',
  standalone: true,
  exportAs: 'nxDatemaskYear',
})
export class NxDatemaskYearInput extends NxDatemaskInput {}

@Component({
  selector: 'nx-datemask',
  imports: [
    CommonModule,
    NxDatemaskInput,
    NxDatemaskDayInput,
    NxDateMaskMonthInput,
    NxDatemaskYearInput,
    FormsModule,
  ],
  templateUrl: './datemask.component.html',
  styleUrl: './datemask.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NxFormfieldControl, useExisting: NxDatemaskComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxDatemaskComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxDatemaskComponent),
      multi: true,
    },
    {
      provide: NxAbstractControl,
      useExisting: forwardRef(() => NxDatemaskComponent),
    },
  ],
  standalone: true,
})
export class NxDatemaskComponent<D>
  implements
    NxDatepickerInputInterface<D>,
    NxFormfieldControl<D>,
    ControlValueAccessor,
    AfterViewInit,
    Validator,
    NxAbstractControl,
    DoCheck,
    OnInit,
    AfterContentInit
{
  /** @docs-private */
  ngControl: NgControl | null = null;

  /**
   * The minimum date that can be selected. Will be used for validation and DatePicker.
   */
  @Input() min: D | null = null;

  /**
   * The maximum date that can be selected. Will be used for validation and DatePicker.
   */
  @Input() max: D | null = null;

  /**
   * The aria-label that will be set on the date mask.
   * Usually not necessary to be set as the formfield label will connect automatically to this datemask.
   * Only usefull if there is no formfield label to connect to.
   * @default undefined
   */
  readonly ariaLabel = model<string | undefined>(undefined);

  /** @docs-private */
  @ViewChild('connectionContainer', { static: true }) _connectionContainerRef!: ElementRef;
  /** @docs-private */
  _disabledChange = new Subject<boolean>();
  readonly disabledSignal = toSignal(this._disabledChange);
  /** The NxDatepicker that should be connected to this datemask */
  datepicker = input<NxDatepickerComponent<D> | null>(null);

  /** Takes care of registering this datemask to the datepicker */
  private readonly _datepickerEffect = effect(() => {
    if (this.datepicker()) {
      this.registerDatepicker();
    }
  });

  /** The date value */
  @Input() set value(value: D | null) {
    this.writeValue(value);
  }
  get value(): D | null {
    return this.date();
  }

  /** Emits when the value changes (either due to user input or programmatic change). */
  readonly _valueChange = new EventEmitter<D | null>();
  /**
   * @docs-private
   * Value of the day input field
   */
  protected readonly _dayValue: ModelSignal<string | null> = model<string | null>(null);
  /**
   * @docs-private
   * Value of the month input field
   */
  protected readonly _monthValue: ModelSignal<string | null> = model<string | null>(null);
  /**
   * @docs-private
   * Value of the day input field
   */
  protected readonly _yearValue: ModelSignal<string | null> = model<string | null>(null);

  /**
   * Whether the date parsing should be strict
   * @default true
   */
  strictInputSignal = input<boolean | null>(null, { alias: 'strict' });
  /**
   * Whether the date parsing should be strict
   * @default true
   */
  strict = computed<boolean>(() => {
    if (this.strictInputSignal() !== null) {
      return this.strictInputSignal()!;
    }

    if (this._dateStrict !== null && this._dateStrict !== undefined) {
      return this._dateStrict;
    }

    return true;
  });

  private readonly _rawDateString: Signal<string> = computed<string>(() => {
    if (!!this._dayValue() && !!this._monthValue() && !!this._yearValue()) {
      return this.format()
        .replace(/d+/i, `${this._dayValue()}`)
        .replace(/m+/i, `${this._monthValue()}`)
        .replace(/y+/i, `${this._yearValue()}`);
    }

    return '';
  });

  /**
   * Date Value
   */
  protected readonly date: Signal<D | null> = computed<D | null>(() => {
    if (!!this._dayValue() && !!this._monthValue() && !!this._yearValue()) {
      const parsedDate = this._dateAdapter.parse(
        this._rawDateString(),
        this.format(),
        this.strict(),
      );

      return parsedDate;
    }

    return null;
  });

  /**
   * Emits when the date changes
   */
  private readonly _dateChangeEffect = effect(() => {
    this._valueChange.emit(this.date());
    this.onChange(this.date());
  });

  private readonly _injector = inject(Injector);

  /**
   * @docs-private
   */
  protected readonly datemaskIntl = inject(NxDatemaskIntl, { optional: true });

  protected readonly datemaskGroupAriaLabelledBy = computed(() => {
    if (this._formFieldComponent) {
      return this._formFieldComponent.labelId;
    }
    return null;
  });

  /** @docs-private  */
  protected inputs = viewChildren(NxDatemaskInput);
  /** @docs-private  */
  protected dayInput = viewChild(NxDatemaskDayInput);
  /** @docs-private  */
  protected monthInput = viewChild(NxDateMaskMonthInput);
  /** @docs-private  */
  protected yearInput = viewChild(NxDatemaskYearInput);
  /** @docs-private  */
  protected datemaskContainer = viewChild<ElementRef>('datemaskContainer');

  /**
   * The separator that will be shown in Browser.
   * Set if the separator should be different from the separator in the format setting
   * @default 'separator in format'
   */
  separatorInput = input<string | null>(null, { alias: 'separator' });
  /**
   * The separator that will be shown in Browser.
   * @default 'separator in format'
   */
  separator = computed(() => {
    if (this.separatorInput() !== null) {
      return this.separatorInput();
    }

    const anyLetterRegex = /[a-z]/gi;
    const strippedFormat = this.format().replace(anyLetterRegex, '');

    if (strippedFormat.length > 0) {
      return strippedFormat[0];
    }

    return '.';
  });

  /**
   * The date format.
   * Used to adjust the Mask Inputs as well as parsing dates.
   * The format has to be a numeric format only. So e.g. `DD.MM.YYYY | MM/DD/YYYY | YYYY-MM-DD`
   * @default 'DD.MM.YYYY'
   */
  format = input<string>('DD.MM.YYYY');

  /** @docs-private */
  private readonly _formatCheckEffect = effect(() => {
    const daysOccurances = [...this.format().matchAll(/(?=(D{2}))/g)];
    const monthOccurances = [...this.format().matchAll(/M{2}/g)];
    const yearOccurances = [...this.format().matchAll(/Y{4}/g)];

    if (
      daysOccurances.length !== 1 ||
      monthOccurances.length !== 1 ||
      yearOccurances.length !== 1
    ) {
      throw new Error(
        `Provided date format "${this.format()}" not an accepted format. Make sure to provide a complete Date formate with numeric values only and 4 digit years. `,
      );
    }
  });

  /** @docs-private */
  /**
   * Determnes the order of individual inputs
   */
  protected _inputOrder = computed<string>(() => {
    // remove any char that is not d|m|y
    const dmyRegex = /[^dmy]+/gi;
    let inputOrder = this.format().replace(dmyRegex, '');

    inputOrder = inputOrder.replace(/d+/i, 'd');
    inputOrder = inputOrder.replace(/m+/i, 'm');
    inputOrder = inputOrder.replace(/y+/i, 'y');

    return inputOrder;
  });
  // ymd | dmy

  /**
   * Callback function that is called when the control's value changes in the UI.
   */
  onChange = (_: any) => {};

  /**
   * Callback function that is called when the control's is touched.
   */
  onTouched = () => {};

  /**
   * @docs-private
   * Placeholder should be set in the DatemaskIntl class
   */
  placeholder: string = '';

  /**
   * The aria-describedby ids that will be set by the formfield
   */
  protected ariaDescribedByFormfield = signal<string[] | null>(null);

  /**
   * The aria-describedby attribute on the input for improved accessibility.
   */
  readonly ariaDescribedByInput = input<string | null>(null, { alias: 'ariaDescribedBy' });

  /**
   * The aria-describedby attribute on the input for improved accessibility.
   */
  protected ariaDescribedBy = computed<string | null>(() => {
    const input = this.ariaDescribedByInput();
    const formfield = this.ariaDescribedByFormfield();

    if (input && formfield) {
      return `${input}, ${formfield.join(' ')}`;
    } else if (input) {
      return input;
    }

    return formfield?.join(' ') || null;
  });

  /** State changes subject to notifiy the Formfield of changes */
  stateChanges = new Subject<void>();

  /** Whether the date mask is empty */
  get empty(): boolean {
    if (!this._dayValue() && !this._monthValue() && !this._yearValue()) {
      return true;
    }
    return false;
  }
  readonly id: string = inject(IdGenerationService).nextId('nx-datemask');

  focused: boolean = false;

  /**
   * Whether the Datemask is required
   */
  @Input() required: boolean = false;

  /**
   * Whether the Datemask should be disabled
   */
  @Input({ transform: booleanAttribute }) set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._disabledChange.next(value);
      this.stateChanges.next();
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  protected _disabled: boolean = false;

  /** Whether the Datemask is readonly */
  @Input({ transform: booleanAttribute }) set readonly(value: boolean) {
    if (this.readonlyState() !== value) {
      this.readonlyState.set(value);
      this.stateChanges.next();
    }
  }
  get readonly(): boolean {
    return this.readonlyState();
  }

  /**
   * @docs-private
   * Whether the Datemask is readonly.
   * @default false
   */
  readonly readonlyState = signal<boolean>(false);

  shouldLabelFloat: boolean | undefined = true;
  errorState: boolean = false;

  /**
   * Date filter method for validation and DatePicker.
   */
  @Input() dateFilter!: (date: D | null) => boolean;

  private readonly _elementReference: ElementRef = inject(ElementRef);
  private readonly _focusMonitor: FocusMonitor = inject(FocusMonitor);
  private readonly _dateAdapter: NxDateAdapter<D> = inject(NxDateAdapter<D>);
  private readonly _errorStateMatcher: ErrorStateMatcher = inject(ErrorStateMatcher);
  private readonly _dateStrict: boolean | null = inject(NX_DATE_STRICT, { optional: true });
  private readonly _formFieldComponent: NxFormfieldComponent | null = inject(NxFormfieldComponent, {
    optional: true,
  });
  private readonly _parentForm: NgForm | null = inject(NgForm, { optional: true });
  private readonly _parentFormGroup: FormGroupDirective | null = inject(FormGroupDirective, {
    optional: true,
  });

  _focus(): void {}

  /** Set the readonly state */
  setReadonly(value: boolean): void {
    this.readonly = value;
  }

  /** Returns the validators for the Datemask */
  validate(control: AbstractControl): ValidationErrors | null {
    const composedValidator = Validators.compose(this.getValidators());
    return composedValidator ? composedValidator(control) : null;
  }

  /** Returns the validators of the datefield. */
  getValidators(): ValidatorFn[] {
    return [
      NxDateValidators.parse(
        this._dateAdapter,
        this.format(),
        this._rawDateString(),
        this.strict(),
      ),
      NxDateValidators.min(this._dateAdapter, this.min),
      NxDateValidators.max(this._dateAdapter, this.max),
      NxDateValidators.filter(this._dateAdapter, this.dateFilter),
    ];
  }

  registerOnValidatorChange?(fn: () => void): void {}
  ngAfterViewInit(): void {
    runInInjectionContext(this._injector, () => {
      // running in injection context to make use of takeUntilDestroyed
      this._focusMonitor
        .monitor(this._elementReference, true)
        .pipe(takeUntilDestroyed())
        .subscribe((origin) => {
          if (this.focused && !origin) {
            this.onTouched();
          }
          this.focused = !!origin;
          this.stateChanges.next();
        });
    });
  }

  writeValue(obj: any): void {
    const isDate = this._dateAdapter.isDateInstance(obj);
    if (!isDate) {
      return;
    }

    const dayNumberValue = this._dateAdapter.getDate(obj);
    const monthNumberValue = this._dateAdapter.getMonth(obj) + 1;

    this._dayValue.set(dayNumberValue > 9 ? `${dayNumberValue}` : `0${dayNumberValue}`);
    this._monthValue.set(monthNumberValue > 9 ? `${monthNumberValue}` : `0${monthNumberValue}`);
    this._yearValue.set(`${this._dateAdapter.getYear(obj)}`);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected handleChange() {
    this.onChange(this.date());
  }

  /**
   * Set the disabled state of the datemask
   * @param isDisabled boolean
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Returns an element that overlays can attach to. */
  getConnectedOverlayOrigin(): ElementRef {
    return this._connectionContainerRef || this.elementRef;
  }

  private _updateErrorState() {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.ariaDescribedByFormfield.set(ids);
  }

  setAriaLabel(value: string): void {
    this.ariaLabel.set(value);
  }

  /**
   * @docs-private
   */
  get elementRef(): ElementRef<any> {
    return this._elementReference;
  }

  ngOnInit(): void {
    this.ngControl = this._injector.get(NgControl, null);
  }
  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this._updateErrorState();
    }
  }
  ngAfterContentInit(): void {
    runInInjectionContext(this._injector, () => {
      // running in injection context to make use of takeUntilDestroyed
      this.datepicker()
        ?.selectedChanged.pipe(takeUntilDestroyed())
        .subscribe((selected: D) => {
          this.value = selected;
        });
    });
  }

  selectContainer() {
    const container = this.datemaskContainer()?.nativeElement;
    if (container) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(container);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  registerDatepicker(): void {
    this.datepicker()!.registerInput(this as unknown as NxDatefieldDirective<D>);
  }

  dayBlur() {
    if (this._dayValue() && this._dayValue()!.length < 2) {
      this._dayValue.set(`0${this._dayValue()}`);
    }
  }

  monthBlur() {
    if (this._monthValue() && this._monthValue()!.length < 2) {
      this._monthValue.set(`0${this._monthValue()}`);
    }
  }

  yearBlur() {
    if (this.date() && this._dateAdapter.isValid(this.date()!)) {
      this._yearValue.set(`${this._dateAdapter.getYear(this.date()!)}`);
    }
  }

  keyPress(event: KeyboardEvent) {
    this.handleSelectAllInput(event);
    this.handleArrowKeyInput(event);
    this.handleBackspaceInput(event);
  }

  private handleSelectAllInput(event: KeyboardEvent) {
    // Check for Ctrl+A (Windows/Linux) or Cmd+A (Mac)
    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.selectContainer();
    }
  }

  private handleBackspaceInput(event: KeyboardEvent) {
    if (event.key !== 'Backspace') {
      return;
    }

    const target = event.target as HTMLInputElement;

    // If input is empty and backspace is pressed, focus previous input
    if (target.value.length === 0) {
      const inputIndex = this.inputs().findIndex(
        (input) => input.elementRef?.nativeElement === target,
      );

      if (inputIndex > 0) {
        event.preventDefault();
        const previousInput = this.inputs()[inputIndex - 1]?.elementRef?.nativeElement;
        if (previousInput) {
          this._focusMonitor.focusVia(previousInput, 'keyboard');
          setTimeout(() => previousInput.select(), 0);
        }
      }
    }
  }

  private handleArrowKeyInput(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }
    // Find the index of the input that triggered the event
    const inputIndex = this.inputs().findIndex(
      (input) => input.elementRef?.nativeElement === event.target,
    );

    if (inputIndex === -1) {
      return; // Event didn't come from any of our date mask inputs
    }

    let inputToSelect: HTMLInputElement;

    if (event.key === 'ArrowRight' && inputIndex < this.inputs().length - 1) {
      inputToSelect = this.inputs()[inputIndex + 1]?.elementRef.nativeElement;
      this._focusMonitor.focusVia(inputToSelect!, 'keyboard');
      setTimeout(() => inputToSelect?.select(), 0);
    }

    if (event.key === 'ArrowLeft' && inputIndex > 0) {
      inputToSelect = this.inputs()[inputIndex - 1]?.elementRef.nativeElement;
      this._focusMonitor.focusVia(inputToSelect!, 'keyboard');
      setTimeout(() => inputToSelect?.select(), 0);
    }
    event.preventDefault();
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text') || '';
    if (!pastedText) {
      return;
    }

    // Filter out non-numeric characters
    const numericText = pastedText.replace(/\D/g, '');
    if (!numericText) {
      return;
    }

    // Find the index of the input that triggered the paste event
    const inputIndex = this.inputs().findIndex(
      (input) => input.elementRef?.nativeElement === event.target,
    );

    if (inputIndex === -1) {
      return;
    }

    this.distributeTextAcrossInputs(numericText, inputIndex);
  }

  private distributeTextAcrossInputs(text: string, startIndex: number) {
    let remainingText = text;
    let currentIndex = startIndex;

    while (remainingText && currentIndex < this.inputs().length) {
      const currentInput = this.inputs()[currentIndex]?.elementRef
        ?.nativeElement as HTMLInputElement;
      if (!currentInput) {
        break;
      }

      const maxLength = parseInt(currentInput.getAttribute('maxlength') || '0', 10);
      const textToInsert = remainingText.substring(0, maxLength);

      // Set the value and trigger input event for proper change detection
      currentInput.value = textToInsert;
      currentInput.dispatchEvent(new Event('input', { bubbles: true }));

      remainingText = remainingText.substring(maxLength);
      currentIndex++;
    }

    // Focus the last input that received text or the next available input
    const lastInputIndex = Math.min(currentIndex - 1, this.inputs().length - 1);
    if (lastInputIndex >= 0) {
      const lastInput = this.inputs()[lastInputIndex]?.elementRef?.nativeElement;
      this._focusMonitor.focusVia(lastInput!, 'keyboard');
    }
  }

  protected _focusNextInput(event: InputEvent | Event) {
    const inputEvent = event as InputEvent;

    if (inputEvent.isTrusted && inputEvent.data! < '0' && inputEvent.data! > '9') {
      return; // Ignore up/down arrow keys for focusing next input
    }

    const target = event.target as HTMLInputElement;
    const maxLength = parseInt(target.getAttribute('maxlength') || '0', 10);

    // If current input is filled to max length, focus next input
    if (target.value.length === maxLength) {
      const inputIndex = this.inputs().findIndex(
        (input) => input.elementRef?.nativeElement === target,
      );

      if (inputIndex !== -1 && inputIndex < this.inputs().length - 1) {
        const nextInput = this.inputs()[inputIndex + 1]?.elementRef?.nativeElement;
        if (nextInput) {
          this._focusMonitor.focusVia(nextInput, 'keyboard');
          setTimeout(() => nextInput.select(), 0);
        }
      }
    }
  }
}
