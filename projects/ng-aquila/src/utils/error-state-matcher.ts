import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * Provider that defines when form controls have an error.
 */
@Injectable({
    providedIn: 'root',
})
export class ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control?.invalid && (control.touched || form?.submitted));
    }
}
