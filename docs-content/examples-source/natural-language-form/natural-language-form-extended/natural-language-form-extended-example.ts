import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxNaturalLanguageFormComponent,
  NxWordComponent,
} from '@allianz/ng-aquila/natural-language-form';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Extended example
 */
@Component({
  selector: 'natural-language-form-extended-example',
  templateUrl: './natural-language-form-extended-example.html',
  styleUrls: ['./natural-language-form-extended-example.css'],
  imports: [
    FormsModule,
    NxNaturalLanguageFormComponent,
    ReactiveFormsModule,
    NxWordComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputDirective,
    NxButtonComponent,
    JsonPipe,
    NxErrorComponent,
  ],
})
export class NaturalLanguageFormExtendedExampleComponent {
  readonly naturalForm = this.fb.group({
    who: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    spots: new FormControl('', [
      Validators.pattern('[0-9]*'),
      Validators.required,
    ]),
  });

  constructor(private readonly fb: FormBuilder) {}

  validate() {
    Object.values(this.naturalForm.controls).forEach((control) => {
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
