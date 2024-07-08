import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
} from '@aposin/ng-aquila/circle-toggle';

/**
 * @title Reactive example
 */
@Component({
    selector: 'circle-toggle-reactive-example',
    templateUrl: './circle-toggle-reactive-example.html',
    styleUrls: ['./circle-toggle-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCircleToggleGroupComponent,
        NgFor,
        NxCircleToggleComponent,
        NxButtonComponent,
        JsonPipe,
    ],
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
