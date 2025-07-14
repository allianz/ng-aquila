import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Timefield reactive forms example
 */
@Component({
  selector: 'timefield-reactive-example',
  templateUrl: './timefield-reactive-example.html',
  styleUrls: ['./timefield-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxTimefieldComponent,
    NxErrorComponent,
    JsonPipe,
  ],
})
export class TimefieldReactiveExampleComponent {
  readonly testForm = this.fb.group({
    timefieldReactive: ['22:54', Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
