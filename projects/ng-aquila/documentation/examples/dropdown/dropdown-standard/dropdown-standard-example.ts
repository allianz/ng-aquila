import { Component } from '@angular/core';

/**
 * @title Standard dropdown example
 */
@Component({
  templateUrl: './dropdown-standard-example.html'
})
export class DropdownStandardExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  toText(value): string {
    return value ? value.toUpperCase() : null;
  }
}
