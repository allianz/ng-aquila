import { Component } from '@angular/core';
import {
    NxNumberStepperComponent,
    NxNumberStepperPrefixDirective,
    NxNumberStepperSuffixDirective,
} from '@aposin/ng-aquila/number-stepper';

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
