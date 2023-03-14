import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Accordion Error Example
 */
@Component({
    selector: 'accordion-error-example',
    templateUrl: './accordion-error-example.html',
    styleUrls: ['./accordion-error-example.css'],
})
export class AccordionErrorExampleComponent {
    readonly formGroupInfo = this.fb.group({
        surname: ['Mustermann', Validators.required],
    });

    readonly formGroupPayment = this.fb.group({
        input: ['', Validators.required],
    });

    showErrorPayment = true;
    showErrorInfo = false;

    constructor(private readonly fb: FormBuilder) {
        this.formGroupPayment.markAllAsTouched();
    }

    get infoHasError() {
        return this.formGroupInfo.get('surname')?.hasError('required');
    }

    get paymentHasError() {
        return this.formGroupPayment.get('input')?.hasError('required');
    }
}
