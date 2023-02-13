import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Optional label example
 */
@Component({
    selector: 'formfield-optional-label-example',
    templateUrl: './formfield-optional-label-example.html',
    styleUrls: ['./formfield-optional-label-example.css'],
})
export class FormfieldOptionalLabelExampleComponent {
    formGroup: UntypedFormGroup;

    constructor() {
        this.formGroup = new UntypedFormBuilder().group({
            firstName: ['', Validators.required],
            lastName: [''],
            items: [''],
            email: ['', Validators.required],
        });
    }
}
