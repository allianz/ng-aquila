import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import {
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Simple form example
 */
@Component({
    selector: 'formfield-simple-form-example',
    templateUrl: './formfield-simple-form-example.html',
    styleUrls: ['./formfield-simple-form-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxIconComponent,
        NxFormfieldAppendixDirective,
        NxPopoverTriggerDirective,
        NxButtonComponent,
        NxPopoverComponent,
    ],
})
export class FormfieldSimpleFormExampleComponent {
    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormBuilder().group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            items: ['', Validators.required],
            email: ['', Validators.required],
        });
    }
}
