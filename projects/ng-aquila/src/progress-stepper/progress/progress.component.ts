import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Optional } from '@angular/core';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';
import { clamp } from '@aposin/ng-aquila/utils';

import { NxProgressStepperDirective } from '../progress-stepper.component';

@Component({
    selector: 'nx-progress-stepper',
    templateUrl: 'progress.component.html',
    styleUrls: ['../progress-stepper.component.scss', './progress.component.scss'],
    providers: [{ provide: NxProgressStepperDirective, useExisting: NxProgressStepperComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NxProgressbarModule, NgTemplateOutlet],
})
export class NxProgressStepperComponent extends NxProgressStepperDirective {
    /** Overrides the `aria-label` of the nx-progressbar. Defaults to "Progress" */
    @Input() progressbarAriaLabel: string | undefined = 'Progress';

    /** Sets the `aria-labelledby` of the nx-progressbar */
    @Input() progressbarAriaLabeledBy: string | undefined;

    /** Sets the current value/progress of the progress bar. */
    @Input() set progress(value: number) {
        this._progress = clamp(value || 0);
    }
    get progress(): number {
        return this._progress;
    }
    private _progress = 0;

    constructor(_cdr: ChangeDetectorRef, @Optional() _dir: Directionality | null, _el: ElementRef<HTMLElement>) {
        super(_cdr, _dir, _el);
    }
}
