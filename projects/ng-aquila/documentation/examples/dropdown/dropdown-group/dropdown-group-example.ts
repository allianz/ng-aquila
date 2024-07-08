import { Component } from '@angular/core';
import {
    NxDropdownComponent,
    NxDropdownGroupComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Dropdown group example
 */
@Component({
    selector: 'dropdown-group-example',
    templateUrl: './dropdown-group-example.html',
    styleUrls: ['./dropdown-group-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownGroupComponent,
        NxDropdownItemComponent,
    ],
})
export class DropdownGroupExampleComponent {
    testBind = 'Catfish';
}
