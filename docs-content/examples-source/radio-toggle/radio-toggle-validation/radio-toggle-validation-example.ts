import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * @title Validation Example
 */
@Component({
    selector: 'radio-toggle-validation-example',
    templateUrl: './radio-toggle-validation-example.html',
    styleUrls: ['./radio-toggle-validation-example.css'],
})
export class RadioToggleValidationExampleComponent {
    data = ['A', 'B', 'C'];
    testForm!: FormGroup;
    isSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            testToggle: ['', this.customValidation],
        });
    }

    private customValidation(formGroup: FormGroup) {
        return formGroup.value !== 'B' ? { valid: false } : null;
    }

    onsubmit() {
        this.isSubmitted = true;
    }
}
