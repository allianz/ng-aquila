import {
  DROPDOWN_DEFAULT_OPTIONS,
  NxDropdownComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Default Options Example
 */
@Component({
  selector: 'dropdown-default-options-example',
  templateUrl: './dropdown-default-options-example.html',
  styleUrls: ['./dropdown-default-options-example.css'],
  providers: [
    {
      provide: DROPDOWN_DEFAULT_OPTIONS,
      useValue: { virtualScroll: true },
    },
  ],
  imports: [NxDropdownComponent, NxFormfieldComponent, FormsModule],
})
export class DropdownDefaultOptionsExampleComponent {
  options = Array.from({ length: 100 }, (_, i) => ({
    value: `option-${i}`,
    label: `Option ${i + 1}`,
  }));
  selectedValue: string | null = null;
}
