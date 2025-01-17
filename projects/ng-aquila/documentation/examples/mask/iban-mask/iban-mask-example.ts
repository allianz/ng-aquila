import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxIbanMaskDirective, NxMaskDirective } from '@aposin/ng-aquila/mask';

/**
 * @title IBAN mask example
 */
@Component({
    selector: 'iban-mask-example',
    templateUrl: './iban-mask-example.html',
    styleUrls: ['./iban-mask-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        NxMaskDirective,
        NxIbanMaskDirective,
        NxButtonComponent,
        JsonPipe,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class IbanMaskExampleComponent {
    validatedMaskForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {}),
    });
}
