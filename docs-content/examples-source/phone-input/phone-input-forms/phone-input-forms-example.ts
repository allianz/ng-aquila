import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @title Phone input usage in forms
 */
@Component({
    templateUrl: 'phone-input-forms-example.html',
    styleUrls: ['./phone-input-forms-example.css'],
    selector: 'phone-input-forms-example',
})
export class PhoneInputFormsExampleComponent {
    value = '';
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            phone: new FormControl('', Validators.required),
        });
    }
}
