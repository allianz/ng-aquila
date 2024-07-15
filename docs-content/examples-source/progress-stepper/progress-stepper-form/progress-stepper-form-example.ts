import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxMultiStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator multi manual step completion example
 */
@Component({
    selector: 'progress-stepper-form-example',
    templateUrl: './progress-stepper-form-example.html',
    styleUrls: ['./progress-stepper-form-example.css'],
    standalone: true,
    imports: [
        NxMultiStepperComponent,
        NxStepComponent,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
    ],
})
export class ProgressStepperFormExampleComponent {
    lastStepCompleted = false;

    readonly manualCompletionForm = this.fb.group({
        name: ['', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}

    completeLastStep() {
        this.lastStepCompleted = true;
    }
}
