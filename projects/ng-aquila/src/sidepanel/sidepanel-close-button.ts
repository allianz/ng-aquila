import { NxIconModule } from '@allianz/ng-aquila/icon';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { NxSidepanelComponent } from './sidepanel';

@Component({
  selector: 'button[nxSidepanelCloseButton]',
  template: `<nx-icon name="close" size="s" aria-hidden="true"></nx-icon>`,
  styleUrls: ['./sidepanel-close-button.scss'],
  host: {
    '(click)': '_toggle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconModule],
})
export class NxSidepanelCloseButtonComponent implements OnDestroy, AfterViewInit {
  _toggle() {
    this._sidepanel.toggle();
  }

  constructor(
    private readonly _sidepanel: NxSidepanelComponent,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
