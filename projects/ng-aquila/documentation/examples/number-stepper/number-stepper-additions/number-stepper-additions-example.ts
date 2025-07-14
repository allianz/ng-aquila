import {
  NxNumberStepperComponent,
  NxNumberStepperPrefixDirective,
  NxNumberStepperSuffixDirective,
} from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';

/**
 * @title Prefix and Suffix
 */
@Component({
  selector: 'number-stepper-additions-example',
  templateUrl: './number-stepper-additions-example.html',
  styleUrls: ['./number-stepper-additions-example.css'],
  imports: [
    NxNumberStepperComponent,
    NxNumberStepperSuffixDirective,
    NxNumberStepperPrefixDirective,
  ],
})
export class NumberStepperAdditionsExampleComponent {}
