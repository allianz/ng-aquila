import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Reactive example
 */
@Component({
    selector: 'checkbox-reactive-example',
    templateUrl: './checkbox-reactive-example.html',
    styleUrls: ['./checkbox-reactive-example.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NxCheckboxComponent, JsonPipe],
})
export class CheckboxReactiveExampleComponent {
    readonly testForm = this.fb.group({
        checkboxTestReactive: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: FormBuilder) {}
}
