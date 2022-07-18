import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            phone: new FormControl('', Validators.required),
        });
    }
}
