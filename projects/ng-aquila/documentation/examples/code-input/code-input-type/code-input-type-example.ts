import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 * @title Code input type example
 */
@Component({
    selector: 'code-input-type-example',
    templateUrl: './code-input-type-example.html',
    styleUrls: ['./code-input-type-example.css'],
})
export class CodeInputTypeExampleComponent implements OnInit {
    inputValue: string = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
                validators: [Validators.required, Validators.pattern(RegExp('^[0-9]*$')), Validators.minLength(4)],
                updateOn: 'submit',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
