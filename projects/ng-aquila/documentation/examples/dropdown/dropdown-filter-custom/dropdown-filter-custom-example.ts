import { Component } from '@angular/core';

/**
* @title Custom Filter Example
*/
@Component({
  templateUrl: './dropdown-filter-custom-example.html'
})
export class DropdownFilterCustomExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  myFilter(search, itemValue) {
    return itemValue.match(new RegExp('^' + search, 'g')) !== null;
  }
}
