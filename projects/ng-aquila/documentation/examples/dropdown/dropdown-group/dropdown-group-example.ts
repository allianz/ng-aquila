import {
  NxDropdownComponent,
  NxDropdownGroupComponent,
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
 * @title Dropdown group example
 */
@Component({
  selector: 'dropdown-group-example',
  templateUrl: './dropdown-group-example.html',
  styleUrls: ['./dropdown-group-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownGroupComponent,
    NxDropdownItemComponent,
  ],
})
export class DropdownGroupExampleComponent {
  testBind = 'Catfish';
}
