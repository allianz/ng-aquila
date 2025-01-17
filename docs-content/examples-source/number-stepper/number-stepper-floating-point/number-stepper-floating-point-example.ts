import { Component } from '@angular/core';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Floating point example
 */
@Component({
    selector: 'number-stepper-floating-point-example',
    templateUrl: './number-stepper-floating-point-example.html',
    styleUrls: ['./number-stepper-floating-point-example.css'],
    imports: [NxNumberStepperComponent],
})
export class NumberStepperFloatingPointExampleComponent {
    number = 0;
}
