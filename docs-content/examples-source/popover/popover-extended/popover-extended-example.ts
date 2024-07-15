import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Extended Example
 */
@Component({
    selector: 'popover-extended-example',
    templateUrl: './popover-extended-example.html',
    styleUrls: ['./popover-extended-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxHeadlineComponent,
    ],
})
export class PopoverExtendedExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
