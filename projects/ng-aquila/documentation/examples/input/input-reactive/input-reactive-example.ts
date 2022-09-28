import { Component } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'input-reactive-example',
    templateUrl: './input-reactive-example.html',
    styleUrls: ['./input-reactive-example.css'],
})
export class InputReactiveExampleComponent {
    testForm: UntypedFormGroup = new UntypedFormGroup({
        textfield: new UntypedFormControl('', {
            validators: Validators.required,
        }),
    });
}
