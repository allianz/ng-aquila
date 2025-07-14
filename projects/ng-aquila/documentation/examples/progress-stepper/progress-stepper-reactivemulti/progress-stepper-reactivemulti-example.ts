import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxMultiStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Progress Indicator reactive form with separate form per step
 */
@Component({
  selector: 'progress-stepper-reactivemulti-example',
  templateUrl: './progress-stepper-reactivemulti-example.html',
  styleUrls: ['./progress-stepper-reactivemulti-example.css'],
  imports: [
    NxMultiStepperComponent,
    NxStepComponent,
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
    JsonPipe,
  ],
})
export class ProgressStepperReactivemultiExampleComponent {
  readonly stepOneForm = this.fb.group({ name: '' });
  readonly stepTwoForm = this.fb.group({ age: '' });

  constructor(private readonly fb: FormBuilder) {}
}
