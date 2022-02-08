import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'checkbox-reactive-example',
    templateUrl: './checkbox-reactive-example.html',
    styleUrls: ['./checkbox-reactive-example.css'],
})
export class CheckboxReactiveExampleComponent {
    public testForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            checkboxTestReactive: [false, Validators.requiredTrue],
        });
    }
}
