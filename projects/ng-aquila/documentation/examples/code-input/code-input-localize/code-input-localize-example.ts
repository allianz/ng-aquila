import { Component, Injectable, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCodeInputComponent,
    NxCodeInputIntl,
} from '@aposin/ng-aquila/code-input';

@Injectable()
export class MyIntl extends NxCodeInputIntl {
    inputFieldAriaLabel = 'Geben Sie den OTP-Code ein';
    ofLabel = 'von';
}

/**
 * @title Aria labelling example
 */
@Component({
    selector: 'code-input-localize-example',
    templateUrl: 'code-input-localize-example.html',
    styleUrls: ['code-input-localize-example.css'],
    providers: [{ provide: NxCodeInputIntl, useClass: MyIntl }],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCodeInputComponent,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class CodeInputLocalizeExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
                validators: [
                    Validators.required,
                    Validators.pattern('[A-Z]+'),
                    Validators.minLength(5),
                ],
                updateOn: 'submit',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
