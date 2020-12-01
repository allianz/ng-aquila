import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import { NxSidepanelComponent } from './sidepanel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxSidepanelCloseButton]',
  template: `<nx-icon name="close" size="s" aria-hidden="true"></nx-icon>`,
  styleUrls: ['./sidepanel-close-button.scss'],
  host: {
    '(click)': '_toggle()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSidepanelCloseButtonComponent implements OnDestroy {

  _toggle() {
    this._sidepanel.toggle();
  }

  constructor(
    private _sidepanel: NxSidepanelComponent,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef
  ) {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
