import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

/**
 * @title IBAN mask example
 */
@Component({
    selector: 'iban-mask-example',
    templateUrl: './iban-mask-example.html',
    styleUrls: ['./iban-mask-example.css'],
})
export class IbanMaskExampleComponent {
    validatedMaskForm: UntypedFormGroup = new UntypedFormGroup({
        maskInput: new UntypedFormControl('', {}),
    });
}
