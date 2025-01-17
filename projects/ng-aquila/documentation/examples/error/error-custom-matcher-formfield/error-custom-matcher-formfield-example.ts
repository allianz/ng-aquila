import { Component, Injectable } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';

@Injectable()
export class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
    /** Custom error state matcher that checks for validity of the formfield. */
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        return !!(control?.invalid && (control.dirty || form?.submitted));
    }
}

/**
 * @title Custom error state matching Formfield Example
 */
@Component({
    selector: 'error-custom-matcher-formfield-example',
    templateUrl: './error-custom-matcher-formfield-example.html',
    styleUrls: ['./error-custom-matcher-formfield-example.css'],
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class ErrorCustomMatcherFormfieldExampleComponent {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
}
