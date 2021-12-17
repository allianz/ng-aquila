import { Component } from '@angular/core';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';

/**
 * @title Outline formfield example
 */
@Component({
    selector: 'dropdown-outline-example',
    templateUrl: './dropdown-outline-example.html',
    styleUrls: ['./dropdown-outline-example.css'],
    providers: [
        {
            provide: FORMFIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', nxFloatLabel: 'always' },
        },
    ],
})
export class DropdownOutlineExampleComponent {
    options: string[] = [
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

    groups = [
        {
            label: 'Birds',
            items: ['Parrot', 'Pidgin', 'Swallow'],
        },
        {
            label: 'Fish',
            items: ['Salmon', 'Mackerel', 'Catfish'],
        },
    ];

    model: string = 'Catfish';

    brands: string[] = [];
}
