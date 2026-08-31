import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';

/** Positioning preset of an indicator. */
export type NxIndicatorPosition =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'over-text'
  | 'over-icon'
  | 'after-text'
  | 'with-overlap';

const NX_INDICATOR_LEGACY_POSITIONS: readonly NxIndicatorPosition[] = [
  'over-text',
  'over-icon',
  'after-text',
  'with-overlap',
];

const NX_INDICATOR_POSITIONS: readonly NxIndicatorPosition[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  ...NX_INDICATOR_LEGACY_POSITIONS,
];

/**
 * Size of an indicator. Optimized for A1.
 */
export type NxIndicatorSize =
  's' | 'm' | '800' | '1000' | '1200' | '1400' | '1600' | '1800' | '2000';

/** Color type of an indicator. Optimized for A1. */
export type NxIndicatorType = 'critical' | 'warning' | 'positive' | 'info';

/** Content that makes an indicator render as the icon variant. */
const ICON_CONTENT_SELECTOR = 'nx-icon, svg, img, picture, figure';

@Component({
  selector: 'nx-indicator',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./indicator.component.scss'],
  host: {
    '[class.nx-indicator]': 'true',
    '[class.nx-indicator--icon]': 'this._hasIcon()',
    '[class.nx-indicator--padded]': 'this._getTextLength() > 1',
    '[class]': '_variantClasses()',
  },
  standalone: true,
})
export class NxIndicatorComponent {
  private readonly _elementRef = inject(ElementRef);

  /**
   * Sets the indicator positioning preset. Accepts a space-separated list of
   * `NxIndicatorPosition` values. Unrecognized values are ignored
   *
   * The legacy positions `over-text`, `over-icon`, `after-text` and `with-overlap` are ignored
   * when combined with any other position.
   */
  @Input() set position(value: NxIndicatorPosition | (string & {})) {
    const tokens = value
      .split(/\s+/)
      .filter((token): token is NxIndicatorPosition =>
        NX_INDICATOR_POSITIONS.includes(token as NxIndicatorPosition),
      );
    // If mixed, ignore the legacy presets: their styles would override the newer position.
    const preferred = tokens.filter((token) => !NX_INDICATOR_LEGACY_POSITIONS.includes(token));
    this._position.set(preferred.length ? preferred : tokens);
  }
  get position(): string {
    return this._position().join(' ');
  }
  private readonly _position = signal<NxIndicatorPosition[]>([]);

  /**
   * Whether the indicator moves inwards to overlap its container.
   * Only affects the 'top-start', 'top-end', 'bottom-start' and 'bottom-end' positions.
   */
  readonly overlap = input(false, { transform: booleanAttribute });

  /** Sets the indicator size. Optimized for A1. */
  readonly size = input<NxIndicatorSize>('m');

  /** Sets the indicator color type. Optimized for A1. */
  readonly type = input<NxIndicatorType>('critical');

  protected readonly _variantClasses = computed(() =>
    [
      `nx-indicator--${this.size()}`,
      `nx-indicator--${this.type()}`,
      ...this._position().map((position) => `nx-indicator--${position}`),
      ...(this.overlap() ? ['nx-indicator--overlap'] : []),
    ].join(' '),
  );

  _getTextLength(): number {
    return this._elementRef.nativeElement.textContent?.trim().length ?? 0;
  }

  /**
   * An indicator holding an icon or image rather than text renders as the icon
   * variant.
   */
  _hasIcon(): boolean {
    return this._elementRef.nativeElement.querySelector(ICON_CONTENT_SELECTOR) !== null;
  }
}
