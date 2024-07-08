import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
} from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
/**
 * @title Manual control example
 */
@Component({
    selector: 'datefield-manual-example',
    templateUrl: './datefield-manual-example.html',
    styleUrls: ['./datefield-manual-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        NxDatefieldDirective,
        FormsModule,
        NxDatepickerComponent,
        NxButtonComponent,
    ],
})
export class DatefieldManualExampleComponent {}
