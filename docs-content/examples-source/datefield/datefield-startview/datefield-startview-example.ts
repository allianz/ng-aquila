import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
/**
 * @title Start view example
 */
@Component({
    selector: 'datefield-startview-example',
    templateUrl: './datefield-startview-example.html',
    styleUrls: ['./datefield-startview-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        NxDatefieldDirective,
        FormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
    ],
})
export class DatefieldStartviewExampleComponent {}
