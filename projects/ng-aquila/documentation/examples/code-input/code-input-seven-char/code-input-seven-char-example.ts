import { Component, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Seven character code input example
 */
@Component({
    selector: 'code-input-seven-char-example',
    templateUrl: 'code-input-seven-char-example.html',
    styleUrls: ['code-input-seven-char-example.css'],
})
export class CodeInputSevenCharExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(this.inputValue, {
                validators: [Validators.required, Validators.minLength(7)],
                updateOn: 'submit',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
