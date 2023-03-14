import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

/**
 * @title Checkbox group validation example
 */
@Component({
    selector: 'checkbox-group-validation-example',
    templateUrl: './checkbox-group-validation-example.html',
    styleUrls: ['./checkbox-group-validation-example.css'],
})
export class CheckboxGroupValidationExampleComponent {
    readonly myFormGroup = this.fb.group({
        terms: [[], [Validators.required, this.validateCheckboxes]],
    });

    constructor(private readonly fb: FormBuilder) {}

    private validateCheckboxes(control: AbstractControl) {
        if (control.value.length <= 2) {
            return { min: false };
        }
        return null;
    }
}
