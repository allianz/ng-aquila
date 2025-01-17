import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

@Component({
    selector: 'number-stepper-readonly-input-example',
    templateUrl: './number-stepper-readonly-input-example.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NxNumberStepperComponent],
})
export class NumberStepperReadonlyInputExampleComponent {}
