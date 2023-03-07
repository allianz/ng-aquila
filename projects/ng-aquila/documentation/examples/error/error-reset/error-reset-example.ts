import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

/**
 * @title Error Reset Example
 */
@Component({
    selector: 'error-reset-example',
    templateUrl: './error-reset-example.html',
    styleUrls: ['./error-reset-example.css'],
})
export class ErrorResetExampleComponent {
    constructor(private readonly fb: UntypedFormBuilder) {}

    form = this.fb.group({
        label: ['', Validators.required],
    });
}
