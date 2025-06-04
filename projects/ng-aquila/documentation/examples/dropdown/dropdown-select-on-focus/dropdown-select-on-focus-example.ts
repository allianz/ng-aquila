import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxMultiSelectComponent,
    SelectOnFocusDirective,
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
 * @title Dropdown copy directive example
 */
@Component({
    selector: 'dropdown-select-on-focus-example',
    templateUrl: './dropdown-select-on-focus-example.html',
    styleUrls: ['./dropdown-select-on-focus-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        FormsModule,
        NxDropdownItemComponent,
        SelectOnFocusDirective,
        NxMultiSelectComponent,
    ],
})
export class DropdownSelectOnFocusExampleComponent {
    selectedModel = '';
    options = [
        {
            label: 'Apple',
            id: 1,
        },
        {
            label: 'Banana',
            id: 2,
        },
        {
            label: 'Strawberry',
            id: 3,
        },
        {
            label: 'Orange',
            id: 4,
        },
    ];
}
