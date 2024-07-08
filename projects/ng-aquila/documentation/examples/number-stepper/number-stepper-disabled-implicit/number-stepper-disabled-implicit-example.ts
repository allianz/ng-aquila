import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    NxNumberStepperComponent,
    NxNumberStepperPrefixDirective,
    NxNumberStepperSuffixDirective,
} from '@aposin/ng-aquila/number-stepper';

/**
 * @title Disabled as part of disabled form example
 */
@Component({
    selector: 'number-stepper-disabled-implicit-example',
    templateUrl: './number-stepper-disabled-implicit-example.html',
    styleUrls: ['./number-stepper-disabled-implicit-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxNumberStepperComponent,
        NxNumberStepperSuffixDirective,
        NxNumberStepperPrefixDirective,
    ],
})
export class NumberStepperDisabledImplicitExampleComponent {
    fb = new FormGroup({
        amount: new FormControl({ value: '', disabled: true }),
    });
}
