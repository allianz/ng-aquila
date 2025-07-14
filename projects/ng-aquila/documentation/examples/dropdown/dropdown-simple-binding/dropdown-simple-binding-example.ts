import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Simple binding example
 */
@Component({
  selector: 'dropdown-simple-binding-example',
  templateUrl: './dropdown-simple-binding-example.html',
  styleUrls: ['./dropdown-simple-binding-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxButtonComponent,
  ],
})
export class DropdownSimpleBindingExampleComponent {
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

  simpleBinding = 'Audi';
}
