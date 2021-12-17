import { Component } from '@angular/core';

/**
 * @title Filter example
 */
@Component({
    selector: 'dropdown-filter-example',
    templateUrl: './dropdown-filter-example.html',
    styleUrls: ['./dropdown-filter-example.css'],
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
