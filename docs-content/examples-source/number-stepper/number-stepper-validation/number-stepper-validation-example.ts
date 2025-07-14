import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Validation example
 */
@Component({
  selector: 'number-stepper-validation-example',
  templateUrl: './number-stepper-validation-example.html',
  styleUrls: ['./number-stepper-validation-example.css'],
  imports: [
    NxNumberStepperComponent,
    FormsModule,
    NxMessageComponent,
    NxErrorComponent,
    NxLabelComponent,
  ],
})
export class NumberStepperValidationExampleComponent {
  number = 0;
}
