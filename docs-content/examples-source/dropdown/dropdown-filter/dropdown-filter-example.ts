import { Component } from '@angular/core';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxMultiSelectComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Filter example
 */
@Component({
    selector: 'dropdown-filter-example',
    templateUrl: './dropdown-filter-example.html',
    styleUrls: ['./dropdown-filter-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxMultiSelectComponent,
    ],
})
export class DropdownFilterExampleComponent {
    options = [
        'BMW',
        'Audi',
        'VW',
        'Mercedes',
        'Porsche',
        'Tesla',
        'Lada',
        'Opel',
        'Fiat',
        'Ford',
        'Kia',
        'Toyota',
        'Ferrari',
    ];
}
