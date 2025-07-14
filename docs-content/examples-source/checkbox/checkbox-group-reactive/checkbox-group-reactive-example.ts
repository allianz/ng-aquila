import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Checkbox group reactive example
 */
@Component({
  selector: 'checkbox-group-reactive-example',
  templateUrl: './checkbox-group-reactive-example.html',
  styleUrls: ['./checkbox-group-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxCheckboxGroupComponent,
    NxLabelComponent,
    NxCheckboxComponent,
    JsonPipe,
  ],
})
export class CheckboxGroupReactiveExampleComponent {
  readonly myFormGroup = this.fb.group({
    terms: [],
  });

  constructor(private readonly fb: FormBuilder) {}
}
