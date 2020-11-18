import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxPlainButton]',
  templateUrl: './plain-button.component.html',
  styleUrls: ['plain-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxPlainButton'],
  host: {
    '[class.nx-plain-button--danger]': 'danger'
  },
  providers: [{provide: NxTriggerButton, useExisting: NxPlainButtonComponent}]
})
export class NxPlainButtonComponent implements OnDestroy {

  private _classNames: string;

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
