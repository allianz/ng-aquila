import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
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
