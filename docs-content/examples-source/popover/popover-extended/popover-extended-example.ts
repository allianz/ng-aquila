import { Component } from '@angular/core';

/**
 * @title Popover Extended Example
 */
@Component({
    selector: 'popover-extended-example',
    templateUrl: './popover-extended-example.html',
    styleUrls: ['./popover-extended-example.css'],
})
export class PopoverExtendedExampleComponent {
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
