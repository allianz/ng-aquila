import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Injectable()
export class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
  /** Custom error state matcher that checks for validity of the formfield. */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}

/**
 * @title Custom error state matching Formfield Example
 */
@Component({
  templateUrl: 'error-custom-matcher-formfield-example.html',
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class CustomErrorStateMatcher {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
