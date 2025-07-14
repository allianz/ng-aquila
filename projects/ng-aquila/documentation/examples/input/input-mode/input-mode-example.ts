import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Input field inputMode example
 */
@Component({
  selector: 'input-mode-example',
  templateUrl: './input-mode-example.html',
  styleUrls: ['./input-mode-example.css'],
  imports: [
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputDirective,
  ],
})
export class InputModeExampleComponent {
  inputMode = 'text';
}
