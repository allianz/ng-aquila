import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * @title Checkbox group reactive example
 */
@Component({
    selector: 'checkbox-group-reactive-example',
    templateUrl: './checkbox-group-reactive-example.html',
    styleUrls: ['./checkbox-group-reactive-example.css'],
})
export class CheckboxGroupReactiveExampleComponent {
    public myFormGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.myFormGroup = this.fb.group({
            terms: [],
        });
    }
}
