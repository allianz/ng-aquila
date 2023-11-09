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
    popoverWidth = '500px';
    popoverManualOpenFlag = false;

    cancelPopover() {
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
    }
}
