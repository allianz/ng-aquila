import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

import { NxPlainButtonComponent } from './plain-button.component';

@Component({
    templateUrl: './plain-button.component.html',
    styleUrls: ['plain-button.component.scss'],
    selector: 'a[nxPlainButton]',
    inputs: ['classNames:nxPlainButton'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NxTriggerButton, useExisting: NxAnchorPlainButtonComponent }],
})
export class NxAnchorPlainButtonComponent extends NxPlainButtonComponent {
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
