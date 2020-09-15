import { Component } from '@angular/core';

/**
* @title Simple binding example
*/
@Component({
  templateUrl: './dropdown-simple-binding-example.html',
  styleUrls: ['./dropdown-simple-binding-example.css']
})
export class DropdownSimpleBindingExampleComponent {
  demoData = [
    'BMW', 'Audi', 'VW', 'Mercedes', 'Porsche', 'Tesla', 'Lada',
    'Opel', 'Fiat', 'Ford', 'Kia', 'Toyota', 'Ferrari'
  ];

  simpleBinding: string = 'Audi';
}
