import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * @title Multiple errors example
 */
@Component({
    selector: 'formfield-multiple-errors-example',
    templateUrl: './formfield-multiple-errors-example.html',
    styleUrls: ['./formfield-multiple-errors-example.css'],
})
export class FormfieldMultipleErrorsExampleComponent {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
}
