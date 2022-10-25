import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Host, Optional } from '@angular/core';
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
    constructor(
        _cdr: ChangeDetectorRef,
        _elementRef: ElementRef,
        _focusMonitor: FocusMonitor,
        @Optional() @Host() private readonly _sidebar: NxSidebarComponent | null,
    ) {
        super(_cdr, _elementRef, _focusMonitor);
        this.classNames = 'tertiary small-medium';
    }

    toggle() {
        if (this._sidebar) {
            this._sidebar.toggle();
        }
    }
}
