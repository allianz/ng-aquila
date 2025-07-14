import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

/**
 * @title Error Reset Example
 */
@Component({
  selector: 'error-reset-example',
  templateUrl: './error-reset-example.html',
  styleUrls: ['./error-reset-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxButtonComponent,
  ],
})
export class ErrorResetExampleComponent {
  constructor(private readonly fb: UntypedFormBuilder) {}

  form = this.fb.group({
    label: ['', Validators.required],
  });
}
