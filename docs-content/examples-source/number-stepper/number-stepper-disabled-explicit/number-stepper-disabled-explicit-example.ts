import {
  NxNumberStepperComponent,
  NxNumberStepperPrefixDirective,
  NxNumberStepperSuffixDirective,
} from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';

/**
 * @title Disabling through nxDisabled property example
 */
@Component({
  selector: 'number-stepper-disabled-explicit-example',
  templateUrl: './number-stepper-disabled-explicit-example.html',
  styleUrls: ['./number-stepper-disabled-explicit-example.css'],
  imports: [
    NxNumberStepperComponent,
    NxNumberStepperSuffixDirective,
    NxNumberStepperPrefixDirective,
  ],
})
export class NumberStepperDisabledExplicitExampleComponent {}
