import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnDestroy, HostBinding, Input } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxPlainButton]',
  templateUrl: './plain-button.component.html',
  styleUrls: ['plain-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxPlainButton'],
  host: {
    '[class.nx-plain-button]': 'true',
    '[class.nx-plain-button--danger]': 'danger',
  },
  providers: [{provide: NxTriggerButton, useExisting: NxPlainButtonComponent}]
})
export class NxPlainButtonComponent implements OnDestroy {
  /** @docs-private */
  @HostBinding('attr.disabled') get isDisabled(): boolean | null { return this.disabled || null; }
  /** @docs-private */
  @HostBinding('attr.aria-disabled') get isAriaDisabled(): string { return this.disabled.toString(); }

  private _disabled: boolean = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }

  static ngAcceptInputType_disabled: BooleanInput;

  private _classNames: string = '';

  danger: boolean = false;

  public set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }

    this._classNames = value;
    this.danger = /danger/.test(this._classNames);
    this._changeDetectorRef.markForCheck();
  }

  public get classNames(): string {
    return this._classNames;
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor
  ) {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
