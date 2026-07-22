import {
  NxErrorComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
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
 * @title Simple form example
 */
@Component({
  selector: 'formfield-simple-form-example',
  templateUrl: './formfield-simple-form-example.html',
  styleUrls: ['./formfield-simple-form-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxButtonComponent,
    NxInfoIconComponent,
    NxLabelInfoDirective,
  ],
})
export class FormfieldSimpleFormExampleComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormBuilder().group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      items: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
}
