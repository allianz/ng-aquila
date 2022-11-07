import { Component } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';

/**
 * @title Selectable cards states example
 */
@Component({
    selector: 'selectable-card-states-example',
    templateUrl: './selectable-card-states-example.html',
    styleUrls: ['./selectable-card-states-example.css'],
})
export class SelectableCardStatesExampleComponent {
    readonly formGroup = this.fb.group({
        errorCard: [false, Validators.requiredTrue],
        errorCard2: [true, validateSecondCard],
    });

    constructor(private readonly fb: UntypedFormBuilder) {
        this.formGroup.markAllAsTouched();
    }
}

function validateSecondCard(control: AbstractControl) {
    return control.value ? { invalid: true } : null;
}
