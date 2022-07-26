import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { NxStepComponent } from '../progress-stepper.component';

@Component({
    templateUrl: './multi-step-group.component.html',
    selector: 'nx-step-group',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxMultiStepperGroupComponent {
    /** @docs-private */
    @ContentChildren(NxStepComponent, { descendants: true }) steps!: QueryList<NxStepComponent>;

    /** Sets the label of a group that is shown to the user. */
    @Input() set label(value: string) {
        this._label = value;
        this._cdr.markForCheck();
    }
    get label(): string {
        return this._label;
    }
    private _label!: string;

    constructor(private readonly _cdr: ChangeDetectorRef) {}
}
