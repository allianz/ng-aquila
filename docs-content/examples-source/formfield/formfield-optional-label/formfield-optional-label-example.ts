import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Optional label example
 */
@Component({
  selector: 'formfield-optional-label-example',
  templateUrl: './formfield-optional-label-example.html',
  styleUrls: ['./formfield-optional-label-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputDirective,
  ],
})
export class FormfieldOptionalLabelExampleComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormBuilder().group({
      firstName: ['', Validators.required],
      lastName: [''],
      items: [''],
      email: ['', Validators.required],
    });
  }
}
