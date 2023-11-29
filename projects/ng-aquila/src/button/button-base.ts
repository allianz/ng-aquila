import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

/** Type of a button. */
export type NxButtonType = 'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis';

/** Size of a button. */
export type NxButtonSize = 'small' | 'small-medium' | 'medium' | 'large';

const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'primary';

/** @docs-private */
@Directive()
export class NxButtonBase implements NxTriggerButton, OnDestroy {
    private _classNames = '';

    /** @docs-private */
    @HostBinding('class.nx-button--primary') get isPrimary(): boolean {
        return this.type === 'primary';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--secondary') get isSecondary(): boolean {
        return this.type === 'secondary';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--tertiary') get isTertiary(): boolean {
        return this.type === 'tertiary';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--cta') get isCta(): boolean {
        return this.type === 'cta';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--emphasis') get isEmphasis(): boolean {
        return this.type === 'emphasis';
    }

    /** @docs-private */
    @HostBinding('class.nx-button--large') get isLarge(): boolean {
        return this.size === 'large';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--medium') get isMedium(): boolean {
        return this.size === 'medium';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--small-medium') get isSmallMedium(): boolean {
        return this.size === 'small-medium';
    }
    /** @docs-private */
    @HostBinding('class.nx-button--small') get isSmall(): boolean {
        return this.size === 'small';
    }

    /** @docs-private */
    @HostBinding('class.nx-button--danger') get isDanger(): boolean {
        return this.danger;
    }
    /** @docs-private */
    @HostBinding('class.nx-button--block') get isBlock(): boolean {
        return this.block;
    }
    /** @docs-private */
    @HostBinding('class.nx-button--negative') get isNegative(): boolean {
        return this.negative;
    }
    /** @docs-private */
    @HostBinding('attr.disabled') get isDisabled(): boolean | null {
        return this.disabled || null;
    }
    /** @docs-private */
    @HostBinding('attr.aria-disabled') get isAriaDisabled(): string {
        return this.disabled.toString();
    }

    /** @docs-private */
    type: NxButtonType = DEFAULT_TYPE;

    /** @docs-private */
    size: NxButtonSize = DEFAULT_SIZE;

    danger = false;
    negative = false;
    block = false;
    @HostBinding('class.nx-button--active')
    active = false;

    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safeguards after setter value is properly coerced
        const [type = null] = this._classNames?.match(/primary|secondary|tertiary|cta|emphasis/) ?? [DEFAULT_TYPE];
        this.type = type as NxButtonType;

        const [size = null] = this._classNames?.match(/small-medium|small|medium|large/) ?? [DEFAULT_SIZE];
        this.size = size as NxButtonSize;

        this.danger = !!this._classNames?.includes('danger');
        this.negative = !!this._classNames?.includes('negative');
        this.block = !!this._classNames?.includes('block');

        this._cdr.markForCheck();
    }

    get classNames(): string {
        return this._classNames;
    }

    /**
     * Getter used for the modal component as a quickfix
     * since button got changed from directive to component the reference used by the ngOpenModelOnClick directive
     * for nxButtons is a reference to component instance instead of an element reference. As a workaround we need a
     * way to reach the elementRef of the component until the modal gets refactored.
     * @docs-private
     */
    get elementRef() {
        return this._elementRef;
    }

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    setTriggerActive() {
        this.active = true;
        this._cdr.markForCheck();
    }

    setTriggerInactive() {
        this.active = false;
        this._cdr.markForCheck();
    }
}

/** @docs-private **/
@Directive()
export class NxAnchorButtonBase extends NxButtonBase {
    constructor(
        private _ngZone: NgZone,
        _cdr: ChangeDetectorRef,
        elementRef: ElementRef,
        focusMonitor: FocusMonitor,
    ) {
        super(_cdr, elementRef, focusMonitor);
        this._ngZone.runOutsideAngular(() => {
            (this.elementRef.nativeElement as HTMLAnchorElement).addEventListener('click', this._checkEventsDisabled);
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        (this.elementRef.nativeElement as HTMLAnchorElement).removeEventListener('click', this._checkEventsDisabled);
    }

    /** @docs-private */
    private _checkEventsDisabled = (event: Event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
}
