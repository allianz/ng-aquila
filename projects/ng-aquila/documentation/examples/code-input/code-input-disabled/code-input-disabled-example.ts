import { Component, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Disabled example
 */
@Component({
    selector: 'code-input-disabled-example',
    templateUrl: 'code-input-disabled-example.html',
    styleUrls: ['code-input-disabled-example.css'],
})
export class CodeInputDisabledExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(
                { value: this.inputValue, disabled: true },
                {
                    validators: [
                        Validators.required,
                        Validators.pattern('[A-Z]+'),
                        Validators.minLength(4),
                    ],
                    updateOn: 'submit',
                },
            ),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }

    toggleDisabled() {
        if (this.keyCode?.disabled) {
            this.keyCode.enable();
        } else {
            this.keyCode?.disable();
        }
    }
}
