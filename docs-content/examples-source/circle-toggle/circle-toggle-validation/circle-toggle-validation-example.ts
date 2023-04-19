import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    ValidatorFn,
    Validators,
} from '@angular/forms';

const selectBothValidator: ValidatorFn = (ctrl: AbstractControl) => {
    const heart = ctrl.get('heart')?.value;
    const car = ctrl.get('car')?.value;
    const isSelectBoth = heart && car;
    return isSelectBoth ? null : { selectBoth: heart && car };
};

/**
 * @title Validation example
 */
@Component({
    selector: 'circle-toggle-validation-example',
    templateUrl: './circle-toggle-validation-example.html',
    styleUrls: ['./circle-toggle-validation-example.css'],
})
export class CircleToggleValidationExampleComponent {
    formBuilder = new FormBuilder();

    testForm = this.formBuilder.group({
        reactiveToggle: ['', Validators.required],
    });

    testForm2 = this.formBuilder.group({
        heart: [false, Validators.requiredTrue],
    });

    testForm3 = this.formBuilder.group(
        {
            heart: [false, Validators.requiredTrue],
            car: [false, Validators.requiredTrue],
        },
        { validators: [selectBothValidator] },
    );

    single = false;

    sampleValues = [
        {
            value: 'A',
            icon: 'product-heart',
            hint: 'Hint A',
            label: 'Label A',
            selected: false,
        },
        {
            value: 'B',
            icon: 'product-car',
            hint: 'Hint B',
            label: 'Label B',
            selected: true,
        },
        {
            value: 'C',
            icon: 'product-plane',
            hint: 'Hint C',
            label: 'Label C',
            selected: false,
        },
    ];

    patch(value: string): void {
        this.testForm.patchValue({ reactiveToggle: value });
    }
}
