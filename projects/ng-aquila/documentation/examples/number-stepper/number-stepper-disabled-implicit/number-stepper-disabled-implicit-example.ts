import {
  NxNumberStepperComponent,
  NxNumberStepperPrefixDirective,
  NxNumberStepperSuffixDirective,
} from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

/**
 * @title Disabled as part of disabled form example
 */
@Component({
  selector: 'number-stepper-disabled-implicit-example',
  templateUrl: './number-stepper-disabled-implicit-example.html',
  styleUrls: ['./number-stepper-disabled-implicit-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxNumberStepperComponent,
    NxNumberStepperSuffixDirective,
    NxNumberStepperPrefixDirective,
  ],
})
export class NumberStepperDisabledImplicitExampleComponent {
  fb = new FormGroup({
    amount: new FormControl({ value: '', disabled: true }),
  });
}
