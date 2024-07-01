import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Radio error message retail
 */
@Component({
    selector: 'radio-button-error-retail-example',
    templateUrl: './radio-button-error-retail-example.html',
    styleUrl: './radio-button-error-retail-example.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonErrorRetailExample {
    readonly testForm = this.fb.group({
        radioTestReactive: [null, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
