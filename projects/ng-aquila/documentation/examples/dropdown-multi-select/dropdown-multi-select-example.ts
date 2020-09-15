import { Component } from '@angular/core';

/**
 * @title Multi select example
 */
@Component({
  templateUrl: './dropdown-multi-select-example.html'
})
export class DropdownMultiSelectExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  toText(value): string {
    return value ? value.toUpperCase() : null;
  }

  toTextMulti(value): any {
    if (value) {
      if (Array.isArray(value)) {
        return value.map(item => item.toUpperCase()).join(', ');
      } else {
        return value.toUpperCase();
      }
    }
    return '';
  }

  myFilter(search, itemValue) {
    return itemValue.match(new RegExp('^' + search, 'g')) !== null;
  }
}
