import {
  NxDropdownComponent,
  NxDropdownOption,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Standard lazy example
 */
@Component({
  selector: 'dropdown-lazy-example',
  templateUrl: './dropdown-lazy-example.html',
  styleUrls: ['./dropdown-lazy-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
  ],
})
export class DropdownLazyExampleComponent {
  items: NxDropdownOption[];

  constructor() {
    this.items = [];
    for (let i = 1; i <= 500; i++) {
      this.items.push({
        label: `Item ${i}`,
        value: i,
      });
    }
  }
}
