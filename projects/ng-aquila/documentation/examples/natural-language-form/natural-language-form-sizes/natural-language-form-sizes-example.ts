import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxNaturalLanguageFormComponent,
  NxWordComponent,
} from '@allianz/ng-aquila/natural-language-form';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Size example
 */
@Component({
  selector: 'natural-language-form-sizes-example',
  templateUrl: './natural-language-form-sizes-example.html',
  styleUrls: ['./natural-language-form-sizes-example.css'],
  imports: [
    NxNaturalLanguageFormComponent,
    NxWordComponent,
    NxInputDirective,
    FormsModule,
    ReactiveFormsModule,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxErrorComponent,
  ],
})
export class NaturalLanguageFormSizesExampleComponent {
  readonly largeForm = this.fb.group({
    job: new FormControl('', [Validators.required]),
    what: new FormControl('', [Validators.required]),
  });

  constructor(private readonly fb: FormBuilder) {}
}
