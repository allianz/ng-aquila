import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxSelectableCardComponent } from '@aposin/ng-aquila/card';

/**
 * @title Selectable cards reactive example
 */
@Component({
    selector: 'selectable-card-reactive-example',
    templateUrl: './selectable-card-reactive-example.html',
    styleUrls: ['./selectable-card-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxSelectableCardComponent,
        NxErrorComponent,
        JsonPipe,
    ],
})
export class SelectableCardReactiveExampleComponent {
    readonly testForm = this.fb.group({
        selectableCardTestReactive: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: FormBuilder) {}
}
