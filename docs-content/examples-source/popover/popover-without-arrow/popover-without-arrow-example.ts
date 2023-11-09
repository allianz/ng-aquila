import { Component } from '@angular/core';

/**
 * @title Popover Without Arrow Example
 */
@Component({
    selector: 'popover-without-arrow-example',
    templateUrl: './popover-without-arrow-example.html',
    styleUrls: ['./popover-without-arrow-example.css'],
})
export class PopoverWithoutArrowExampleComponent {
    popoverWidth = '500px';
    popoverManualOpenFlag = false;
    hideArrow = true;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
