import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Progress Indicator reactive form with single form example
 */
@Component({
    selector: 'progress-stepper-reactivesingle-example',
    templateUrl: './progress-stepper-reactivesingle-example.html',
    styleUrls: ['./progress-stepper-reactivesingle-example.css'],
})
export class ProgressStepperReactivesingleExampleComponent {
    readonly testForm = this.fb.group({
        personalDetails: new UntypedFormGroup({
            name: new UntypedFormControl('', {
                validators: Validators.required,
            }),
            age: new UntypedFormControl('', {
                validators: Validators.required,
            }),
        }),
        address: new UntypedFormGroup({
            street: new UntypedFormControl('', {
                validators: Validators.required,
            }),
            postalCode: new UntypedFormControl('', {
                validators: Validators.required,
            }),
        }),
    });

    constructor(private readonly fb: UntypedFormBuilder) {}
}
