import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'number-stepper-reactive-example',
    templateUrl: './number-stepper-reactive-example.html',
    styleUrls: ['./number-stepper-reactive-example.css'],
})
export class NumberStepperReactiveExampleComponent {
    readonly testForm = this.fb.group({
        stepperTestReactive: 3,
    });

    constructor(private readonly fb: FormBuilder) {}
}
