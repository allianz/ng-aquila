import {
  NX_INDICATOR_CONTEXT,
  NxIndicatorContext,
  NxIndicatorSize,
} from '@allianz/ng-aquila/indicator';
import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  input,
  OnDestroy,
  signal,
} from '@angular/core';

/** Size of an avatar. */
export type NxAvatarSize =
  'xsmall' | 'small' | 'small-medium' | 'medium' | 'large' | 'xlarge' | 's' | 'm' | 'l' | 'xl';
export type NxAvatarAccentColor =
  'yellow' | 'orange' | 'red' | 'purple' | 'teal' | 'aqua' | 'blue' | 'green' | 'gray' | 'default';
/** Prominence of an avatar's accent color. */
export type NxAvatarProminence = 'subtle' | 'attention';

/** Indicator size that keeps a projected indicator proportional to each avatar size. */
const NX_AVATAR_INDICATOR_SIZES: Readonly<Record<NxAvatarSize, NxIndicatorSize>> = {
  xsmall: '800',
  small: '800',
  s: '800',
  'small-medium': '1200',
  medium: '1200',
  m: '1200',
  large: '1600',
  l: '1600',
  xlarge: '2000',
  xl: '2000',
} as const;

@Component({
  selector: '[nxAvatar]',
  providers: [{ provide: NX_INDICATOR_CONTEXT, useExisting: forwardRef(() => NxAvatarComponent) }],
  template: `<div class="nx-avatar__content-wrapper">
      <ng-content></ng-content>
    </div>
    <ng-content select="[nxAvatarIndicator]"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./avatar.scss'],
  host: {
    '[class.nx-avatar--xsmall]': 'size === "xsmall"',
    '[class.nx-avatar--small]': 'size === "small" || size === "s"',
    '[class.nx-avatar--small-medium]': 'size === "small-medium"',
    '[class.nx-avatar--medium]': 'size === "medium" || size === "m"',
    '[class.nx-avatar--large]': 'size === "large" || size === "l"',
    '[class.nx-avatar--xlarge]': 'size === "xlarge" || size === "xl"',
    '[class.is-button]': '_isButton()',
    '[class.nx-avatar--disabled]': 'disabled()',
    '[class.is-attention]': 'prominence() === "attention"',
    '[class.nx-avatar--inverse]': 'inverse()',
    '[class]': '_avatarClass()',
  },
  standalone: true,
})
export class NxAvatarComponent implements OnDestroy, AfterViewInit, NxIndicatorContext {
  private readonly _size = signal<NxAvatarSize>('medium');

  /** Sets the size of the avatar. Default: 'medium'. */
  @Input() set size(size: NxAvatarSize) {
    this._size.set(size);
  }
  get size(): NxAvatarSize {
    return this._size();
  }

  /** Size a projected indicator renders at, derived from the avatar's own size. */
  readonly indicatorSize = computed(() => NX_AVATAR_INDICATOR_SIZES[this._size()]);

  disabled = input(false, { transform: booleanAttribute });
  /**
   * Whether the avatar should use the inverse style for dark backgrounds. When not
   * set, it follows the surface the avatar is placed on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  private readonly _surface = injectSurface();

  /** Resolved inverse: an explicit input wins, then the surface the component sits on. */
  readonly inverse = computed(() => this.inverseInput() ?? this._surface().surface === 'attention');

  protected _isButton = signal(false);
  readonly accentColor = input<NxAvatarAccentColor>('default');
  readonly prominence = input<NxAvatarProminence>('subtle');
  protected readonly _avatarClass = computed(() => {
    if (this.accentColor() === 'default') {
      return '';
    }
    return `nx-avatar--accent-${this.prominence()}-${this.accentColor()}`;
  });

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}
  ngAfterViewInit(): void {
    const nativeEl = this._elementRef.nativeElement;
    this._isButton.set(nativeEl.tagName === 'BUTTON');
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
@Directive({
  selector: 'button[nxAvatar]',
  host: {},
  standalone: true,
})
export class NxAvatarButtonDirective {
  constructor(public nxAvatar: NxAvatarComponent) {}
}

/** Marks an element as the avatar's status indicator, projected into the avatar's corner slot. */
@Directive({
  selector: '[nxAvatarIndicator]',
  host: {
    class: 'nx-avatar__indicator',
  },
  standalone: true,
})
export class NxAvatarIndicatorDirective {}
