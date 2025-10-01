import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  input,
  NgZone,
  numberAttribute,
  Renderer2,
} from '@angular/core';

/** Type of a button. */
export type NxButtonType = 'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis' | 'attention';

/** Size of a button. */
export type NxButtonSize = 'small' | 'small-medium' | 'medium' | 'large';

const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'primary';

/** @docs-private */
@Directive({
  standalone: true,
  host: {
    '[class.nx-button--loading]': 'loading()',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': '_ariaDisabled',
    '[attr.tabindex]': '_tabIndex',
  },
})
export class NxButtonBase implements NxTriggerButton, AfterViewInit {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);

  protected _isAnchor = this._elementRef.nativeElement.tagName === 'A';
  protected get _ariaDisabled() {
    return (this._isAnchor && this.disabled) || this.loading() ? true : null;
  }
  protected get _tabIndex() {
    if (this._isAnchor && this.disabled) {
      return -1;
    }
    return this.tabIndex ?? this._tabindexAttributeBinding ?? undefined;
  }

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
  @HostBinding('class.nx-button--attention') get isAttention(): boolean {
    return this.type === 'attention';
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

  @Input({ transform: tabIndexAttribute }) tabIndex: number | undefined;

  /**
   * Use 'tabindex' to handle existing usages of `[tabindex]` bindings on button elements
   * @docs-private
   */
  @Input({ alias: 'tabindex', transform: tabIndexAttribute }) _tabindexAttributeBinding:
    | number
    | undefined;

  /** Whether the button should be in a loading state. */
  loading = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  get spinnerNegative() {
    if (this.type === 'emphasis' || this.type === 'cta' || this.type === 'attention') {
      return true;
    }
    const isFilled = this.type === 'primary';
    return this.negative ? !isFilled : isFilled;
  }

  set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }
    this._classNames = value;

    // TODO kick null safeguards after setter value is properly coerced
    const [type = null] = this._classNames?.match(
      /primary|secondary|tertiary|cta|emphasis|attention/,
    ) ?? [DEFAULT_TYPE];
    this.type = type as NxButtonType;

    const [size = null] = this._classNames?.match(/small-medium|small|medium|large/) ?? [
      DEFAULT_SIZE,
    ];
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

  constructor(...args: unknown[]) {
    this.setupHaltDisabledEvents();
  }

  ngAfterViewInit(): void {
    this.setupFocusMonitor();
  }

  setTriggerActive() {
    this.active = true;
    this._cdr.markForCheck();
  }

  setTriggerInactive() {
    this.active = false;
    this._cdr.markForCheck();
  }

  private setupFocusMonitor() {
    this._focusMonitor.monitor(this._elementRef, true);
    this._destroyRef.onDestroy(() => this._focusMonitor.stopMonitoring(this._elementRef));
  }

  private setupHaltDisabledEvents() {
    const cleanUp = this._ngZone.runOutsideAngular(() =>
      this._renderer.listen(this._elementRef.nativeElement, 'click', (event: Event) => {
        if ((this._isAnchor && this.disabled) || this.loading()) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }),
    );
    this._destroyRef.onDestroy(cleanUp);
  }
}

function tabIndexAttribute(value: unknown): number | undefined {
  return value == null ? undefined : numberAttribute(value);
}

export { NxButtonBase as NxAnchorButtonBase };
