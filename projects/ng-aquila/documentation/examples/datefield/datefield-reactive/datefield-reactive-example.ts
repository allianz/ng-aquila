import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
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
  selector: 'datefield-reactive-example',
  templateUrl: './datefield-reactive-example.html',
  styleUrls: ['./datefield-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldReactiveExampleComponent {
  testForm: FormGroup = new FormGroup({
    date: new FormControl('', {
      validators: Validators.required,
    }),
  });
}
