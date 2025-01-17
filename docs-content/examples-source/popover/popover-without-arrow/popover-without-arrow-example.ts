import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Without Arrow Example
 */
@Component({
    selector: 'popover-without-arrow-example',
    templateUrl: './popover-without-arrow-example.html',
    styleUrls: ['./popover-without-arrow-example.css'],
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxHeadlineComponent,
        NxLinkComponent,
        NxIconComponent,
    ],
})
export class PopoverWithoutArrowExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;
    hideArrow = true;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
