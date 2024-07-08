import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxSingleStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator reactive form with single form example
 */
@Component({
    selector: 'progress-stepper-reactivesingle-example',
    templateUrl: './progress-stepper-reactivesingle-example.html',
    styleUrls: ['./progress-stepper-reactivesingle-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxSingleStepperComponent,
        NxStepComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
        JsonPipe,
    ],
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
