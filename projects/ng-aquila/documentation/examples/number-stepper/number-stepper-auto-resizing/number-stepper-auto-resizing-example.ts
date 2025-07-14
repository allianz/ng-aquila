import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Auto resizing example
 */
@Component({
  selector: 'number-stepper-auto-resizing-example',
  templateUrl: './number-stepper-auto-resizing-example.html',
  styleUrls: ['./number-stepper-auto-resizing-example.css'],
  imports: [NxNumberStepperComponent, FormsModule],
})
export class NumberStepperAutoResizingExampleComponent {
  number = 1000;
}
