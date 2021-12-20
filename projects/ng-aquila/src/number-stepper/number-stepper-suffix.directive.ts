import { Directive } from '@angular/core';

/** Directive used to pass a suffix to the number stepper. */
@Directive({
    selector: 'nx-number-stepper-suffix',
    host: {
        class: 'nx-stepper__suffix',
    },
})
export class NxNumberStepperSuffixDirective {}
