import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** @title Switcher Reactive Form */
@Component({
    selector: 'switcher-reactive-form-example',
    templateUrl: './switcher-reactive-form-example.html',
    styleUrls: ['./switcher-reactive-form-example.css'],
})
export class SwitcherReactiveFormExampleComponent {
    testForm!: FormGroup;
    isSubmitted = false;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            switcherTestReactive: [false, Validators.requiredTrue],
        });
    }

    onSubmit() {
        this.isSubmitted = true;
    }
}
