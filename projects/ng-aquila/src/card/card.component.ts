import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Attribute, ElementRef, OnDestroy} from '@angular/core';
import {coerceBooleanProperty, BooleanInput} from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  template: '<ng-content></ng-content>',
  styleUrls: ['card.scss'],
  selector: 'nx-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-card'
  }
})
export class NxCardComponent implements OnDestroy {
  constructor(
      private _elementRef: ElementRef,
      private _focusMonitor: FocusMonitor
  ) {
    // we still listen for focus in case the user set a tabindex on the element
    // the focus monitor only adds the cdk-keyboard-focus class if the element is focusable
    // meaning it needs a tabindex in this case
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
