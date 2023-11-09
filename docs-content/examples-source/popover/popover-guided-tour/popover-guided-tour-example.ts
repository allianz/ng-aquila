import { Component } from '@angular/core';

/**
 * @title Popover Guide Tour Example
 */

@Component({
    selector: 'popover-guided-tour-example',
    templateUrl: './popover-guided-tour-example.html',
    styleUrls: ['./popover-guided-tour-example.css'],
})
export class PopoverGuidedTourExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
