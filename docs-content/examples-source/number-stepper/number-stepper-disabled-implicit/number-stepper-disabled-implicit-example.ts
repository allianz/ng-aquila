import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

/**
 * @title Disabled as part of disabled form example
 */
@Component({
    selector: 'number-stepper-disabled-implicit-example',
    templateUrl: './number-stepper-disabled-implicit-example.html',
    styleUrls: ['./number-stepper-disabled-implicit-example.css'],
})
export class NumberStepperDisabledImplicitExampleComponent {
    fb = new UntypedFormGroup({
        amount: new UntypedFormControl({ value: '', disabled: true }),
    });
}
