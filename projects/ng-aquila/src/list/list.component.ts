import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  input,
  signal,
} from '@angular/core';

/** Size of the list */
export type NxListSize = 'xsmall' | 'small' | 'normal';

/** A1 size of the list. */
export type NxListA1Size = 's' | 'm';

const DEFAULT_SIZE: NxListSize = 'normal';

/** Color of the list */
export type NxListType = 'primary' | 'secondary';

@Component({
  selector: 'ul[nxList], ol[nxList]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list.component.scss'],
  host: {
    '[class.nx-list]': 'true',
    '[class.nx-list--xsmall]': '_sizeVariant() === "xsmall"',
    '[class.nx-list--xsmall-condensed]': '_sizeVariant() === "xsmall" && condensed',
    '[class.nx-list--small]': '_sizeVariant() === "small"',
    '[class.nx-list--small-condensed]': '_sizeVariant() === "small" && condensed',
    '[class.nx-list--normal]': '_sizeVariant() === "normal"',
    '[class.nx-list--normal-condensed]': '_sizeVariant() === "normal" && condensed',
    '[class.nx-list--negative]': 'inverse()',
    '[class.nx-list--ordered-circle]': 'orderedCircle',
    '[class.nx-list--primary]': 'type() === "primary"',
    '[class.nx-list--secondary]': 'type() === "secondary"',
  },
  standalone: true,
})
export class NxListComponent {
  /**
   * Sets the visual appearance of the list. You can combine different values:
   *
   * xsmall | small | normal: The listed input values are expanded to the underlying BEM conform styles based
   * on modifiers. Defaults to normal. Use the `size` input for the A1 sizes.
   *
   * Negative: Display the list with a negative set of styling. Deprecated, use the `inverse` input instead.
   *
   * Ordered-circle: Display the list item numbers in a color filled circle.
   */
  @Input('nxList') set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }
    this._classNames = value;

    // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
    const [size = null] = this._classNames?.match(/xsmall|small|normal/) || [DEFAULT_SIZE];
    this._legacySize.set((size as NxListSize | null) ?? DEFAULT_SIZE);

    this._negative.set(!!this._classNames?.match(/negative/));
    this.orderedCircle = !!this._classNames?.match(/ordered-circle/);
  }

  get classNames(): string {
    return this._classNames;
  }
  private _classNames = '';

  /** Change the list mode to condensed  */
  @Input({ transform: booleanAttribute }) set condensed(value) {
    this._condensed = value;
  }
  get condensed(): boolean {
    return this._condensed;
  }
  _condensed: boolean = false;

  readonly type = input<NxListType>('primary');

  /**
   * Sets the size of the list. When set it takes precedence over a size given
   * in the `nxList` modifier string.
   */
  readonly size = input<NxListA1Size | undefined>(undefined);

  private readonly _legacySize = signal<NxListSize>(DEFAULT_SIZE);

  protected readonly _sizeVariant = computed<NxListSize>(() => {
    switch (this.size()) {
      case 's':
        return 'small';
      case 'm':
        return 'normal';
      default:
        return this._legacySize();
    }
  });

  /** Whether the deprecated `negative` modifier was given in the `nxList` string. */
  private readonly _negative = signal(false);

  /**
   * Whether the list should use inverse (light-on-dark) colors. Replaces the
   * deprecated `negative` modifier. When not set, it follows the surface the
   * list is placed on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  private readonly _surface = injectSurface();

  /**
   * Whether the inverse (formerly "negative") set of styles is applied.
   *
   * Resolves to `true` when either the `inverse` input or the legacy `negative`
   * modifier is set. Only `inverse` falls back to the surface.
   */
  readonly inverse = computed(() => {
    const { surface } = this._surface();
    return (
      (this.inverseInput() ?? (surface === 'attention' || surface === 'accent-attention')) ||
      this._negative()
    );
  });

  /** @docs-private */
  orderedCircle = false;
}
