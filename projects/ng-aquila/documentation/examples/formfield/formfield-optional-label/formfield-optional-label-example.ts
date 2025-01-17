import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Optional label example
 */
@Component({
    selector: 'formfield-optional-label-example',
    templateUrl: './formfield-optional-label-example.html',
    styleUrls: ['./formfield-optional-label-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxInputDirective,
    ],
})
export class FormfieldOptionalLabelExampleComponent {
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormBuilder().group({
            firstName: ['', Validators.required],
            lastName: [''],
            items: [''],
            email: ['', Validators.required],
        });
    }
}
