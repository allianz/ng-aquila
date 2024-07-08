import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/**
 * @title Checkbox group dynamic checkboxes example
 */
@Component({
    selector: 'checkbox-group-dynamic-example',
    templateUrl: './checkbox-group-dynamic-example.html',
    styleUrls: ['./checkbox-group-dynamic-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NxCheckboxGroupComponent,
        NxLabelComponent,
        NxErrorComponent,
        NgFor,
        NxCheckboxComponent,
        NxButtonComponent,
        JsonPipe,
    ],
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
