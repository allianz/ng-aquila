import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxDateRangeComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxSwitcherComponent } from '@aposin/ng-aquila/switcher';

/**
 * @title Disabled example
 */
@Component({
    selector: 'datefield-disabled-example',
    templateUrl: './datefield-disabled-example.html',
    styleUrls: ['./datefield-disabled-example.css'],
    imports: [
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxDateRangeComponent,
        NxSwitcherComponent,
        FormsModule,
    ],
})
export class DatefieldDisabledExampleComponent {
    disabledAttribute = true;
}
