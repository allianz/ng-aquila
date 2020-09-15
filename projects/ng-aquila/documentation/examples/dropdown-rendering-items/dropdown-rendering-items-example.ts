import { Component } from '@angular/core';

/**
 * @title Examples for rendering items
 */
@Component({
  templateUrl: './dropdown-rendering-items-example.html'
})
export class DropdownRenderingItemsExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  toText(value): string {
    return value ? value.toUpperCase() : null;
  }
}
