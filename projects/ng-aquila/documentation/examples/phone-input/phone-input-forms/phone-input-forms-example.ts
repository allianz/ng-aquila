import { Component } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Phone input usage in forms
 */
@Component({
    selector: 'phone-input-forms-example',
    templateUrl: 'phone-input-forms-example.html',
    styleUrls: ['./phone-input-forms-example.css'],
})
export class PhoneInputFormsExampleComponent {
    value = '';
    formGroup: UntypedFormGroup;

    constructor() {
        this.formGroup = new UntypedFormGroup({
            phone: new UntypedFormControl('', Validators.required),
        });
    }
}
