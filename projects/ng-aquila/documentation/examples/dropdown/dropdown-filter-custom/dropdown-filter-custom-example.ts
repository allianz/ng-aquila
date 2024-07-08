import { NgFor } from '@angular/common';
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
 * @title Custom Filter Example
 */
@Component({
    selector: 'dropdown-filter-custom-example',
    templateUrl: './dropdown-filter-custom-example.html',
    styleUrls: ['./dropdown-filter-custom-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NgFor,
        NxDropdownItemComponent,
    ],
})
export class DropdownFilterCustomExampleComponent {
    demoData = [
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

    myFilter(search: any, itemValue: any) {
        return itemValue.match(new RegExp('^' + search, 'g')) !== null;
    }
}
