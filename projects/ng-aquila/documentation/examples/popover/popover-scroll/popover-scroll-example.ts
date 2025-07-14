import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';

/**
 * @title Popover Scroll Example
 */
@Component({
  selector: 'popover-scroll-example',
  templateUrl: './popover-scroll-example.html',
  styleUrls: ['./popover-scroll-example.css'],
  imports: [
    CdkScrollable,
    NxButtonComponent,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
  ],
})
export class PopoverScrollExampleComponent {}
