import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive Example
 */
@Component({
    selector: 'radio-button-reactive-example',
    templateUrl: './radio-button-reactive-example.html',
    styleUrls: ['./radio-button-reactive-example.css'],
})
export class RadioButtonReactiveExampleComponent {
    readonly testForm = this.fb.group({
        radioTestReactive: ['oranges', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
