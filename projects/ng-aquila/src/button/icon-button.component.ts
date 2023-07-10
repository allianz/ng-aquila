import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

import { NxButtonBase } from './button-base';

@Component({
    selector: 'button[nxIconButton]',
    templateUrl: './button.html',
    styleUrls: ['button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['classNames:nxIconButton'],
    providers: [{ provide: NxTriggerButton, useExisting: NxIconButtonComponent }],
    host: {
        class: 'nx-icon-button',
    },
})
export class NxIconButtonComponent extends NxButtonBase {
    constructor(_cdr: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
        super(_cdr, elementRef, focusMonitor);
    }
}
