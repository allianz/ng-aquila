import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy } from '@angular/core';

import { NxSidepanelComponent } from './sidepanel';

@Component({
    selector: 'button[nxSidepanelCloseButton]',
    template: `<nx-icon name="close" size="s" aria-hidden="true"></nx-icon>`,
    styleUrls: ['./sidepanel-close-button.scss'],
    host: {
        '(click)': '_toggle()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelCloseButtonComponent implements OnDestroy {
    _toggle() {
        this._sidepanel.toggle();
    }

    constructor(
        private readonly _sidepanel: NxSidepanelComponent,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _elementRef: ElementRef,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
