import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * @title IBAN mask example
 */
@Component({
    selector: 'iban-mask-example',
    templateUrl: './iban-mask-example.html',
    styleUrls: ['./iban-mask-example.css'],
})
export class IbanMaskExampleComponent {
    validatedMaskForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {}),
    });
}
