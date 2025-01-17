import { Component } from '@angular/core';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'dropdown-negative-example',
    templateUrl: './dropdown-negative-example.html',
    styleUrls: ['./dropdown-negative-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
    ],
})
export class DropdownNegativeExampleComponent {}
