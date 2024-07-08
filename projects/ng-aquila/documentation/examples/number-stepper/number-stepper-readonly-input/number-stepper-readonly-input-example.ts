import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

@Component({
    selector: 'number-stepper-readonly-input-example',
    templateUrl: './number-stepper-readonly-input-example.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NxNumberStepperComponent],
})
export class NumberStepperReadonlyInputExample {}
