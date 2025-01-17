import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
} from '@aposin/ng-aquila/circle-toggle';
import { NxExpertModule } from '@aposin/ng-aquila/config';

/**
 * @title Reactive disabled example
 */
@Component({
    selector: 'circle-toggle-readonly-example',
    templateUrl: './circle-toggle-readonly-example.html',
    styleUrls: ['./circle-toggle-readonly-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCircleToggleGroupComponent,
        NxCircleToggleComponent,
        NxExpertModule,
    ],
})
export class CircleToggleReadonlyExampleComponent {
    readonly testForm = this.fb.group({
        reactiveToggle: ['B', Validators.required],
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

    constructor(private readonly fb: FormBuilder) {}
}
