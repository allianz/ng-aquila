import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  Renderer2,
  signal,
} from '@angular/core';

/** Type of a button. */
export type NxButtonType = 'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis' | 'attention';

/** Size of a button. */
export type NxButtonSize = 'small' | 'small-medium' | 'medium' | 'large';

const DEFAULT_SIZE: NxButtonSize = 'medium';
const DEFAULT_TYPE: NxButtonType = 'primary';

/** @docs-private */
@Directive({
  host: {
    '[class.nx-button--primary]': 'appearance === "primary"',
    '[class.nx-button--secondary]': 'appearance === "secondary"',
    '[class.nx-button--tertiary]': 'appearance === "tertiary"',
    '[class.nx-button--cta]': 'appearance === "cta"',
    '[class.nx-button--emphasis]': 'appearance === "emphasis"',
    '[class.nx-button--attention]': 'appearance === "attention"',

    '[class.nx-button--small]': 'size === "small"',
    '[class.nx-button--small-medium]': 'size === "small-medium"',
    '[class.nx-button--medium]': 'size === "medium"',
    '[class.nx-button--large]': 'size === "large"',

    '[class.nx-button--danger]': 'danger',
    '[class.nx-button--negative]': 'negative',
    '[class.nx-button--block]': 'block',

    '[class.nx-button--loading]': 'loading()',
    '[class.nx-button--active]': '_active()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': '_ariaDisabled',
    '[attr.tabindex]': '_tabIndex',
  },
})
export class NxButtonBase implements AfterViewInit {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);

  private readonly _isAnchor = this._elementRef.nativeElement.tagName === 'A';
  protected get _ariaDisabled() {
    return (this._isAnchor && this.disabled()) || this.loading() ? true : null;
  }
  protected get _tabIndex() {
    if (this._isAnchor && this.disabled()) {
      return -1;
    }
    return this.tabIndex() ?? this._tabindexAttribute() ?? undefined;
  }

  protected get appearance() {
    return this.properties().appearance;
  }

  get type() {
    return this.properties().appearance;
  }

  sizeInput = input<NxButtonSize | undefined>(undefined, { alias: 'size' });
  get size() {
    return this.sizeInput() ?? this.properties().size;
  }

  /**
   * Whether the button performs a critical action.
   *
   * Formerly called 'danger'
   */
  criticalInput = input<boolean | undefined, BooleanInput>(undefined, {
    transform: booleanAttribute,
    alias: 'critical',
  });
  protected get critical() {
    return this.criticalInput();
  }

  get danger() {
    return this.critical ?? this.properties().danger;
  }

  negativeInput = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
    alias: 'negative',
  });
  get negative() {
    return this.negativeInput() ?? this.properties().negative;
  }

  blockInput = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
    alias: 'block',
  });
  get block() {
    return this.blockInput() ?? this.properties().block;
  }

  readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  readonly tabIndex = input<number | undefined, NumberInput>(undefined, {
    transform: tabIndexAttribute,
  });
  /**
   * Use 'tabindex' to handle existing usages of `[tabindex]` bindings on button elements
   * @docs-private
   */
  readonly _tabindexAttribute = input<number | undefined, NumberInput>(undefined, {
    transform: tabIndexAttribute,
    alias: 'tabindex',
  });

  /** Whether the button should be in a loading state. */
  readonly loading = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected get spinnerNegative() {
    const { appearance, negative } = this.properties();
    if (appearance === 'emphasis' || appearance === 'cta' || appearance === 'attention') {
      return true;
    }
    const isFilled = appearance === 'primary';
    return negative ? !isFilled : isFilled;
  }

  set classNames(v: NxButtonType | '' | ({} & string) | undefined) {
    this._classNames.set(v);
  }
  get classNames() {
    return this._classNames();
  }

  _classNames = signal<NxButtonType | '' | ({} & string) | undefined>('');

  protected readonly properties = computed<{
    appearance: NxButtonType;
    size: NxButtonSize;
    danger: boolean;
    negative: boolean;
    block: boolean;
  }>(() => {
    const classNames = this.classNames || '';

    const type =
      classNames.match(/primary|secondary|tertiary|cta|emphasis|attention/)?.[0] ?? DEFAULT_TYPE;

    const size = (classNames.match(/small-medium|small|medium|large/)?.[0] ??
      DEFAULT_SIZE) as NxButtonSize;

    return {
      appearance: type as NxButtonType,
      size: size as NxButtonSize,
      danger: classNames.includes('danger'),
      negative: classNames.includes('negative'),
      block: classNames.includes('block'),
    };
  });

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
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(...args: unknown[]);
  constructor() {
    this.setupHaltDisabledEvents();
  }

  ngAfterViewInit(): void {
    this.setupFocusMonitor();
  }

  set active(v: boolean) {
    this._active.set(v);
  }
  get active() {
    return this._active();
  }
  protected _active = signal(false);
  setTriggerActive() {
    this._active.set(true);
  }

  setTriggerInactive() {
    this._active.set(false);
  }

  private setupFocusMonitor() {
    this._focusMonitor.monitor(this._elementRef, true);
    this._destroyRef.onDestroy(() => this._focusMonitor.stopMonitoring(this._elementRef));
  }

  private setupHaltDisabledEvents() {
    const cleanUp = this._ngZone.runOutsideAngular(() =>
      this._renderer.listen(this._elementRef.nativeElement, 'click', (event: Event) => {
        if ((this._isAnchor && this.disabled()) || this.loading()) {
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
