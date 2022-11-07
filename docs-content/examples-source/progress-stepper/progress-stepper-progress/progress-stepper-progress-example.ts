import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Progress Indicator linear progress example
 */
@Component({
    selector: 'progress-stepper-progress-example',
    templateUrl: './progress-stepper-progress-example.html',
    styleUrls: ['./progress-stepper-progress-example.css'],
})
export class ProgressStepperProgressExampleComponent {
    readonly formLinear = this.fb.group({
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
