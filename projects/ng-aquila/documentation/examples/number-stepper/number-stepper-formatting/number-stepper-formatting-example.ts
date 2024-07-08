import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Number Formatting example
 */
@Component({
    selector: 'number-stepper-formatting-example',
    templateUrl: './number-stepper-formatting-example.html',
    styleUrls: ['./number-stepper-formatting-example.css'],
    standalone: true,
    imports: [NxCopytextComponent, NxNumberStepperComponent],
})
export class NumberStepperFormattingExampleComponent {}
