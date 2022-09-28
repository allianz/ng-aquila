import { Component, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Code input type example
 */
@Component({
    selector: 'code-input-type-example',
    templateUrl: './code-input-type-example.html',
    styleUrls: ['./code-input-type-example.css'],
})
export class CodeInputTypeExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(this.inputValue, {
                validators: [
                    Validators.required,
                    Validators.pattern(/^\d*$/),
                    Validators.minLength(4),
                ],
                updateOn: 'submit',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
