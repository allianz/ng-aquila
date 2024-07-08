import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
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
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldNoteDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Reactive example
 */
@Component({
    selector: 'dropdown-reactive-example',
    templateUrl: './dropdown-reactive-example.html',
    styleUrls: ['./dropdown-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxFormfieldNoteDirective,
        NxButtonComponent,
        JsonPipe,
    ],
})
export class DropdownReactiveExampleComponent {
    form = new FormBuilder().group({
        dropdown: ['BMW', Validators.required],
    });

    patch(value: string) {
        this.form.patchValue({ dropdown: value });
    }
}
