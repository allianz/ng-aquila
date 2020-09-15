import { Component, ElementRef, ChangeDetectorRef, Optional, Host, ChangeDetectionStrategy } from '@angular/core';
import { NxButtonBase } from '@aposin/ng-aquila/button';

import { NxSidebarComponent } from './sidebar.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxSidebarToggle]',
  templateUrl: './sidebar-toggle.html',
  styleUrls: [
    '../button/button.scss',
    './sidebar-toggle.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-sidebar__toggle-button',
    '(click)': 'toggle()',
  }
})
export class NxSidebarToggleComponent extends NxButtonBase {

  constructor(_changeDetectorRef: ChangeDetectorRef,
              _elementRef: ElementRef,
              @Optional() @Host() private _sidebar: NxSidebarComponent) {

    super(_changeDetectorRef, _elementRef);
    this.classNames = 'tertiary small-medium';
  }

  toggle() {
    this._sidebar.toggle();
  }
}
