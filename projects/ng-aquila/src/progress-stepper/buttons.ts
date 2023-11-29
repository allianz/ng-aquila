import { CdkStepper, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Directive, DoCheck } from '@angular/core';

import { NxProgressStepperDirective } from './progress-stepper.component';

@Directive({
    selector: 'button[nxStepperNext]',
    host: {
        '[type]': 'type',
        '[disabled]': 'disabled',
    },
    inputs: ['type'],
    providers: [{ provide: CdkStepper, useExisting: NxProgressStepperDirective }],
})
export class NxStepperNextDirective extends CdkStepperNext implements DoCheck {
    /** @docs-private */
    disabled = false;

    constructor(
        _stepper: CdkStepper,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        super(_stepper);
    }

    /**
     * Implemented to prevent changed after checked error after stepper init.
     * When the stepper initializes the directive is checked first before
     * the stepper can check its content thus it doesn't know about it's children yet
     * so _stepper.hasNext returns false and disables the buttons. In the same CD cycle
     * after the stepper has checked its contents the button needs to be enabled resulting
     * in the error.
     */
    ngDoCheck(): void {
        const stepper = this._stepper as any as NxProgressStepperDirective;
        if (this.disabled !== !stepper.hasNext) {
            this.disabled = !stepper.hasNext;
            this._cdr.markForCheck();
        }
    }
}

@Directive({
    selector: 'button[nxStepperPrevious]',
    host: {
        '[type]': 'type',
        '[disabled]': '!stepper.hasPrevious',
    },
    inputs: ['type'],
    providers: [{ provide: CdkStepper, useExisting: NxProgressStepperDirective }],
})
export class NxStepperPreviousDirective extends CdkStepperPrevious {
    constructor(_stepper: CdkStepper) {
        super(_stepper);
    }

    get stepper(): NxProgressStepperDirective {
        return this._stepper as NxProgressStepperDirective;
    }
}
