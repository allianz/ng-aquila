import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';

/**
 * @title Simple binding example
 */
@Component({
  selector: 'number-stepper-simple-binding-example',
  templateUrl: './number-stepper-simple-binding-example.html',
  styleUrls: ['./number-stepper-simple-binding-example.css'],
  imports: [NxNumberStepperComponent],
})
export class NumberStepperSimpleBindingExampleComponent {
  number = 1;
}
