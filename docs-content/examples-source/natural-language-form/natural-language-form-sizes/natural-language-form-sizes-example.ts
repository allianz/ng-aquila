import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldErrorDirective } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxNaturalLanguageFormComponent,
    NxWordComponent,
} from '@aposin/ng-aquila/natural-language-form';

/**
 * @title Size example
 */
@Component({
    selector: 'natural-language-form-sizes-example',
    templateUrl: './natural-language-form-sizes-example.html',
    styleUrls: ['./natural-language-form-sizes-example.css'],
    imports: [
        NxNaturalLanguageFormComponent,
        NxWordComponent,
        NxInputDirective,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldErrorDirective,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxErrorComponent,
    ],
})
export class NaturalLanguageFormSizesExampleComponent {
    readonly largeForm = this.fb.group({
        job: new FormControl('', [Validators.required]),
        what: new FormControl('', [Validators.required]),
    });

    constructor(private readonly fb: FormBuilder) {}
}
