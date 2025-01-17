import { Component } from '@angular/core';
import {
    NxNumberStepperComponent,
    NxNumberStepperPrefixDirective,
    NxNumberStepperSuffixDirective,
} from '@aposin/ng-aquila/number-stepper';

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
