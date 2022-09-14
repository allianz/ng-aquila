import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
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
        personalDetails: new FormGroup({
            name: new FormControl('', {
                validators: Validators.required,
            }),
            age: new FormControl('', {
                validators: Validators.required,
            }),
        }),
        address: new FormGroup({
            street: new FormControl('', {
                validators: Validators.required,
            }),
            postalCode: new FormControl('', {
                validators: Validators.required,
            }),
        }),
    });

    constructor(private readonly fb: FormBuilder) {}
}
