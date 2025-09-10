import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { ErrorStateMatcher, IdGenerationService } from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  contentChildren,
  DoCheck,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Self,
  Signal,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';

import { ToggleButton } from '../circle-toggle/toggle-button';

/**
 * Appearance options for the circle toggle group component.
 */
export type NxCircleToggleGroupAppearance = 'default' | 'expert';

/**
 * Represents the default options for the circle toggle group.
 * It can be configured using the `CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS` injection token.
 */
export interface CircleToggleGroupDefaultOptions {
  /**
   * Sets the default appearance (optional).
   */
  appearance?: NxCircleToggleGroupAppearance;
}

export const CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS =
  new InjectionToken<CircleToggleGroupDefaultOptions>('CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS');

@Component({
  selector: 'nx-circle-toggle-group',
  template: `<ng-content></ng-content>
    @if (errorState()) {
      <ng-content select="nx-error"></ng-content>
    }`,
  styleUrls: ['./circle-toggle-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NxAbstractControl, useExisting: forwardRef(() => NxCircleToggleGroupComponent) },
  ],
  host: {
    '[class.is-responsive]': 'responsive',
    '[class.is-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled || readonly || false',
    '[attr.aria-labelledby]': 'name',
    '[attr.aria-required]': 'required',
    '[class.has-error]': 'errorState',
    '[attr.name]': 'name',
    '[attr.id]': 'id',
    '[class.nx-circle-toggle-group]': 'true',
    role: 'radiogroup',
  },
  imports: [],
})
export class NxCircleToggleGroupComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy, DoCheck, NxAbstractControl
{
  /**
   * Id of the circle toggle group.
   *
   * If not set, the circle toggle group gets an incremented value by default.
   */
  set id(value: string) {
    this._id = value;
    this._cdr.markForCheck();
  }
  get id(): string {
    return this._id;
  }
  private _id = inject(IdGenerationService).nextId('nx-circle-toggle-group');

  private readonly errorChildren = contentChildren(NxErrorComponent);
  ariaDescribedBy: Signal<string | null> = computed(() => {
    if (this.errorState() && this.errorChildren().length > 0) {
      return this.errorChildren()
        .map((errorChild) => errorChild.id)
        .join(' ');
    }
    return null;
  });

  // emits when the internal state changes on properties which are relevant
  // for the child components so that they can mark themself for check
  readonly _stateChanges = new Subject<void>();

  get required(): boolean {
    return this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }

  /** @docs-private this is meant to be called by the radio buttons in this group. */
  touch() {
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  /** Name that is used for accessibility. */
  @Input() set name(value: string) {
    this._name = value;
    this.updateToggleButtonsNames();
    this._cdr.markForCheck();
  }
  get name(): string {
    return this._name;
  }
  private _name = inject(IdGenerationService).nextId('toggle-group');
  /** Whether the circle toggle group is disabled. */
  @Input() set disabled(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._cdr.markForCheck();
    }
    this._stateChanges.next();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  private _readonly = false;

  @Input({ transform: booleanAttribute })
  set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
      this._stateChanges.next();
    }
  }
  get readonly(): boolean {
    return this._readonly;
  }

  /** Whether the circle toggle group uses the negative styling. */
  @Input() set negative(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this.negative !== newValue) {
      this._negative = newValue;
    }
    this._stateChanges.next();
  }
  get negative(): boolean {
    return this._negative;
  }
  _negative = false;

  /** The value of the selected circle toggle in the circle toggle group. */
  @Input() set value(value: any) {
    this.writeValue(value);
  }
  get value(): any {
    return this._value;
  }
  private _value!: string;

  /** Whether the circle toggle group has a responsive behavior. */
  @Input() set responsive(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this.responsive) {
      this._responsive = newValue;
      this._cdr.markForCheck();
    }
    this._stateChanges.next();
  }
  get responsive(): boolean {
    if (this._isExpert) {
      return false;
    }
    return this._responsive;
  }
  private _responsive = true;

  @HostBinding('class.is-expert') get _isExpert(): boolean {
    return this.appearance === 'expert';
  }

  errorState = signal(false);

  /** @docs-private */
  get selectedButton(): ToggleButton | null {
    return this.buttons ? this.buttons.find((button) => button.checked) || null : null;
  }

  /** @docs-private */
  get buttons() {
    return this._buttons;
  }

  @ContentChildren(ToggleButton, { descendants: true })
  private readonly _buttons!: QueryList<ToggleButton>;

  /** An event emitted when the selection changes. Outputs the value of the currently selected button. */
  @Output() readonly valueChange = new EventEmitter<any>();

  /**
   * **Expert option**
   *
   * Sets the appearance of the circle toggle group.
   *
   * Default: `'default'`.
   */
  @Input() set appearance(value: NxCircleToggleGroupAppearance) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._cdr.markForCheck();
    }
  }
  get appearance(): NxCircleToggleGroupAppearance {
    return this._appearance || this._defaultOptions?.appearance || 'default';
  }
  private _appearance?: NxCircleToggleGroupAppearance;

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _errorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Inject(CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS)
    private readonly _defaultOptions: CircleToggleGroupDefaultOptions | null,
    @Optional() @Self() readonly ngControl: NgControl | null,
    @Optional() private readonly _parentForm: NgForm | null,
    @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  private onChangeCallback = (value: string) => {};
  private onTouchedCallback = () => {};

  setReadonly(isReadonly: boolean): void {
    this.readonly = isReadonly;
    this._cdr.markForCheck();
  }

  writeValue(value: any) {
    Promise.resolve().then(() => {
      this._value = value;
      this.notifySelectedChild(value);
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngAfterViewInit(): void {
    this.subscribeToSelectionChanges();
    // react if a content child is deleted, added etc.
    this.buttons.changes
      .pipe(
        startWith(this.buttons),
        filter((toggles) => toggles.length > 0),
        tap(async (toggles) =>
          Promise.resolve().then(() => {
            toggles.forEach((toggle: any) => toggle.toggleButton.resetClasses());
            this.buttons.first.toggleButton.setFirstButton();
            this.buttons.last.toggleButton.setLastButton();
          }),
        ),
        takeUntil(this._destroyed),
      )
      .subscribe(() => this.subscribeToSelectionChanges());
  }

  /** @docs-private */
  subscribeToSelectionChanges() {
    merge(...this.buttons.map((button) => button.selectionChange))
      .pipe(takeUntil(this.buttons.changes), takeUntil(this._destroyed))
      .subscribe((change: any) => {
        this.value = change.value;
        this.onChangeCallback(change.value);
        this.valueChange.emit(change.value);
      });
  }

  /**
   * Inform the selected button if the group selection is set programattically at the beginning.
   * @docs-private
   */
  notifySelectedChild(newValue: string) {
    if (this.buttons) {
      if (newValue === undefined || newValue === null) {
        const selected = this.buttons.find((button) => button.checked);
        if (selected) {
          selected.setGroupSelection(false);
        }
        return;
      }
      const selecting = this.buttons.find((button) => button.value === newValue);
      if (selecting) {
        selecting.setGroupSelection(true);
      }
    }
  }

  /** @docs-private */
  updateToggleButtonsNames(): void {
    if (this.buttons) {
      this.buttons.forEach((button) => (button.name = this.name));
    }
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

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribed to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this._updateErrorState();
    }
  }

  _updateErrorState() {
    const oldState = this.errorState();
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState.set(newState);
    }
  }
}
