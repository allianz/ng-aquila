import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Focus out example
 */
@Component({
  selector: 'dropdown-focus-out-example',
  templateUrl: './dropdown-focus-out-example.html',
  styleUrls: ['./dropdown-focus-out-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldNoteDirective,
  ],
})
export class DropdownFocusOutExampleComponent {
  form = new FormBuilder().group({
    dropdown: ['BMW'],
  });

  focusing = false;

  onFocusOut() {
    this.focusing = false;
  }

  onFocus() {
    this.focusing = true;
  }
}
