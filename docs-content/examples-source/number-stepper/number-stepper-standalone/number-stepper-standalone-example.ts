import { Component } from '@angular/core';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Standalone example
 */
@Component({
    selector: 'number-stepper-standalone-example',
    templateUrl: './number-stepper-standalone-example.html',
    styleUrls: ['./number-stepper-standalone-example.css'],
    standalone: true,
    imports: [NxNumberStepperComponent],
})
export class NumberStepperStandaloneExampleComponent {}
