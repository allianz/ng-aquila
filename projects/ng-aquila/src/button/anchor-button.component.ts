import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, Input, HostListener } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NxButtonComponent } from './button.component';

@Component({
    templateUrl: './button.html',
    styleUrls: ['button.scss'],
    selector: 'a[nxButton]',
    inputs: ['classNames:nxButton'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NxTriggerButton, useExisting: NxAnchorButtonComponent }],
})
export class NxAnchorButtonComponent extends NxButtonComponent {
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
