import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Popover Guide Tour Example
 */

@Component({
  selector: 'popover-guided-tour-example',
  templateUrl: './popover-guided-tour-example.html',
  styleUrls: ['./popover-guided-tour-example.css'],
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
