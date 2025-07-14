import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMaskDirective } from '@allianz/ng-aquila/mask';
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
 * @title Validation example
 */
@Component({
  selector: 'mask-validation-example',
  templateUrl: './mask-validation-example.html',
  styleUrls: ['./mask-validation-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxMaskDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    JsonPipe,
  ],
})
export class MaskValidationExampleComponent {
  validatedMaskForm: FormGroup = new FormGroup({
    maskInput: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  unvalidatedMaskForm: FormGroup = new FormGroup({
    maskInput2: new FormControl('', {}),
  });
}
