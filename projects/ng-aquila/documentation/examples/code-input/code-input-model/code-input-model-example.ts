import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @title Manipulating model example
 */
@Component({
    selector: 'code-input-model-example',
    templateUrl: 'code-input-model-example.html',
    styleUrls: ['code-input-model-example.css'],
})
export class CodeInputModelExampleComponent implements OnInit {
    inputValue: string = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
                validators: [Validators.required, Validators.minLength(4)],
                updateOn: 'change',
            }),
        });

        this.keyCode?.valueChanges.subscribe(() => {
            if (this.keyCode?.valid && this.keyCode.value !== '1234') {
                this.codeForm.setValue({ keyCode: '1234' });
            }
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
