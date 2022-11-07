import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Six character code input example
 */
@Component({
    selector: 'code-input-six-char-example',
    templateUrl: 'code-input-six-char-example.html',
    styleUrls: ['code-input-six-char-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeInputSixCharExampleComponent implements OnInit {
    inputValue = '';
    codeForm!: UntypedFormGroup;

    ngOnInit() {
        this.codeForm = new UntypedFormGroup({
            keyCode: new UntypedFormControl(this.inputValue, {
                validators: [Validators.required, Validators.minLength(6)],
                updateOn: 'blur',
            }),
        });
    }

    get keyCode() {
        return this.codeForm.get('keyCode');
    }
}
