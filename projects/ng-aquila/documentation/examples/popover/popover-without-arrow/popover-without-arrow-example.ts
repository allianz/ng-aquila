import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

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
