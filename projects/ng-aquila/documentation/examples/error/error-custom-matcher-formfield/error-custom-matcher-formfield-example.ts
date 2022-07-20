import { Component, Injectable } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
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
})
export class ErrorCustomMatcherFormfieldExampleComponent {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
}
