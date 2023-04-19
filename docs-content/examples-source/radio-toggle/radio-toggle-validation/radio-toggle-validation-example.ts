import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * @title Validation Example
 */
@Component({
    selector: 'radio-toggle-validation-example',
    templateUrl: './radio-toggle-validation-example.html',
    styleUrls: ['./radio-toggle-validation-example.css'],
})
export class RadioToggleValidationExampleComponent {
    readonly data = ['A', 'B', 'C'];

    readonly testForm = this.fb.group({
        testToggle: ['', this.customValidation],
    });

    isSubmitted = false;

    constructor(private readonly fb: FormBuilder) {}

    private customValidation(formGroup: FormGroup) {
        return formGroup.value !== 'B' ? { valid: false } : null;
    }

    onsubmit() {
        this.isSubmitted = true;
    }
}
