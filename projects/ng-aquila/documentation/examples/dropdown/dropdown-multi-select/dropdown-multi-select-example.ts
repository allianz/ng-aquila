import { Component } from '@angular/core';

/**
 * @title Multi select example
 */
@Component({
  selector: 'dropdown-multi-select-example',
  templateUrl: './dropdown-multi-select-example.html',
  styleUrls: ['./dropdown-multi-select-example.css']
})
export class DropdownMultiSelectExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  toTextMulti(value: string | string[]): string {
    if (value) {
      if (Array.isArray(value)) {
        return value.map(item => item.toUpperCase()).join(', ');
      } else {
        return value.toUpperCase();
      }
    }
    return '';
  }
}
