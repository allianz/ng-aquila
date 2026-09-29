import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxPopoverComponent,
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { Component } from '@angular/core';
/**
 * @title Popover Inverse Example
 */
@Component({
  selector: 'popover-inverse-example',
  templateUrl: './popover-inverse-example.html',
  styleUrls: ['./popover-inverse-example.css'],
  imports: [
    NxButtonComponent,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
    NxHeadlineComponent,
    NxPopoverMainContentDirective,
    NxPopoverTitleDirective,
    NxCopytextComponent,
    NxSurface,
  ],
})
export class PopoverInverseExampleComponent {}
