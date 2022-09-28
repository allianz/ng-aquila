import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

/**
 * @title Validation example
 */
@Component({
    selector: 'mask-validation-example',
    templateUrl: './mask-validation-example.html',
    styleUrls: ['./mask-validation-example.css'],
})
export class MaskValidationExampleComponent {
    validatedMaskForm: UntypedFormGroup = new UntypedFormGroup({
        maskInput: new UntypedFormControl('', {}),
    });

    unvalidatedMaskForm: UntypedFormGroup = new UntypedFormGroup({
        maskInput2: new UntypedFormControl('', {}),
    });
}
