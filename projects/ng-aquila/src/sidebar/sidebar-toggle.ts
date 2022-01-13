import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, ChangeDetectorRef, Optional, Host, ChangeDetectionStrategy } from '@angular/core';
import { NxButtonBase } from '@aposin/ng-aquila/button';

import { NxSidebarComponent } from './sidebar.component';

@Component({
    selector: 'button[nxSidebarToggle]',
    templateUrl: './sidebar-toggle.html',
    styleUrls: ['../button/button.scss', './sidebar-toggle.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-sidebar__toggle-button',
        '(click)': 'toggle()',
    },
})
export class NxSidebarToggleComponent extends NxButtonBase {
    constructor(_cdr: ChangeDetectorRef, _elementRef: ElementRef, _focusMonitor: FocusMonitor, @Optional() @Host() private _sidebar: NxSidebarComponent) {
        super(_cdr, _elementRef, _focusMonitor);
        this.classNames = 'tertiary small-medium';
    }

    toggle() {
        this._sidebar.toggle();
    }
}
