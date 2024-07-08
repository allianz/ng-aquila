import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
 * @title Six character code input example
 */
@Component({
    selector: 'code-input-six-char-example',
    templateUrl: 'code-input-six-char-example.html',
    styleUrls: ['code-input-six-char-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCodeInputComponent,
        NgIf,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class CodeInputSixCharExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: FormGroup;

    ngOnInit() {
        this.codeForm = new FormGroup({
            keyCode: new FormControl(this.inputValue, {
                validators: [Validators.required, Validators.minLength(6)],
                updateOn: 'blur',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
