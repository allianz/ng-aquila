import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { takeUntil, tap, startWith, filter } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

import { ToggleButton } from '../circle-toggle/toggle-button';
import { ToggleChangeEvent } from '../circle-toggle/circle-toggle.component';

let nextId = 0;

@Component({
  selector: 'nx-circle-toggle-group',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./circle-toggle-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxCircleToggleGroupComponent),
      multi: true
    }
  ],
  host: {
    '[class.is-responsive]': 'responsive',
    '[class.is-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-labelledby]': 'name',
    '[attr.name]': 'name',
    '[attr.id]': 'id',
    '[class.nx-circle-toggle-group]': 'true',
    'role': 'radiogroup'
  }
})
export class NxCircleToggleGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @ContentChildren(ToggleButton) private _buttons: QueryList<ToggleButton>;

  private _id = `nx-circle-toggle-group-${nextId++}`;

  /**
   * Id of the circle toggle group.
   *
   * If not set, the circle toggle group gets an incremented value by default.
   */
  set id(value: string) {
    this._id = value;
    this._changeDetectorRef.markForCheck();
  }
  get id(): string {
    return this._id;
  }
  private _destroyed: Subject<void> = new Subject();

  /** An event emitted when the selection changes. Outputs the value of the currently selected button. */
  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  private _name: string = `toggle-group-${nextId++}`;

  /** Name that is used for accessibility. */
  @Input()
  set name(value: string) {
    this._name = value;
    this.updateToggleButtonsNames();
    this._changeDetectorRef.markForCheck();
  }
  get name(): string {
    return this._name;
  }

  private _disabled: boolean;

  /** Whether the circle toggle group is disabled. */
  @Input()
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
    if (this.buttons) {
      this.buttons.forEach(button => button.disabled = value);
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  _negative: boolean = false;
  /** Whether the circle toggle group uses the negative styling. */
  @Input()
  set negative(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this.negative !== newValue) {
      this._negative = newValue;
    }
    if (this.buttons) {
      this.buttons.forEach(button => button.negative = value);
    }
  }
  get negative(): boolean {
    return this._negative;
  }

  private _value;
  /** The value of the selected circle toggle in the circle toggle group. */
  @Input()
  set value(value: string) {
    this.writeValue(value);
  }

  get value(): string {
    return this._value;
  }

  private _responsive: boolean = true;
  /** Whether the circle toggle group has a responsive behavior. */
  @Input()
  set responsive(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this.responsive) {
      this._responsive = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  get responsive(): boolean {
    return this._responsive;
  }

  private onChangeCallback = (value: string) => { };
  private onTouchedCallback = () => { };

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  writeValue(value: any) {
    if (this.value !== value) {
      this._value = value;
      this.notifySelectedChild(value);
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngAfterViewInit() {

    this.subscribeToSelectionChanges();

    // react if a content child is deleted, added etc.
    this.buttons.changes
      .pipe(
        startWith(this.buttons),
        filter(toggles => toggles.length > 0),
        tap(toggles =>
          Promise.resolve().then(() => {
            toggles.forEach(toggle => toggle.toggleButton.resetClasses());
            this.buttons.first.toggleButton.setFirstButton();
            this.buttons.last.toggleButton.setLastButton();
          })
        ),
        takeUntil(this._destroyed))
      .subscribe(() => this.subscribeToSelectionChanges());
  }

  /** @docs-private */
  subscribeToSelectionChanges() {
    const changedOrDestroyed = merge(this.buttons.changes, this._destroyed);

    merge(...this.buttons.map(button => button.selectionChange))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe((change: ToggleChangeEvent) => {
        this.onChangeCallback(change.value);
        this.valueChange.emit(change.value);
      });
  }

  /**
   * @docs-private
   * inform the selected button if the group selection is set programattically at the beginning
   */
  notifySelectedChild(newValue: string) {
    if (this.buttons) {
      const selected = this.buttons.find((button) => button.value === newValue);
      if (selected) {
        selected.setGroupSelection();
      }
    }
  }

  /** @docs-private */
  updateToggleButtonsNames(): void {
    if (this.buttons) {
      this.buttons.forEach(button => button.name = this.name);
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

  /** @docs-private */
  get selectedButton(): ToggleButton {
    return this.buttons ? this.buttons.find(button => button.checked) : null;
  }

  /** @docs-private */
  get buttons() {
    return this._buttons;
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_negative: BooleanInput;
  static ngAcceptInputType_responsive: BooleanInput;
}
