import { Component } from '@angular/core';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Simple binding example
 */
@Component({
    selector: 'number-stepper-simple-binding-example',
    templateUrl: './number-stepper-simple-binding-example.html',
    styleUrls: ['./number-stepper-simple-binding-example.css'],
    standalone: true,
    imports: [NxNumberStepperComponent],
})
export class NumberStepperSimpleBindingExampleComponent {
    number = 1;
}
