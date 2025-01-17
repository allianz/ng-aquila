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
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMaskDirective } from '@aposin/ng-aquila/mask';

/**
 * @title Validation example
 */
@Component({
    selector: 'mask-validation-example',
    templateUrl: './mask-validation-example.html',
    styleUrls: ['./mask-validation-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        NxMaskDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        JsonPipe,
    ],
})
export class MaskValidationExampleComponent {
    validatedMaskForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {
            validators: [Validators.required],
        }),
    });

    unvalidatedMaskForm: FormGroup = new FormGroup({
        maskInput2: new FormControl('', {}),
    });
}
