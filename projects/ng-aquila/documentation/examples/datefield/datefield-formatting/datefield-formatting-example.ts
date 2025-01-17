import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Formatting example
 */
@Component({
    selector: 'datefield-formatting-example',
    templateUrl: './datefield-formatting-example.html',
    styleUrls: ['./datefield-formatting-example.css'],
    imports: [
        NxFormfieldComponent,
        FormsModule,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldFormattingExampleComponent {}
