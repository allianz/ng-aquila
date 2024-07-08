import { JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/**
 * @title Checkbox group inheritance example
 */
@Component({
    selector: 'checkbox-group-inheritance-example',
    templateUrl: './checkbox-group-inheritance-example.html',
    styleUrls: ['./checkbox-group-inheritance-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCheckboxComponent,
        NgClass,
        NxCheckboxGroupComponent,
        NxLabelComponent,
        NxErrorComponent,
        JsonPipe,
    ],
})
export class CheckboxGroupInheritanceExampleComponent {
    readonly optionsForm = this.fb.group({
        isNegative: [false, null],
        isRequired: [false, null],
        isDisabled: [false, null],
        isLarge: [false, null],
        isLabelExpert: [false, null],
    });

    readonly myFormGroup = this.fb.group({
        terms: [[]],
    });

    constructor(private readonly fb: FormBuilder) {}

    toggleDisabled() {
        const checkboxGroup = this.myFormGroup.get('terms');
        if (checkboxGroup?.disabled) {
            this.myFormGroup.get('terms')?.enable();
        } else {
            this.myFormGroup.get('terms')?.disable();
        }
    }

    toggleRequired() {
        const checkboxGroup = this.myFormGroup.get('terms');
        if (checkboxGroup?.validator === Validators.required) {
            checkboxGroup.clearValidators();
        } else {
            checkboxGroup?.setValidators(Validators.required);
        }
    }
}
