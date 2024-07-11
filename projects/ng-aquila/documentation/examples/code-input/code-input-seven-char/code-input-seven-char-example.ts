import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCodeInputComponent } from '@aposin/ng-aquila/code-input';

/**
 * @title Seven character code input example
 */
@Component({
    selector: 'code-input-seven-char-example',
    templateUrl: 'code-input-seven-char-example.html',
    styleUrls: ['code-input-seven-char-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCodeInputComponent,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class CodeInputSevenCharExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
                validators: [Validators.required, Validators.minLength(7)],
                updateOn: 'submit',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
