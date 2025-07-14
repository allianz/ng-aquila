import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Tag Reactive Example
 */
@Component({
  selector: 'taglist-reactive-example',
  templateUrl: './taglist-reactive-example.html',
  styleUrls: ['./taglist-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxTaglistComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
    JsonPipe,
  ],
})
export class TaglistReactiveExampleComponent {
  readonly testForm = this.fb.group({
    tagsTestReactive: [['Apples', 'Oranges'], Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
