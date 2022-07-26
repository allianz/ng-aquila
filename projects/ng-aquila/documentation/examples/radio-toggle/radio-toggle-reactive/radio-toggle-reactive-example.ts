import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive Form Example
 */
@Component({
    selector: 'radio-toggle-reactive-example',
    templateUrl: './radio-toggle-reactive-example.html',
    styleUrls: ['./radio-toggle-reactive-example.css'],
})
export class RadioToggleReactiveExampleComponent {
    readonly data = ['A', 'B', 'C'];

    readonly testForm = this.fb.group({
        testToggle: ['B', Validators.required],
    });

    readonly disabledToggleForm = this.fb.group({
        disabledToggle: [{ value: 'B', disabled: true }],
    });

    isToggleDisabled = false;

    constructor(private readonly fb: FormBuilder) {}

    toggleDisabled() {
        this.isToggleDisabled = !this.isToggleDisabled;
        if (this.isToggleDisabled) {
            this.testForm.get('testToggle')?.disable();
        } else {
            this.testForm.get('testToggle')?.enable();
        }
    }
}
