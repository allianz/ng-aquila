import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxDatefieldDirective } from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Use strings as inputs
 */
@Component({
    selector: 'datefield-iso-example',
    templateUrl: './datefield-iso-example.html',
    styleUrls: ['./datefield-iso-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldIsoExampleComponent {
    inputString = '2020-01-01';
}
