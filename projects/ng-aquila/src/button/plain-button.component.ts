import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  Input,
  input,
  isDevMode,
  NgZone,
  numberAttribute,
  Renderer2,
} from '@angular/core';

/** Please note: small is only for meant for the One Allianz Design */
export type NxPlainButtonSize = 'medium' | 'small';
/** Please note: secondary is only for meant for the One Allianz Design */
export type NxPlainButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'button[nxPlainButton], a[nxPlainButton]',
  templateUrl: './plain-button.component.html',
  styleUrls: ['plain-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxPlainButton'],
  host: {
    class: 'nx-plain-button',
    '[class.nx-plain-button--danger]': 'critical',
    '[class.nx-plain-button--secondary]': 'variant() === "secondary"',
    '[class.nx-plain-button--small]': 'size() === "small"',
    '[class.nx-button--loading]': 'loading()',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': '_ariaDisabled',
    '[attr.tabindex]': '_tabIndex',
  },
  providers: [{ provide: NxTriggerButton, useExisting: NxPlainButtonComponent }],
  standalone: true,
  imports: [NxSpinnerComponent],
})
export class NxPlainButtonComponent implements NxTriggerButton, AfterViewInit {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);
  private readonly _destroyRef = inject(DestroyRef);

  protected _isAnchor = this._elementRef.nativeElement.tagName === 'A';
  protected get _ariaDisabled() {
    return (this._isAnchor && this.disabled) || this.loading() ? true : null;
  }
  protected get _tabIndex() {
    if (this._isAnchor && this.disabled) {
      return -1;
    }
    return this.tabIndex() ?? this._tabindexAttribute() ?? undefined;
  }

  /** The plain button size. Please only use it for the One Allianz Design. */
  readonly size = input<NxPlainButtonSize>('medium');

  /** The plain button variant. Please only use it for the One Allianz Design. */
  readonly variant = input<NxPlainButtonVariant>('primary');

  /** Whether to show the critical/danger appearance */
  @Input() set critical(value: BooleanInput) {
    this._critical = coerceBooleanProperty(value);
  }
  get critical() {
    return this._critical;
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

  readonly tabIndex = input<number, unknown>(undefined, { transform: tabIndexAttribute });

  /**
   * Use 'tabindex' to handle existing usages of `[tabindex]` bindings on button elements
   * @docs-private
   */
  readonly _tabindexAttribute = input<number, unknown>(undefined, {
    alias: 'tabindex',
    transform: tabIndexAttribute,
  });

  /** Whether the button should be in a loading state. */
  loading = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  private _classNames = '';

  set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }
    this._classNames = value;

    this._cdr.markForCheck();
  }

  get classNames(): string {
    return this._classNames;
  }

  constructor() {
    this.setupHaltDisabledEvents();
  }

  ngAfterViewInit(): void {
    this.setupFocusMonitor();

    if (isDevMode()) {
      if (this._classNames?.includes('danger')) {
        console.warn(
          'The danger property has been removed from the plain button component, Use critical instead',
        );
      }
    }
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

export { NxPlainButtonComponent as NxAnchorPlainButtonComponent };
