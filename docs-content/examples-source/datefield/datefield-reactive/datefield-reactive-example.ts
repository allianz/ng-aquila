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
    selector: 'datefield-reactive-example',
    templateUrl: './datefield-reactive-example.html',
    styleUrls: ['./datefield-reactive-example.css'],
})
export class DatefieldReactiveExampleComponent {
    testForm: UntypedFormGroup = new UntypedFormGroup({
        date: new UntypedFormControl('', {
            validators: Validators.required,
        }),
    });
}
