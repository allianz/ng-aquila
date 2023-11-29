import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkStepHeader, CdkStepLabel } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core';

import { NxMultiStepperDirection } from '../progress-stepper.models';

/** @docs-private */
@Component({
    selector: 'nx-multi-step-item',
    templateUrl: './multi-step-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./multi-step-item.component.scss'],
    host: {
        '[class.nx-multi-step-item--vertical]': 'direction === "vertical"',
        '[class.is-selected]': 'selected',
        '[class.is-completed]': 'completed',
        '[class.is-active]': 'active',
        '[class.is-disabled]': 'disabled',
        '[class.is-last]': 'last',
        '[attr.aria-disabled]': 'disabled ? "true" : null',
        role: 'tab',
        '[attr.aria-controls]': 'ariaControls',
        '[attr.aria-selected]': 'selected',
        '[attr.aria-label]': 'label',
    },
})
export class NxMultiStepItemComponent extends CdkStepHeader implements OnDestroy {
    /** The direction of the step */
    @Input() set direction(value: NxMultiStepperDirection) {
        this._direction = value;
        this._cdr.markForCheck();
    }
    get direction(): NxMultiStepperDirection {
        return this._direction;
    }
    private _direction: NxMultiStepperDirection = 'horizontal';

    /** The label of the step. */
    @Input() label!: CdkStepLabel | string;

    /** Sets the selected step. */
    @Input() set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get selected(): boolean {
        return this._selected;
    }
    private _selected!: boolean;

    /** Sets the active step. */
    @Input() set active(value: BooleanInput) {
        this._active = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get active(): boolean {
        return this._active;
    }
    private _active!: boolean;

    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled!: boolean;

    /** Sets the last step. */
    @Input() set last(value: BooleanInput) {
        this._last = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get last(): boolean {
        return this._last;
    }
    private _last!: boolean;

    /** Sets the step completed. */
    @Input() set completed(value: BooleanInput) {
        this._completed = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get completed(): boolean {
        return this._completed;
    }
    private _completed!: boolean;

    /** Sets the step was completed. */
    @Input() set wasCompleted(value: BooleanInput) {
        this._wasCompleted = coerceBooleanProperty(value);
    }
    get wasCompleted(): boolean {
        return this._wasCompleted;
    }
    private _wasCompleted!: boolean;

    @Input() set ariaControls(value: string) {
        this._ariaControls = value;
    }
    get ariaControls() {
        return this._ariaControls;
    }
    private _ariaControls!: string;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        super(_elementRef);
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
