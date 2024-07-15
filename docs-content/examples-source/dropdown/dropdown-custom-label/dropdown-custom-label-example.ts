import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxDropdownClosedLabelDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

interface TelephonePrefixData {
    prefix: string;
    countryId: string;
}

/**
 * @title Custom label example
 */
@Component({
    selector: 'dropdown-custom-label-example',
    templateUrl: './dropdown-custom-label-example.html',
    styleUrls: ['./dropdown-custom-label-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        FormsModule,
        NxDropdownClosedLabelDirective,
        NxDropdownItemComponent,
    ],
})
export class DropdownCustomLabelExampleComponent {
    customLabelDropdownValue?: TelephonePrefixData;

    telPrefixDemoData: TelephonePrefixData[] = [
        {
            prefix: '+1',
            countryId: 'United States of America',
        },
        {
            prefix: '+49',
            countryId: 'Germany',
        },
        {
            prefix: '+41',
            countryId: 'Switzerland',
        },
    ];
}
