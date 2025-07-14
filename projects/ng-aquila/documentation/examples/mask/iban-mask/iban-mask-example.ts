import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxIbanMaskDirective, NxMaskDirective } from '@allianz/ng-aquila/mask';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

/**
 * @title IBAN mask example
 */
@Component({
  selector: 'iban-mask-example',
  templateUrl: './iban-mask-example.html',
  styleUrls: ['./iban-mask-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxMaskDirective,
    NxIbanMaskDirective,
    NxButtonComponent,
    JsonPipe,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class IbanMaskExampleComponent {
  validatedMaskForm: FormGroup = new FormGroup({
    maskInput: new FormControl('', {}),
  });
}
