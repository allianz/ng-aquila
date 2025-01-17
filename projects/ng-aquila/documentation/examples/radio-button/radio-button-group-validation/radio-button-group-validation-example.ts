import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Radio button group validation Example
 */
@Component({
    selector: 'radio-button-group-validation-example',
    templateUrl: './radio-button-group-validation-example.html',
    styleUrls: ['./radio-button-group-validation-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxRadioGroupComponent,
        NxLabelComponent,
        NxErrorComponent,
        NxRadioComponent,
        NxButtonComponent,
    ],
})
export class RadioButtonGroupValidationExampleComponent {
    readonly testForm = this.fb.group({
        radioTestReactive: [null, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
