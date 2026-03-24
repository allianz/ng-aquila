import {
  NxDropdownComponent,
  NxDropdownOption,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Virtual Viewport example
 */
@Component({
  selector: 'dropdown-virtual-viewport-example',
  templateUrl: './dropdown-virtual-viewport-example.html',
  styleUrls: ['./dropdown-virtual-viewport-example.css'],
  imports: [NxDropdownComponent, NxFormfieldComponent, FormsModule],
})
export class DropdownVirtualViewportExampleComponent {
  readonly options: NxDropdownOption[] = Array.from(
    { length: 10000 },
    (_, i) => ({
      value: i,
      label: `${i + 1} - ${this.randomString()}`,
    }),
  );

  private randomString(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  selectedValue: number | null = null;
}
