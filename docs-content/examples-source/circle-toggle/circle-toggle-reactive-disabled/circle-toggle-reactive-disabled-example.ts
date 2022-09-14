import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive disabled example
 */
@Component({
    selector: 'circle-toggle-reactive-disabled-example',
    templateUrl: './circle-toggle-reactive-disabled-example.html',
    styleUrls: ['./circle-toggle-reactive-disabled-example.css'],
})
export class CircleToggleReactiveDisabledExampleComponent {
    readonly testForm = this.fb.group({
        reactiveToggle: ['', Validators.required],
    });

    readonly sampleValues = [
        {
            value: 'A',
            icon: 'product-heart',
            hint: 'Hint A',
            label: 'Label A',
            selected: false,
        },
        {
            value: 'B',
            icon: 'product-car',
            hint: 'Hint B',
            label: 'Label B',
            selected: true,
        },
        {
            value: 'C',
            icon: 'product-plane',
            hint: 'Hint C',
            label: 'Label C',
            selected: false,
        },
    ];

    constructor(private readonly fb: FormBuilder) {
        this.testForm.disable();
    }

    switchStatusClick() {
        if (this.testForm.disabled) {
            this.testForm.enable();
        } else {
            this.testForm.disable();
        }
    }
}
