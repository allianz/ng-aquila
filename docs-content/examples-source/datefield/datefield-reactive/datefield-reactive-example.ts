import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'datefield-reactive-example',
    templateUrl: './datefield-reactive-example.html',
    styleUrls: ['./datefield-reactive-example.css'],
})
export class DatefieldReactiveExampleComponent {
    testForm: FormGroup = new FormGroup({
        date: new FormControl('', {
            validators: Validators.required,
        }),
    });
}
