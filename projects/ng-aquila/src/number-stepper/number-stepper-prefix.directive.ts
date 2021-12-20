import { Directive } from '@angular/core';

/** Directive used to pass a suffix to the number stepper. */
@Directive({
    selector: 'nx-number-stepper-prefix',
    host: {
        class: 'nx-stepper__prefix',
    },
})
export class NxNumberStepperPrefixDirective {}
