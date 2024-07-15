import { Component } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxNaturalLanguageFormComponent,
    NxWordComponent,
} from '@aposin/ng-aquila/natural-language-form';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'natural-language-form-negative-example',
    templateUrl: './natural-language-form-negative-example.html',
    styleUrls: ['./natural-language-form-negative-example.css'],
    standalone: true,
    imports: [
        NxNaturalLanguageFormComponent,
        NxWordComponent,
        NxInputDirective,
    ],
})
export class NaturalLanguageFormNegativeExampleComponent {}
