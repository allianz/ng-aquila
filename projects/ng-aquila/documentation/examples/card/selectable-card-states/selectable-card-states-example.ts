import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxSelectableCardComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Selectable cards states example
 */
@Component({
    selector: 'selectable-card-states-example',
    templateUrl: './selectable-card-states-example.html',
    styleUrls: ['./selectable-card-states-example.css'],
    imports: [
        FormsModule,
        NxLayoutComponent,
        ReactiveFormsModule,
        NxRowComponent,
        NxColComponent,
        NxSelectableCardComponent,
        NxCopytextComponent,
        NxErrorComponent,
    ],
})
export class SelectableCardStatesExampleComponent {
    readonly formGroup = this.fb.group({
        errorCard: [false, Validators.requiredTrue],
        errorCard2: [true, validateSecondCard],
    });

    constructor(private readonly fb: FormBuilder) {
        this.formGroup.markAllAsTouched();
    }
}

function validateSecondCard(control: AbstractControl) {
    return control.value ? { invalid: true } : null;
}
