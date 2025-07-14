import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
  selector: 'dropdown-reactive-example',
  templateUrl: './dropdown-reactive-example.html',
  styleUrls: ['./dropdown-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxFormfieldNoteDirective,
    NxButtonComponent,
    JsonPipe,
  ],
})
export class DropdownReactiveExampleComponent {
  form = new FormBuilder().group({
    dropdown: ['BMW', Validators.required],
  });

  patch(value: string) {
    this.form.patchValue({ dropdown: value });
  }
}
