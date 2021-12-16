import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Selectable cards expert example
 */
@Component({
    selector: 'selectable-card-expert-example',
    templateUrl: './selectable-card-expert-example.html',
    styleUrls: ['./selectable-card-expert-example.css'],
})
export class SelectableCardExpertExampleComponent {
    formGroup!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.formGroup = this.fb.group({
            card: [false, Validators.requiredTrue],
        });
        this.formGroup.markAllAsTouched();
    }
}
