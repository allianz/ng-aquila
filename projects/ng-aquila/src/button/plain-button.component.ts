import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  isDevMode,
  NgZone,
  numberAttribute,
  Renderer2,
  signal,
} from '@angular/core';

/**
 * Please note: small is only meant for the A1 Design.
 *
 * `s` and `m` are the A1 shirt sizes and are treated as aliases of
 * `small` and `medium` respectively.
 */
export type NxPlainButtonSize = 'medium' | 'small' | 's' | 'm';
/** Please note: secondary is only for meant for the A1 Design */
export type NxPlainButtonVariant = 'primary' | 'secondary';
/**
 * Color scheme of a plain button. Only relevant for the A1 Design.
 *
 * The plain button has no accent colors.
 *
 * - `default` – the regular action-colored plain button
 * - `on-accent-attention` – for use on an accent-attention surface
 * - `on-brand` – for use on a brand-colored surface
 */
export type NxPlainButtonColorScheme = 'default' | 'on-accent-attention' | 'on-brand';

/** Maps the A1 shirt-size aliases onto the existing size steps. */
function normalizePlainSize(size: NxPlainButtonSize): NxPlainButtonSize {
  if (size === 'm') {
    return 'medium';
  }
  if (size === 's') {
    return 'small';
  }
  return size;
}

@Component({
  selector: 'button[nxPlainButton], a[nxPlainButton]',
  templateUrl: './plain-button.component.html',
  styleUrls: ['plain-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-plain-button',
    '[class.nx-plain-button--danger]': 'critical()',
    '[class.nx-plain-button--secondary]': 'variant() === "secondary"',
    '[class.nx-plain-button--small]': '_size() === "small"',
    '[class.nx-plain-button--on-accent-attention]': 'colorScheme() === "on-accent-attention"',
    '[class.nx-plain-button--on-brand]': 'colorScheme() === "on-brand"',
    '[class.nx-plain-button--inverse]': 'inverse()',
    '[class.nx-button--loading]': 'loading()',
    '[class.nx-button--active]': '_active()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': '_ariaDisabled',
    '[attr.tabindex]': '_tabIndex',
  },
  providers: [{ provide: NxTriggerButton, useExisting: NxPlainButtonComponent }],
  standalone: true,
  imports: [NxSpinnerComponent],
})
export class NxPlainButtonComponent implements NxTriggerButton, AfterViewInit {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);
  private readonly _destroyRef = inject(DestroyRef);

  protected _isAnchor = this._elementRef.nativeElement.tagName === 'A';
  protected get _ariaDisabled() {
    return (this._isAnchor && this.disabled()) || this.loading() ? true : null;
  }
  protected get _tabIndex() {
    if (this._isAnchor && this.disabled()) {
      return -1;
    }
    return this.tabIndex() ?? this._tabindexAttribute() ?? undefined;
  }

  /** The plain button size. Please only use it for the A1 Design. */
  readonly size = input<NxPlainButtonSize>('medium');
  /** The size with the A1 shirt-size aliases resolved to the existing steps. */
  protected readonly _size = computed(() => normalizePlainSize(this.size()));

  /** The plain button variant. Please only use it for the A1 Design. */
  readonly variant = input<NxPlainButtonVariant>('primary');

  /**
   * The plain button color scheme. Please only use it for the A1 Design.
   *
   * When not set, an `accent-attention` surface resolves it to
   * `on-accent-attention` (see `nxSurface`). The `attention` surface goes through
   * `inverse` instead, since `on-brand` pairs with a brand-colored background.
   */
  readonly colorSchemeInput = input<NxPlainButtonColorScheme | undefined>(undefined, {
    alias: 'colorScheme',
  });

  private readonly _surface = injectSurface();

  /** Resolved color scheme: an explicit input wins, then the surface, then 'default'. */
  readonly colorScheme = computed<NxPlainButtonColorScheme>(
    () =>
      this.colorSchemeInput() ??
      (this._surface().surface === 'accent-attention' ? 'on-accent-attention' : 'default'),
  );

  /** Whether to show the critical/danger appearance */
  readonly critical = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /** Whether the button should be disabled. */
  readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /**
   * Whether the button should use the inverse color (for use on dark/colored
   * backgrounds). When not set, it follows the surface (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  /** Resolved inverse: an explicit input wins, then the surface the button sits on. */
  readonly inverse = computed(() => this.inverseInput() ?? this._surface().surface === 'attention');

  tabIndex = input<number | undefined, NumberInput>(undefined, { transform: tabIndexAttribute });
  /**
   * Use 'tabindex' to handle existing usages of `[tabindex]` bindings on button elements
   * @docs-private
   */
  _tabindexAttribute = input<number | undefined, NumberInput>(undefined, {
    transform: tabIndexAttribute,
    alias: 'tabindex',
  });

  /** Whether the button should be in a loading state. */
  loading = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  classNames = input<string | undefined>(undefined, { alias: 'nxPlainButton' });

  constructor() {
    this.setupHaltDisabledEvents();
    if (isDevMode()) {
      effect(() => {
        if (this.classNames()?.includes('danger')) {
          console.warn(
            'The danger property has been removed from the plain button component, Use critical instead',
          );
        }
      });
    }
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

export { NxPlainButtonComponent as NxAnchorPlainButtonComponent };
