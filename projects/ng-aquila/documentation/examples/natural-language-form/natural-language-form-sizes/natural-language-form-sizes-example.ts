import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    standalone: true,
    imports: [
        NxNaturalLanguageFormComponent,
        NxWordComponent,
        NxInputDirective,
        FormsModule,
        NxFormfieldErrorDirective,
        NxDropdownComponent,
        NxDropdownItemComponent,
    ],
})
export class NaturalLanguageFormSizesExampleComponent {}
