import { Component } from '@angular/core';

/**
 * @title Examples for rendering items
 */
@Component({
    selector: 'dropdown-rendering-items-example',
    templateUrl: './dropdown-rendering-items-example.html',
    styleUrls: ['./dropdown-rendering-items-example.css'],
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
