import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

import { NxIconButtonComponent } from './icon-button.component';

@Component({
    templateUrl: './button.html',
    styleUrls: ['button.scss'],
    selector: 'a[nxIconButton]',
    inputs: ['classNames:nxIconButton'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NxTriggerButton, useExisting: NxAnchorIconButtonComponent }],
})
export class NxAnchorIconButtonComponent extends NxIconButtonComponent {
    /** @docs-private */
    @HostListener('click', ['$event'])
    _checkEventsDisabled(event: Event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

    constructor(_cdr: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
        super(_cdr, elementRef, focusMonitor);
    }
}
