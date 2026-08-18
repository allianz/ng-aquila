import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  input,
} from '@angular/core';

export type NxIndicatorPosition = 'over-text' | 'over-icon' | 'after-text' | 'with-overlap';

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
    '[class.nx-indicator--over-text]': 'this._hasPosition("over-text")',
    '[class.nx-indicator--over-icon]': 'this._hasPosition("over-icon")',
    '[class.nx-indicator--after-text]': 'this._hasPosition("after-text")',
    '[class.nx-indicator--with-overlap]': 'this._hasPosition("with-overlap")',
    '[class.nx-indicator--icon]': 'this._hasIcon()',
    '[class.nx-indicator--padded]': 'this._getTextLength() > 1',
    '[class]': '_variantClasses()',
  },
  standalone: true,
})
export class NxIndicatorComponent {
  private readonly _elementRef = inject(ElementRef);

  /**
   * Sets the indicator positioning preset.
   * Should be one or more of 'over-text', 'over-icon', 'after-text', 'with-overlap'.
   */
  @Input() set position(value: string) {
    this._position = value.split(' ') as NxIndicatorPosition[];
  }
  get position(): string {
    return this._position.join(' ');
  }
  private _position: NxIndicatorPosition[] = [];

  /** Sets the indicator size. Optimized for A1. */
  readonly size = input<NxIndicatorSize>('m');

  /** Sets the indicator color type. Optimized for A1. */
  readonly type = input<NxIndicatorType>('critical');

  protected readonly _variantClasses = computed(
    () => `nx-indicator--${this.size()} nx-indicator--${this.type()}`,
  );

  _hasPosition(position: NxIndicatorPosition) {
    return this._position.includes(position);
  }

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
