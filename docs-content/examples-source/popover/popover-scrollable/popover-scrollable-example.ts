import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';

/**
 * @title Popover Scrollable Example
 */
@Component({
  selector: 'popover-scrollable-example',
  templateUrl: './popover-scrollable-example.html',
  styleUrls: ['./popover-scrollable-example.css'],
  imports: [
    NxButtonComponent,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
    CdkScrollable,
  ],
})
export class PopoverScrollableExampleComponent {}
