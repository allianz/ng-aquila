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
    NxFormfieldNoteDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMessageComponent } from '@aposin/ng-aquila/message';
import { Moment } from 'moment';

/**
 * @title Basic date field example
 */
@Component({
    selector: 'datefield-basic-example',
    templateUrl: './datefield-basic-example.html',
    styleUrls: ['./datefield-basic-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxFormfieldHintDirective,
        NxMessageComponent,
        NxFormfieldNoteDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
    ],
})
export class DatefieldBasicExampleComponent {
    currentDate: Moment | null = null;
}
