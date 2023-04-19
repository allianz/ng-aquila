import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Checkbox group dynamic checkboxes example
 */
@Component({
    selector: 'checkbox-group-dynamic-example',
    templateUrl: './checkbox-group-dynamic-example.html',
    styleUrls: ['./checkbox-group-dynamic-example.css'],
})
export class CheckboxGroupDynamicExampleComponent {
    readonly myFormGroup = this.fb.group({
        terms: [[], Validators.required],
    });

    readonly data = ['one', 'two', 'three'];

    i = 1;

    constructor(private readonly fb: FormBuilder) {}

    addNewCb() {
        this.data.push('Checkbox ' + this.i);
        this.i++;
    }

    removeCB() {
        this.data.shift();
    }
}
