import {
  NxDropdownComponent,
  NxDropdownItemComponent,
  NxMultiSelectComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

interface MyOption {
  name: string;
  id: number;
}

/**
 * @title Disabled items example
 */
@Component({
  selector: 'dropdown-disabled-items-example',
  templateUrl: './dropdown-disabled-items-example.html',
  styleUrls: ['./dropdown-disabled-items-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxMultiSelectComponent,
  ],
})
export class DropdownDisabledItemsExampleComponent {
  options: MyOption[] = [
    {
      name: 'BMW',
      id: 1,
    },
    {
      name: 'Audi',
      id: 2,
    },
    {
      name: 'Volvo',
      id: 3,
    },
    {
      name: 'Mini',
      id: 4,
    },
  ];

  isOptionDisabled(option: MyOption) {
    return option.id % 2 === 0;
  }
}
