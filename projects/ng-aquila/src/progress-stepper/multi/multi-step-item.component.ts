import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { CdkStepHeader, CdkStepLabel } from '@angular/cdk/stepper';
import { NxMultiStepperDirection } from '../progress-stepper.models';

/** @docs-private */
@Component({
  selector: 'nx-multi-step-item',
  templateUrl: './multi-step-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./multi-step-item.component.scss'],
  host: {
    '[class.nx-multi-step-item--vertical]': 'direction === "vertical"',
    '[class.is-selected]': 'selected',
    '[class.is-completed]': 'completed',
    '[class.is-active]': 'active',
    '[class.is-disabled]': 'disabled',
    '[class.is-last]': 'last',
    '[attr.aria-disabled]': 'disabled ? "true" : null',
    'role': 'tab',
    '[attr.aria-selected]': 'selected',
  }
})
export class NxMultiStepItemComponent extends CdkStepHeader implements OnDestroy {
  /** The direction of the step */
  @Input()
  get direction(): NxMultiStepperDirection {
    return this._direction;
  }
  set direction(value: NxMultiStepperDirection) {
    this._direction = value;
    this._changeDetectorRef.markForCheck();
  }
  private _direction: NxMultiStepperDirection = 'horizontal';

  /** The label of the step. */
  @Input() label!: CdkStepLabel | string;

  /** Sets the selected step. */
  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    this._selected = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _selected!: boolean;

  /** Sets the active step. */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    this._active = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _active!: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _disabled!: boolean;

  /** Sets the last step. */
  @Input()
  get last(): boolean {
    return this._last;
  }
  set last(value: boolean) {
    this._last = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _last!: boolean;

  /** Sets the step completed. */
  @Input()
  get completed(): boolean {
    return this._completed;
  }
  set completed(value: boolean) {
    this._completed = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _completed!: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor) {
    super(_elementRef);
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  static ngAcceptInputType_selected: BooleanInput;
  static ngAcceptInputType_active: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_last: BooleanInput;
  static ngAcceptInputType_completed: BooleanInput;
}
