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
 * @title Examples for rendering items
 */
@Component({
    selector: 'dropdown-rendering-items-example',
    templateUrl: './dropdown-rendering-items-example.html',
    styleUrls: ['./dropdown-rendering-items-example.css'],
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
export class DropdownRenderingItemsExampleComponent {
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

    toText(value: string): string | null {
        return value ? value.toUpperCase() : null;
    }
}
