import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
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
    standalone: true,
    imports: [
        NxFormfieldComponent,
        FormsModule,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
    ],
})
export class DatefieldFormattingExampleComponent {}
