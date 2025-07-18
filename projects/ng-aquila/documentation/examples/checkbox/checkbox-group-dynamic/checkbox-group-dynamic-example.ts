import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Checkbox group dynamic checkboxes example
 */
@Component({
  selector: 'checkbox-group-dynamic-example',
  templateUrl: './checkbox-group-dynamic-example.html',
  styleUrls: ['./checkbox-group-dynamic-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxCheckboxGroupComponent,
    NxLabelComponent,
    NxErrorComponent,
    NxCheckboxComponent,
    NxButtonComponent,
    JsonPipe,
  ],
})
export class CheckboxGroupDynamicExampleComponent {
  readonly myFormGroup = this.fb.group({
    terms: [[], Validators.required],
  });

  readonly data = ['one', 'two', 'three'];

  i = 1;

  constructor(private readonly fb: FormBuilder) {}

  addNewCb() {
    this.data.push('Checkbox ' + this.i);
    this.i++;
  }

  removeCB() {
    this.data.shift();
  }
}
