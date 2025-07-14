import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Closing on document click
 */
@Component({
  selector: 'popover-click-outside-example',
  templateUrl: './popover-click-outside-example.html',
  styleUrls: ['./popover-click-outside-example.css'],
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverClickOutsideExampleComponent {
  closeOnDocClick = true;
  popoverManualOpenFlag = false;

  closeOnClickOutside() {
    this.closeOnDocClick = !this.closeOnDocClick;
  }
}
