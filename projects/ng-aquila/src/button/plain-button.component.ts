import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

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

    private _disabled = false;

    @Input()
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    private _classNames = '';

    danger = false;

    public set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }

        this._classNames = value;
        this.danger = /danger/.test(this._classNames);
        this._cdr.markForCheck();
    }

    public get classNames(): string {
        return this._classNames;
    }

    @HostBinding('class.nx-button--active')
    active = false;
    public setTriggerActive(): void {
        if (!this.active) {
            this.active = true;
            this._cdr.markForCheck();
        }
    }
    public setTriggerInactive(): void {
        if (this.active) {
            this.active = false;
            this._cdr.markForCheck();
        }
    }

    constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
