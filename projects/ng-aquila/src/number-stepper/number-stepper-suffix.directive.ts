import { Directive } from '@angular/core';

/** Directive used to pass a suffix to the number stepper. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-number-stepper-suffix',
  host: {
    'class': 'nx-stepper__suffix'
  }
})
export class NxNumberStepperSuffixDirective {
}
