import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/** @title Switcher Reactive Form */
@Component({
  selector: 'switcher-reactive-form-example',
  templateUrl: './switcher-reactive-form-example.html',
  styleUrls: ['./switcher-reactive-form-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxSwitcherComponent,
    NxButtonComponent,
    JsonPipe,
    NxErrorComponent,
  ],
})
export class SwitcherReactiveFormExampleComponent {
  @ViewChild(NxSwitcherComponent) switcher!: NxSwitcherComponent;
  readonly testForm = this.fb.group({
    switcherTestReactive: [false, Validators.requiredTrue],
  });

  isSubmitted = false;

  constructor(private readonly fb: FormBuilder) {}

  onSubmit() {
    this.isSubmitted = true;
  }
}
