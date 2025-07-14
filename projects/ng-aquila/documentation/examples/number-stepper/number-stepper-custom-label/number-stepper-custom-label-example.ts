import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Custom label example
 */
@Component({
  selector: 'number-stepper-custom-label-example',
  templateUrl: './number-stepper-custom-label-example.html',
  styleUrls: ['./number-stepper-custom-label-example.css'],
  imports: [
    NxNumberStepperComponent,
    NxIconComponent,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
    NxIconButtonComponent,
  ],
})
export class NumberStepperCustomLabelExampleComponent {}
