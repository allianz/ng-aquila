import { Component, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Four character code input example
 */
@Component({
    selector: 'code-input-four-char-example',
    templateUrl: 'code-input-four-char-example.html',
    styleUrls: ['code-input-four-char-example.css'],
})
export class CodeInputFourCharExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(this.inputValue, {
                validators: [
                    Validators.required,
                    Validators.pattern('[A-Z]+'),
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
