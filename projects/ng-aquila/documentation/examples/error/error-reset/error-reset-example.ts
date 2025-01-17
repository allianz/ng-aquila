import { Component } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Error Reset Example
 */
@Component({
    selector: 'error-reset-example',
    templateUrl: './error-reset-example.html',
    styleUrls: ['./error-reset-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxButtonComponent,
    ],
})
export class ErrorResetExampleComponent {
    constructor(private readonly fb: UntypedFormBuilder) {}

    form = this.fb.group({
        label: ['', Validators.required],
    });
}
