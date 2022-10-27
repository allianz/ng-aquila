import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    Validators,
} from '@angular/forms';

/**
 * @title Extended example
 */
@Component({
    selector: 'natural-language-form-extended-example',
    templateUrl: './natural-language-form-extended-example.html',
    styleUrls: ['./natural-language-form-extended-example.css'],
})
export class NaturalLanguageFormExtendedExampleComponent {
    readonly naturalForm = this.fb.group({
        who: new UntypedFormControl('', [Validators.required]),
        city: new UntypedFormControl('', [Validators.required]),
        spots: new UntypedFormControl('', [
            Validators.pattern('[0-9]*'),
            Validators.required,
        ]),
    });

    constructor(private readonly fb: UntypedFormBuilder) {}

    validate() {
        Object.values(this.naturalForm.controls).forEach(control => {
            control?.markAsTouched({ onlySelf: true });
        });
    }
}
