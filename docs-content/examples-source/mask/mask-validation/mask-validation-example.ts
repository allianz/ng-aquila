import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * @title Validation example
 */
@Component({
    selector: 'mask-validation-example',
    templateUrl: './mask-validation-example.html',
    styleUrls: ['./mask-validation-example.css'],
})
export class MaskValidationExampleComponent {
    validatedMaskForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {}),
    });

    unvalidatedMaskForm: FormGroup = new FormGroup({
        maskInput2: new FormControl('', {}),
    });
}
