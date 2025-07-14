import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
  selector: 'number-stepper-reactive-example',
  templateUrl: './number-stepper-reactive-example.html',
  styleUrls: ['./number-stepper-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxNumberStepperComponent,
    JsonPipe,
    NxErrorComponent,
  ],
})
export class NumberStepperReactiveExampleComponent {
  readonly testForm = this.fb.group({
    stepperTestReactive: 3,
  });

  constructor(private readonly fb: FormBuilder) {}
}
