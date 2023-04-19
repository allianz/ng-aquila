import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'circle-toggle-reactive-example',
    templateUrl: './circle-toggle-reactive-example.html',
    styleUrls: ['./circle-toggle-reactive-example.css'],
})
export class CircleToggleReactiveExampleComponent {
    formBuilder = new FormBuilder();

    testForm = this.formBuilder.group({
        reactiveToggle: ['', Validators.required],
    });

    sampleValues = [
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

    patch(value: string): void {
        this.testForm.patchValue({ reactiveToggle: value });
    }
}
