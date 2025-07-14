import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
  selector: 'input-reactive-example',
  templateUrl: './input-reactive-example.html',
  styleUrls: ['./input-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxInputDirective,
    JsonPipe,
    NxErrorComponent,
  ],
})
export class InputReactiveExampleComponent {
  testForm: FormGroup = new FormGroup({
    textfield: new FormControl('', {
      validators: Validators.required,
    }),
  });
}
