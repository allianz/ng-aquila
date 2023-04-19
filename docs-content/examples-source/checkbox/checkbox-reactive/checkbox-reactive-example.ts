import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'checkbox-reactive-example',
    templateUrl: './checkbox-reactive-example.html',
    styleUrls: ['./checkbox-reactive-example.css'],
})
export class CheckboxReactiveExampleComponent {
    readonly testForm = this.fb.group({
        checkboxTestReactive: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: FormBuilder) {}
}
