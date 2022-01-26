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
        '[attr.aria-selected]': 'selected',
    },
})
export class NxMultiStepItemComponent extends CdkStepHeader implements OnDestroy {
    /** The direction of the step */
    @Input()
    get direction(): NxMultiStepperDirection {
        return this._direction;
    }
    set direction(value: NxMultiStepperDirection) {
        this._direction = value;
        this._cdr.markForCheck();
    }
    private _direction: NxMultiStepperDirection = 'horizontal';

    /** The label of the step. */
    @Input() label!: CdkStepLabel | string;

    /** Sets the selected step. */
    @Input()
    get selected(): boolean {
        return this._selected;
    }
    set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    private _selected!: boolean;

    /** Sets the active step. */
    @Input()
    get active(): boolean {
        return this._active;
    }
    set active(value: BooleanInput) {
        this._active = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    private _active!: boolean;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    private _disabled!: boolean;

    /** Sets the last step. */
    @Input()
    get last(): boolean {
        return this._last;
    }
    set last(value: BooleanInput) {
        this._last = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    private _last!: boolean;

    /** Sets the step completed. */
    @Input()
    get completed(): boolean {
        return this._completed;
    }
    set completed(value: BooleanInput) {
        this._completed = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    private _completed!: boolean;

    constructor(private _cdr: ChangeDetectorRef, public _elementRef: ElementRef<HTMLElement>, private _focusMonitor: FocusMonitor) {
        super(_elementRef);
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
