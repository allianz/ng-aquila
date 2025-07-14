import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template-driven example with ngModel
 */
@Component({
  selector: 'number-stepper-template-driven-example',
  templateUrl: './number-stepper-template-driven-example.html',
  styleUrls: ['./number-stepper-template-driven-example.css'],
  imports: [FormsModule, NxNumberStepperComponent],
})
export class NumberStepperTemplateDrivenExampleComponent {
  number = 3;
}
