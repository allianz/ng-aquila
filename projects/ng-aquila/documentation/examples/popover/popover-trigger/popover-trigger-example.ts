import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SPACE, ENTER } from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
* @title Popover Trigger Example
*/
@Component({
  selector: 'popover-trigger-example',
  templateUrl: './popover-trigger-example.html',
  styleUrls: ['./popover-trigger-example.css']
})
export class PopoverTriggerExampleComponent implements AfterViewInit, OnDestroy {
  popoverManualOpenFlag = false;

  @ViewChild('clickTriggerIcon') _clickTriggerIcon: ElementRef<HTMLElement>;
  @ViewChild('manualTriggerIcon') _manualTriggerIcon: ElementRef<HTMLElement>;

  constructor(private _focusMonitor: FocusMonitor) {}

  ngAfterViewInit() {
    this._focusMonitor.monitor(this._clickTriggerIcon);
    this._focusMonitor.monitor(this._manualTriggerIcon);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._clickTriggerIcon);
    this._focusMonitor.stopMonitoring(this._manualTriggerIcon);
  }

  handleKeydown(event) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
        break;
      default:
        return;
    }
  }
}
