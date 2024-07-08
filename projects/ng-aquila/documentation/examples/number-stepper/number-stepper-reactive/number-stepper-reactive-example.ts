import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Reactive example
 */
@Component({
    selector: 'number-stepper-reactive-example',
    templateUrl: './number-stepper-reactive-example.html',
    styleUrls: ['./number-stepper-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxNumberStepperComponent,
        JsonPipe,
    ],
})
export class NumberStepperReactiveExampleComponent {
    readonly testForm = this.fb.group({
        stepperTestReactive: 3,
    });

    constructor(private readonly fb: FormBuilder) {}
}
