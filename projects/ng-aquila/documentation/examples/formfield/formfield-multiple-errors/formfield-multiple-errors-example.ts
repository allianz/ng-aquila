import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Multiple errors example
 */
@Component({
    selector: 'formfield-multiple-errors-example',
    templateUrl: './formfield-multiple-errors-example.html',
    styleUrls: ['./formfield-multiple-errors-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        ReactiveFormsModule,
        NgIf,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class FormfieldMultipleErrorsExampleComponent {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
}
