import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxNaturalLanguageFormComponent,
    NxWordComponent,
} from '@aposin/ng-aquila/natural-language-form';

/**
 * @title Basic example
 */
@Component({
    selector: 'natural-language-form-basic-example',
    templateUrl: './natural-language-form-basic-example.html',
    styleUrls: ['./natural-language-form-basic-example.css'],
    imports: [
        NxNaturalLanguageFormComponent,
        NxWordComponent,
        NxInputDirective,
        FormsModule,
        NxErrorComponent,
    ],
})
export class NaturalLanguageFormBasicExampleComponent {}
