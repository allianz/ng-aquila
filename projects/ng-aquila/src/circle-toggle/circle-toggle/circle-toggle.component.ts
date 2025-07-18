import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  input,
  OnDestroy,
  Optional,
  Output,
  Self,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

import { NxCircleToggleGroupComponent } from '../circle-toggle-group/circle-toggle-group.component';
import { NxIconToggleButtonComponent } from '../icon-toggle-button/icon-toggle-button.component';
import { NxMobileToggleButtonComponent } from '../mobile-toggle-button/mobile-toggle-button.component';
import { ToggleButton } from './toggle-button';

/**
 * Appearance options for the circle toggle component.
 */
export type NxCircleToggleAppearance = 'default' | 'expert';

/**
 * Represents the default options for the circle toggle.
 * It can be configured using the `CIRCLE_TOGGLE_DEFAULT_OPTIONS` injection token.
 */
export interface CircleToggleDefaultOptions {
  /**
   * Sets the default appearance (optional).
   */
  appearance?: NxCircleToggleAppearance;
}

export const CIRCLE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken<CircleToggleDefaultOptions>(
  'CIRCLE_TOGGLE_DEFAULT_OPTIONS',
);

export class ToggleChangeEvent {
  constructor(
    /** A toggle button */
    readonly button: ToggleButton,
    /** The value of the toggle button that is sent with the event. */
    readonly value: string,
  ) {}
}

let nextId = 0;

@Component({
  selector: 'nx-circle-toggle',
  templateUrl: 'circle-toggle.component.html',
  styleUrls: ['circle-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ToggleButton,
      useExisting: forwardRef(() => NxCircleToggleComponent),
    },
    {
      provide: NxAbstractControl,
      useExisting: forwardRef(() => NxCircleToggleComponent),
    },
  ],
  host: {
    '[class.nx-toggle-circle]': 'true',
    '[class.in-group]': 'inGroup',
    '[class.is-disabled]': 'disabled',
    '[class.is-responsive]': 'responsive',
    '(focus)': '_forwardFocusToInput()',
    '[class.has-error]': 'hasError()',
    '[class.is-readonly]': 'readonly',
  },
  imports: [NxIconToggleButtonComponent, NxMobileToggleButtonComponent],
})
export class NxCircleToggleComponent
  extends ToggleButton
  implements OnDestroy, AfterViewInit, ControlValueAccessor, DoCheck, NxAbstractControl
{
  private _id = `toggle-button-${nextId++}`;

  @ViewChild('input') _nativeInput!: ElementRef<HTMLElement>;

  errorChildren = contentChildren(NxErrorComponent);

  ariaDescribedBy = input<string | null>(null);

  ariaDescribedByComputed: Signal<string | null> = computed(() => {
    if (!this.errorState() && !this.toggleGroup?.errorState() && !this.ariaDescribedBy()) {
      return null;
    }

    const errorMessageChildrenIds = this.errorChildren().map((errorMessage) => errorMessage.id);
    const toggleGroupDescribeBy = this.toggleGroup?.ariaDescribedBy();

    return [this.ariaDescribedBy(), errorMessageChildrenIds, toggleGroupDescribeBy].join(' ');
  });

  /** @docs-private */
  inGroup = false;

  errorState = signal(false);

  /**
   * Id of the circle toggle.
   *
   * If not set, the circle toggle gets an incremented value by default.
   */
  set id(value: string) {
    this._id = value;
    this._cdr.markForCheck();
  }
  get id(): string {
    return this._id;
  }

  /** Name that is used for accessibility. */
  @Input() set name(value: string) {
    this._name = value;
    this._cdr.markForCheck();
  }
  get name(): string {
    return this._name!;
  }
  private _name: string | null = null;

  /**
   * An event that is emitted when the checked state fo the circle toggle changes.
   */
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  /**
   * An event that is emitted when the checked state of the circle toggle changes.
   * The event object contains the circle toggle itself and its value (see ToggleChangeEvent).
   */
  @Output() readonly selectionChange = new EventEmitter<ToggleChangeEvent>();

  /** Whether the circle toggle is checked. */
  @Input() set checked(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this.checked !== newValue) {
      this._checked = newValue;
      this._cdr.markForCheck();
    }
  }
  get checked(): boolean {
    return this._checked;
  }
  _checked = false;

  /** The value that is used in the model. */
  @Input() set value(newValue: any) {
    this._value = newValue;
    this._cdr.markForCheck();
  }
  get value(): any {
    return this._value!;
  }
  private _value: any = null;

  /** Id of the icon that should be displayed. */
  @Input('icon') set iconName(name: string) {
    this._iconName = name;
    this._cdr.markForCheck();
  }
  get iconName(): string {
    return this._iconName!;
  }
  private _iconName: string | null = null;

  /** SVG that is displayed if the circle toggle is unchecked. */
  @Input() set svg(src: string) {
    this._svg = src;
    this._cdr.markForCheck();
  }
  get svg(): string {
    return this._svg!;
  }
  private _svg: string | null = null;

  /** SVG that is displayed if the circle toggle is checked. */
  @Input() set svgChecked(src: string) {
    this._svgChecked = src;
    this._cdr.markForCheck();
  }
  get svgChecked(): string {
    return this._svgChecked!;
  }
  private _svgChecked: string | null = null;

  /** A text that is displayed inside the circle toggle. */
  @Input() set circleText(value: string) {
    if (value !== this._circleText) {
      this._circleText = value;
      this._cdr.markForCheck();
    }
  }
  get circleText(): string {
    return this._circleText!;
  }
  private _circleText: string | null = null;

  /** Label displayed below the circle. */
  @Input() set label(value: string) {
    this._label = value;
    this._cdr.markForCheck();
  }
  get label(): string {
    return this._label!;
  }
  private _label: string | null = null;

  /** Additional hint displayed below the label. */
  @Input() set hint(value: string) {
    this._hint = value;
    this._cdr.markForCheck();
  }
  get hint(): string {
    return this._hint!;
  }
  private _hint: string | null = null;

  /** Whether the circle toggle uses the negative set of styling. */
  @Input({ transform: booleanAttribute }) set negative(value) {
    this._negative = value;
    // this call should be removed. this is left from a time where we wanted to
    // support the case where components are created dynamically and then you would set
    // inputs directly on the component instances bypassing Angular features
    // this has come a long way since then and setting inputs on dynamic components is now possible
    // for not breaking anyone's code by accident we keep this for now
    // @deletion-target 18.0.0
    this._cdr.markForCheck();
  }
  get negative(): boolean {
    return this._negative || !!this.toggleGroup?.negative;
  }
  private _negative = false;

  /** Whether the circle toggle has a responsive behavior. */
  @Input({ transform: booleanAttribute }) set responsive(value) {
    this._responsive = value;
    // this call should be removed. this is left from a time where we wanted to
    // support the case where components are created dynamically and then you would set
    // inputs directly on the component instances bypassing Angular features
    // this has come a long way since then and setting inputs on dynamic components is now possible
    // for not breaking anyone's code by accident we keep this for now
    // @deletion-target 18.0.0
    this._cdr.markForCheck();
  }
  get responsive(): boolean {
    if (this._isExpert) {
      return false;
    }
    return this._responsive || !!this.toggleGroup?.responsive;
  }
  private _responsive = false;

  /** Whether the circle toggle is disabled. */
  @Input({ transform: booleanAttribute }) set disabled(value) {
    this._disabled = value;
    // this call should be removed. this is left from a time where we wanted to
    // support the case where components are created dynamically and then you would set
    // inputs directly on the component instances bypassing Angular features
    // this has come a long way since then and setting inputs on dynamic components is now possible
    // for not breaking anyone's code by accident we keep this for now
    // @deletion-target 18.0.0
    this._cdr.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled || !!this.toggleGroup?.disabled;
  }
  private _disabled = false;

  @Input({ transform: booleanAttribute }) set readonly(value) {
    this._readonly = value;
  }
  get readonly() {
    return this.toggleGroup?.readonly ?? this._readonly;
  }
  private _readonly = false;

  /**
   * **Expert option**
   *
   * Sets the appearance of the circle toggle.
   *
   * Default: `'default'`.
   */
  @Input() set appearance(value: NxCircleToggleAppearance) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._cdr.markForCheck();
    }
  }
  get appearance(): NxCircleToggleAppearance {
    return this._appearance || this._defaultOptions?.appearance || 'default';
  }
  private _appearance?: NxCircleToggleAppearance;

  @HostBinding('class.is-expert') get _isExpert(): boolean {
    return this.appearance === 'expert';
  }

  get required() {
    const selfRequired =
      this.ngControl?.control?.hasValidator(Validators.required) ||
      this.ngControl?.control?.hasValidator(Validators.requiredTrue);
    const parentRequired = this.toggleGroup?.ngControl?.control?.hasValidator(Validators.required);
    return selfRequired ?? parentRequired ?? false;
  }

  /** @docs-private */
  @ViewChild(NxMobileToggleButtonComponent, { static: true })
  toggleButton!: NxMobileToggleButtonComponent;

  private _hover = false;

  /** Touched is set to true on touch devices. */
  _touched = false;

  /** @docs-private */
  @HostListener('mouseenter') onMouseEnter() {
    if (!this._touched) {
      this._hover = true;
    }
  }

  /** @docs-private */
  @HostListener('mouseleave') onMouseLeave() {
    if (!this._touched) {
      this._hover = false;
    }
  }

  /** @docs-private */
  @HostListener('touchstart') onTouchStart() {
    this._touched = true;
  }

  _removeUniqueSelectionListener: () => void = () => {};

  private onChangeCallback = (checked: boolean) => {};
  private onTouchedCallback = () => {};

  constructor(
    /** @docs-private */ @Optional() readonly toggleGroup: NxCircleToggleGroupComponent | null,
    private readonly _checkedDispatcher: UniqueSelectionDispatcher,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _focusMonitor: FocusMonitor,
    @Optional() @Self() readonly ngControl: NgControl | null,
    @Optional()
    @Inject(CIRCLE_TOGGLE_DEFAULT_OPTIONS)
    private readonly _defaultOptions: CircleToggleDefaultOptions | null,
  ) {
    super();

    if (this.toggleGroup) {
      this.inGroup = true;
      this.name = this.toggleGroup.name;
      this.id = this.toggleGroup.id + `-button-${nextId++}`;
    }
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    if (this.toggleGroup) {
      this.attachListenerForGroup();
      this.toggleGroup._stateChanges.pipe(takeUntilDestroyed()).subscribe(() => {
        this._cdr.markForCheck();
      });
    }
  }

  hasError = computed<boolean>(() => this.toggleGroup?.errorState() || this.errorState());

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.errorState.set(!this.ngControl.valid);
    }
  }

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._nativeInput);
  }

  ngOnDestroy(): void {
    // function returned by the listener
    this._removeUniqueSelectionListener();
    this._focusMonitor.stopMonitoring(this._nativeInput);
  }

  setReadonly(isReadonly: boolean) {
    this.readonly = isReadonly;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  attachListenerForGroup() {
    this._removeUniqueSelectionListener = this._checkedDispatcher.listen(
      (groupId: string, buttonId: string) => {
        if (this.id !== buttonId && groupId === this.toggleGroup?.id) {
          this.checked = false;
        }
      },
    );
  }

  writeValue(newValue: boolean): void {
    this.checked = newValue;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Focuses the radio button element. */
  focus(focusOrigin?: FocusOrigin) {
    this._focusMonitor.focusVia(this._nativeInput, focusOrigin as FocusOrigin);
  }

  /** Forward focus from host to hidden input field */
  _forwardFocusToInput() {
    this._nativeInput.nativeElement.focus();
  }

  /** @docs-private */
  toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled || this.readonly || (this.toggleGroup && this.checked)) {
      return;
    }

    this.checked = !this.checked;
    this.onChangeCallback(this.checked);
    this.checkedChange.emit(this.checked);
    this.selectionChange.emit(new ToggleChangeEvent(this, this.value));
    if (this.toggleGroup) {
      this._checkedDispatcher.notify(this.toggleGroup.id, this.id);
    }
  }

  /**
   * Method called by the group if the internal value of the group is changed programatically,
   * does not trigger change emission.
   * @docs-private
   */
  setGroupSelection(checked: boolean) {
    if (!this.toggleGroup) {
      return;
    }
    // propagate changes only if the value in the group is different than the button checked value
    this.checked = checked;
    this.onChangeCallback(this.checked);
    this._checkedDispatcher.notify(this.toggleGroup.id, this.id);
  }

  /** @docs-private */
  get svgButton(): boolean {
    return !!this.svg && !!this.svgChecked;
  }

  /** @docs-private */
  get svgUrl(): string {
    let useFilledSvg = this.checked || (!this.disabled && this._hover);
    if (this.negative) {
      useFilledSvg = !useFilledSvg;
    }
    return useFilledSvg ? this.svgChecked : this.svg;
  }

  /** @docs-private */
  get type() {
    return this.toggleGroup ? 'radio' : 'checkbox';
  }

  /** @docs-private */
  handleEnterKey(event: Event) {
    if (!this.toggleGroup) {
      this.toggle(event);
    }
  }

  touch() {
    this.onTouchedCallback();

    if (this.toggleGroup) {
      this.toggleGroup.touch();
    }
  }
}
