import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Timefield reactive forms example
 */
@Component({
    selector: 'nx-timefield-reactive-example',
    templateUrl: './timefield-reactive-example.html',
    styleUrls: ['./timefield-reactive-example.css'],
})
export class TimefieldReactiveExampleComponent {
    testForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            timefieldReactive: ['22:54', Validators.required],
        });
    }
}
