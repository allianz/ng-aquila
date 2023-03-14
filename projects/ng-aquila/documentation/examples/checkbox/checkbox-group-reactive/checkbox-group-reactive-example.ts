import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * @title Checkbox group reactive example
 */
@Component({
    selector: 'checkbox-group-reactive-example',
    templateUrl: './checkbox-group-reactive-example.html',
    styleUrls: ['./checkbox-group-reactive-example.css'],
})
export class CheckboxGroupReactiveExampleComponent {
    readonly myFormGroup = this.fb.group({
        terms: [],
    });

    constructor(private readonly fb: FormBuilder) {}
}
