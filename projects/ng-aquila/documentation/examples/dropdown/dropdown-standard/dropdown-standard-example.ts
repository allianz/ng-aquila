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
 * @title Standard dropdown example
 */
@Component({
    selector: 'dropdown-standard-example',
    templateUrl: './dropdown-standard-example.html',
    styleUrls: ['./dropdown-standard-example.css'],
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
export class DropdownStandardExampleComponent {
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

    toText(value: string): string | null {
        return value ? value.toUpperCase() : null;
    }
}
