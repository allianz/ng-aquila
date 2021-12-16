import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

/**
 * @title Disabled as part of disabled form example
 */
@Component({
    selector: 'number-stepper-disabled-implicit-example',
    templateUrl: './number-stepper-disabled-implicit-example.html',
    styleUrls: ['./number-stepper-disabled-implicit-example.css'],
})
export class NumberStepperDisabledImplicitExampleComponent {
    fb = new FormGroup({
        amount: new FormControl({ value: '', disabled: true }),
    });
}
