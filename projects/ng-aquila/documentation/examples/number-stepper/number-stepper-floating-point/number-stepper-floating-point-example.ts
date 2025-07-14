import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';

/**
 * @title Floating point example
 */
@Component({
  selector: 'number-stepper-floating-point-example',
  templateUrl: './number-stepper-floating-point-example.html',
  styleUrls: ['./number-stepper-floating-point-example.css'],
  imports: [NxNumberStepperComponent],
})
export class NumberStepperFloatingPointExampleComponent {
  number = 0;
}
