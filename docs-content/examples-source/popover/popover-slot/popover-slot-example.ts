import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxPopoverActionsDirective,
    NxPopoverComponent,
    NxPopoverMainContentDirective,
    NxPopoverTitleDirective,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';
/**
 * @title Popover Example
 */
@Component({
    selector: 'popover-slot-example',
    templateUrl: './popover-slot-example.html',
    styleUrls: ['./popover-slot-example.css'],
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxHeadlineComponent,
        NxPopoverActionsDirective,
        NxPopoverMainContentDirective,
        NxPopoverTitleDirective,
        NxCopytextComponent,
    ],
})
export class PopoverSlotExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
