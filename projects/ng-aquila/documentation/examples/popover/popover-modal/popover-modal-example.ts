import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Modal Popover Example
 */
@Component({
  selector: 'popover-modal-example',
  templateUrl: './popover-modal-example.html',
  styleUrls: ['./popover-modal-example.css'],
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverModalExampleComponent {}
