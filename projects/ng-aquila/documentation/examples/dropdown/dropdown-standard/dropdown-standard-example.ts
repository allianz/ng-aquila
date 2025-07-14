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
 * @title Standard dropdown example
 */
@Component({
  selector: 'dropdown-standard-example',
  templateUrl: './dropdown-standard-example.html',
  styleUrls: ['./dropdown-standard-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
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
