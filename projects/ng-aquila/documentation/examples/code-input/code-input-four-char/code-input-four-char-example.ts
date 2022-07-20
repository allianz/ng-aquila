import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
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
