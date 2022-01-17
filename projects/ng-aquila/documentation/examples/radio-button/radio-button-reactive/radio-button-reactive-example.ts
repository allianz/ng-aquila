import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive Example
 */
@Component({
    selector: 'radio-button-reactive-example',
    templateUrl: './radio-button-reactive-example.html',
    styleUrls: ['./radio-button-reactive-example.css'],
})
export class RadioButtonReactiveExampleComponent {
    testForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.formBuilder.group({
            radioTestReactive: ['oranges', Validators.required],
        });
    }
}
