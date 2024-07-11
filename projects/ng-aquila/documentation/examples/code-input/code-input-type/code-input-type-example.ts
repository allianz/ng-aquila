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
 * @title Code input type example
 */
@Component({
    selector: 'code-input-type-example',
    templateUrl: './code-input-type-example.html',
    styleUrls: ['./code-input-type-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCodeInputComponent,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class CodeInputTypeExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
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
