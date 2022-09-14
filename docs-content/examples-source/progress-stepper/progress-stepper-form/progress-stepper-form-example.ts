import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Progress Indicator multi manual step completion example
 */
@Component({
    selector: 'progress-stepper-form-example',
    templateUrl: './progress-stepper-form-example.html',
    styleUrls: ['./progress-stepper-form-example.css'],
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
