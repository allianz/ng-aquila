import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Simple form example
 */
@Component({
    selector: 'formfield-simple-form-example',
    templateUrl: './formfield-simple-form-example.html',
    styleUrls: ['./formfield-simple-form-example.css'],
})
export class FormfieldSimpleFormExampleComponent {
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormBuilder().group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            items: ['', Validators.required],
            email: ['', Validators.required],
        });
    }
}
