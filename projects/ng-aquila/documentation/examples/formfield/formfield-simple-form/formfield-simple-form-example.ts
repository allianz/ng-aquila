import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Simple form example
 */
@Component({
    selector: 'formfield-simple-form-example',
    templateUrl: './formfield-simple-form-example.html',
    styleUrls: ['./formfield-simple-form-example.css'],
})
export class FormfieldSimpleFormExampleComponent {
    formGroup: UntypedFormGroup;

    constructor() {
        this.formGroup = new UntypedFormBuilder().group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            items: ['', Validators.required],
            email: ['', Validators.required],
        });
    }
}
