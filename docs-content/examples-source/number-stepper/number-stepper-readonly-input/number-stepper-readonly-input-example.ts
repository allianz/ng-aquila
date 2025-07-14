import { NxNumberStepperComponent } from '@allianz/ng-aquila/number-stepper';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'number-stepper-readonly-input-example',
  templateUrl: './number-stepper-readonly-input-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxNumberStepperComponent],
})
export class NumberStepperReadonlyInputExampleComponent {}
