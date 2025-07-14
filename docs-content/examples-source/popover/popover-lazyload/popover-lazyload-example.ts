import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverContentDirective,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Popover lazyload Example
 */
@Component({
  selector: 'popover-lazyload-example',
  templateUrl: './popover-lazyload-example.html',
  styleUrls: ['./popover-lazyload-example.css'],
  imports: [
    NxButtonComponent,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
    NxPopoverContentDirective,
  ],
})
export class PopoverLazyloadExampleComponent {
  popoverWidth = '400px';
}
