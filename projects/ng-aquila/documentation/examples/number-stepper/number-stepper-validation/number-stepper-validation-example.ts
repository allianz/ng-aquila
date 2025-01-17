import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxMessageComponent } from '@aposin/ng-aquila/message';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

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
