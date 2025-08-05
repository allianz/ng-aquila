import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';

/**
 * Provider that defines when form controls have an error.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | NgControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    return !!(control?.invalid && (control.touched || form?.submitted));
  }
}
