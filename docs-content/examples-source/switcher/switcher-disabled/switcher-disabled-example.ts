import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/** @title Switcher Disabled Reactive Form */
@Component({
  selector: 'switcher-disabled-example',
  templateUrl: './switcher-disabled-example.html',
  styleUrls: ['./switcher-disabled-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxSwitcherComponent,
    NxButtonComponent,
  ],
})
export class SwitcherDisabledExampleComponent {
  checked = true;
  templateModel = false;

  readonly testForm = this.fb.group({
    switcherDisabledReactive: [false, Validators.requiredTrue],
  });

  constructor(private readonly fb: FormBuilder) {
    this.testForm.disable();
  }

  switchStatusClick() {
    if (this.testForm.disabled) {
      this.testForm.enable();
    } else {
      this.testForm.disable();
    }
  }
}
