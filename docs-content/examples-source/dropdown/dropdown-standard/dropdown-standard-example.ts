import { Component } from '@angular/core';

/**
 * @title Standard dropdown example
 */
@Component({
    selector: 'dropdown-standard-example',
    templateUrl: './dropdown-standard-example.html',
    styleUrls: ['./dropdown-standard-example.css'],
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
