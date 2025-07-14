import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Popover positioning Example
 */
@Component({
  selector: 'popover-positioning-example',
  templateUrl: './popover-positioning-example.html',
  styleUrls: ['./popover-positioning-example.css'],
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverPositioningExampleComponent {}
