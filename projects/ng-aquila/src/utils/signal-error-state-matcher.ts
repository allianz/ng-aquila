import { Injectable } from '@angular/core';

/** State of a form control that is relevant for showing an error. */
export interface SignalFieldErrorState {
  invalid: boolean;
  touched: boolean;
}

/**
 * Provider that defines when a `FormValueControl` has an error.
 *
 * Fills the role of the `ErrorStateMatcher` for signal based controls, which receive their state
 * through signal inputs instead of an `AbstractControl` — no matter whether signal forms, reactive
 * forms or template driven forms drive them. Not an exact equivalent: there is no counterpart of the
 * sticky `form.submitted`, because signal forms marks every field as touched on submit instead.
 */
@Injectable({
  providedIn: 'root',
})
export class SignalErrorStateMatcher {
  isErrorState(state: SignalFieldErrorState): boolean {
    return state.invalid && state.touched;
  }
}
