import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, Input, HostListener } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NxIconButtonComponent } from './icon-button.component';

@Component({
    templateUrl: './button.html',
    styleUrls: ['button.scss'],
    // tslint:disable-next-line:component-selector
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

    constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
        super(changeDetectorRef, elementRef, focusMonitor);
    }
}
