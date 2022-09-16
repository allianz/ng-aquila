import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';

@Component({
    selector: 'button[nxPlainButton]',
    templateUrl: './plain-button.component.html',
    styleUrls: ['plain-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['classNames:nxPlainButton'],
    host: {
        '[class.nx-plain-button]': 'true',
        '[class.nx-plain-button--danger]': 'danger',
    },
    providers: [{ provide: NxTriggerButton, useExisting: NxPlainButtonComponent }],
})
export class NxPlainButtonComponent implements NxTriggerButton, OnDestroy {
    /** @docs-private */
    @HostBinding('attr.disabled') get isDisabled(): boolean | null {
        return this.disabled || null;
    }
    /** @docs-private */
    @HostBinding('attr.aria-disabled') get isAriaDisabled(): string {
        return this.disabled.toString();
    }

    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    private _classNames = '';

    danger = false;

    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        this.danger = !!this._classNames?.includes('danger');
        this._cdr.markForCheck();
    }

    get classNames(): string {
        return this._classNames;
    }

    constructor(private readonly _cdr: ChangeDetectorRef, private readonly _elementRef: ElementRef, private readonly _focusMonitor: FocusMonitor) {
        this._focusMonitor.monitor(this._elementRef);
    }

    @HostBinding('class.nx-button--active') active = false;

    setTriggerActive(): void {
        if (!this.active) {
            this.active = true;
            this._cdr.markForCheck();
        }
    }
    setTriggerInactive(): void {
        if (this.active) {
            this.active = false;
            this._cdr.markForCheck();
        }
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
