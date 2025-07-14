import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxPopoverActionsDirective,
  NxPopoverComponent,
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';
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
