import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Reactive example
 */
@Component({
    selector: 'input-reactive-example',
    templateUrl: './input-reactive-example.html',
    styleUrls: ['./input-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        JsonPipe,
        NxErrorComponent,
    ],
})
export class InputReactiveExampleComponent {
    testForm: FormGroup = new FormGroup({
        textfield: new FormControl('', {
            validators: Validators.required,
        }),
    });
}
