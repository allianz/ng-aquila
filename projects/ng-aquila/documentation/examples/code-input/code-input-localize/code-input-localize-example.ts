import { NxCodeInputIntl } from '@allianz/ng-aquila/code-input';
import { Component, Injectable, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

@Injectable()
export class MyIntl extends NxCodeInputIntl {
    inputFieldAriaLabel = 'Key eingeben';
    ofLabel = 'von';
}

/**
 * @title Localization example
 */
@Component({
    selector: 'code-input-localize-example',
    templateUrl: 'code-input-localize-example.html',
    styleUrls: ['code-input-localize-example.css'],
    providers: [{ provide: NxCodeInputIntl, useClass: MyIntl }],
})
export class CodeInputLocalizeExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(this.inputValue, {
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
