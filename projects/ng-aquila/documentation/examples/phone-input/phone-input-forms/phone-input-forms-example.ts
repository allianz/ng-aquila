import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxPhoneInputComponent } from '@aposin/ng-aquila/phone-input';

/**
 * @title Phone input usage in forms
 */
@Component({
    selector: 'phone-input-forms-example',
    templateUrl: 'phone-input-forms-example.html',
    styleUrls: ['./phone-input-forms-example.css'],
    imports: [
        NxHeadlineComponent,
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class PhoneInputFormsExampleComponent {
    value = '';
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            phone: new FormControl('', Validators.required),
        });
    }
}
