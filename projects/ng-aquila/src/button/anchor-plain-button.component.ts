import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, Input, HostListener } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NxPlainButtonComponent } from './plain-button.component';

@Component({
    templateUrl: './plain-button.component.html',
    styleUrls: ['plain-button.component.scss'],
    // tslint:disable-next-line:component-selector
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

    constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
        super(changeDetectorRef, elementRef, focusMonitor);
    }
}
