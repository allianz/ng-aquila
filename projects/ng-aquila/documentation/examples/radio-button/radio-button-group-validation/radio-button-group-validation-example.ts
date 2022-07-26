import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Radio button group validation Example
 */
@Component({
    selector: 'radio-button-group-validation-example',
    templateUrl: './radio-button-group-validation-example.html',
    styleUrls: ['./radio-button-group-validation-example.css'],
})
export class RadioButtonGroupValidationExampleComponent {
    readonly testForm = this.fb.group({
        radioTestReactive: [null, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
