import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * @title Progress Indicator reactive form with separate form per step
 */
@Component({
    selector: 'progress-stepper-reactivemulti-example',
    templateUrl: './progress-stepper-reactivemulti-example.html',
    styleUrls: ['./progress-stepper-reactivemulti-example.css'],
})
export class ProgressStepperReactivemultiExampleComponent {
    readonly stepOneForm = this.fb.group({ name: '' });
    readonly stepTwoForm = this.fb.group({ age: '' });

    constructor(private readonly fb: FormBuilder) {}
}
