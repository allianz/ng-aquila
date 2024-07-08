import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Guide Tour Example
 */

@Component({
    selector: 'popover-guided-tour-example',
    templateUrl: './popover-guided-tour-example.html',
    styleUrls: ['./popover-guided-tour-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxHeadlineComponent,
    ],
})
export class PopoverGuidedTourExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
