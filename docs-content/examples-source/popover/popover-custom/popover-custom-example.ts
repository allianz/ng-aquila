import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Popover Custom Example
 */
@Component({
  selector: 'popover-custom-example',
  templateUrl: './popover-custom-example.html',
  styleUrls: ['./popover-custom-example.css'],
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverCustomExampleComponent {
  popoverWidth = '400px';
}
