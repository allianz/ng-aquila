import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

/** Please note: small is only for meant for the One Allianz Design */
export type NxPlainButtonSize = 'medium' | 'small';
/** Please note: secondary is only for meant for the One Allianz Design */
export type NxPlainButtonVariant = 'primary' | 'secondary';

@Component({
    selector: 'button[nxPlainButton]',
    templateUrl: './plain-button.component.html',
    styleUrls: ['plain-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['classNames:nxPlainButton'],
    host: {
        class: 'nx-plain-button',
        '[class.nx-plain-button--danger]': 'critical',
        '[class.nx-plain-button--secondary]': 'variant === "secondary"',
        '[class.nx-plain-button--small]': 'size === "small"',
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

    /** The plain button size. Please only use it for the One Allianz Design. */
    @Input() size: NxPlainButtonSize = 'medium';

    /** The plain button variant. Please only use it for the One Allianz Design. */
    @Input() variant: NxPlainButtonVariant = 'primary';

    /** Whether to show the critical/danger appearance */
    @Input() set critical(value: BooleanInput) {
        this._critical = coerceBooleanProperty(value);
    }
    get critical() {
        return this._critical || this.danger;
    }
    private _critical = false;

    /** Whether the button should be disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    private _classNames = '';

    danger = false;

    /** @deprecated Use the `critical` input for the danger/critical appearance */
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

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
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
