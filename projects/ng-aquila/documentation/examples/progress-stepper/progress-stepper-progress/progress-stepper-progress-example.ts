import { Component } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
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
    formLinear: FormGroup;
    constructor(private _formBuilder: FormBuilder) {
        this.formLinear = this._formBuilder.group({
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
    }
}
