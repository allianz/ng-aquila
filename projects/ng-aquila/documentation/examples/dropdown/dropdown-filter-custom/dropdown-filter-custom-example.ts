import { Component } from '@angular/core';

/**
 * @title Custom Filter Example
 */
@Component({
    selector: 'dropdown-filter-custom-example',
    templateUrl: './dropdown-filter-custom-example.html',
    styleUrls: ['./dropdown-filter-custom-example.css'],
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
