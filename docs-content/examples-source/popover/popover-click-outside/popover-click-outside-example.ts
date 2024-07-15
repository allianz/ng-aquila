import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Closing on document click
 */
@Component({
    selector: 'popover-click-outside-example',
    templateUrl: './popover-click-outside-example.html',
    styleUrls: ['./popover-click-outside-example.css'],
    standalone: true,
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverClickOutsideExampleComponent {
    closeOnDocClick = true;
    popoverManualOpenFlag = false;

    closeOnClickOutside() {
        this.closeOnDocClick = !this.closeOnDocClick;
    }
}
