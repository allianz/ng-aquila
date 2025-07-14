import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';

/**
 * @title Number Formatting example
 */
@Component({
  selector: 'number-stepper-formatting-example',
  templateUrl: './number-stepper-formatting-example.html',
  styleUrls: ['./number-stepper-formatting-example.css'],
  imports: [NxCopytextComponent, NxNumberStepperComponent],
})
export class NumberStepperFormattingExampleComponent {}
