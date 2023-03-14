import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'input-reactive-example',
    templateUrl: './input-reactive-example.html',
    styleUrls: ['./input-reactive-example.css'],
})
export class InputReactiveExampleComponent {
    testForm: FormGroup = new FormGroup({
        textfield: new FormControl('', {
            validators: Validators.required,
        }),
    });
}
