import { Component } from '@angular/core';

/**
* @title Dropdown with placeholder example
*/
@Component({
  selector: 'nx-dropdown-placeholder-example',
  templateUrl: 'dropdown-placeholder-example.html'
})
export class DropdownPlaceholderExampleComponent {

  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];
}
