import { NxPriceSize } from '@allianz/ng-aquila/price';
import {
  NxRadioIndicatorColorScheme,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import {
  NX_DEFAULT_SURFACE_ACCENT_COLOR,
  NxResolvedSurface,
  NxSurface,
  NxSurfaceAccentColor,
  NxSurfaceContext,
  NxSurfaceType,
} from '@allianz/ng-aquila/surface';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { NxProductTileCarouselItem } from './product-tile-carousel-item';
import {
  NxProductTileEyebrowDirective,
  NxProductTileHeaderContentDirective,
  NxProductTilePriceDirective,
  NxProductTileSecondaryActionDirective,
  NxProductTileSublineDirective,
} from './product-tile-content.directive';
import { NxProductTileGroupComponent } from './product-tile-group.component';
import { NxProductTileSelectButton } from './product-tile-select-button.component';

/**
 * The surface the tile's header is painted with. Named after the surfaces in `nxSurface` - except for
 * `plain`, which is the `default` surface - so that the header's content (price, buttons, icons)
 * adapts to it on its own.
 */
export type NxProductTileColorScheme = 'plain' | Exclude<NxSurfaceType, 'default'>;

/** Whether the primary action sits inside the header or below the tile's content. */
export type NxProductTileButtonPosition = 'top' | 'bottom';

/** The price size the header imposes on any projected `nx-price`. */
const HEADER_PRICE_SIZE: NxPriceSize = '2xl';

const DEFAULT_SURFACE: NxResolvedSurface = { surface: 'default' };

function resolveSurface(
  surface: NxSurfaceType,
  accentColor: NxSurfaceAccentColor | undefined,
): NxResolvedSurface {
  return surface === 'accent-attention'
    ? { surface, accentColor: accentColor ?? NX_DEFAULT_SURFACE_ACCENT_COLOR }
    : { surface };
}

@Component({
  selector: 'nx-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSurface, NxRadioIndicatorComponent],
  host: {
    '[class.nx-product-tile]': 'true',
    '[attr.data-color-scheme]': 'colorScheme()',
    '[class.button-position-top]': "_buttonPosition() === 'top'",
    '[class.has-promotion]': '!!promotion()',
    '[class.has-header-content]': '!!_projectedHeaderContent()',
    '[class.is-selected]': 'selected()',
    '[class.has-error]': '_errorState()',
  },
})
export class NxProductTileComponent implements NxProductTileCarouselItem {
  /** Unique id, used to tie the selection control to the tile's title. */
  protected readonly _id = inject(IdGenerationService).nextId('nx-product-tile');

  readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** The header's surface. Default: `'attention'`. */
  readonly colorScheme = input<NxProductTileColorScheme>('attention');

  /** The accent hue. Only takes effect with the `accent-attention` color scheme. */
  readonly accentColor = input<NxSurfaceAccentColor | undefined>(undefined);

  /** Text for the promotional bar above the header. */
  readonly promotion = input<string | null>(null);

  /**
   * The name the carousel's tab bar gives this tile. The bar only appears once every tile in the
   * carousel carries one - the tabs stand for the tiles, so a bar missing some of them would point
   * at the wrong ones.
   */
  readonly carouselLabel = input<string | null>(null);

  /** The value this tile contributes to its group's selection. */
  readonly value = input<any>(null);

  /** Emits this tile's `value` when the tile is picked. Clicking an already selected tile, or one without a `value`, emits nothing. */
  readonly selectionChange = output<any>();

  protected readonly _projectedHeaderContent = contentChild(NxProductTileHeaderContentDirective);
  protected readonly _projectedEyebrow = contentChild(NxProductTileEyebrowDirective);
  protected readonly _projectedSubline = contentChild(NxProductTileSublineDirective);
  protected readonly _projectedPrice = contentChild(NxProductTilePriceDirective);
  protected readonly _projectedSelectButton = contentChild(NxProductTileSelectButton);
  protected readonly _projectedSecondaryAction = contentChild(
    NxProductTileSecondaryActionDirective,
  );

  /**
   * The header owns how prices read inside it, so that every tile in a group presents its price the
   * same way regardless of what the consumer passed to `nx-price`. Published to the price slot,
   * which is what hands it to the `nx-price` it marks.
   */
  readonly _priceSize = signal<NxPriceSize>(HEADER_PRICE_SIZE);

  protected readonly _group = inject(NxProductTileGroupComponent);

  private readonly _input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  protected readonly _hasAction = computed(() => !!this._projectedSelectButton());

  protected readonly _buttonPosition = computed(
    () => this._projectedSelectButton()?.position() ?? 'bottom',
  );

  /** Whether this tile is part of its group's current value. */
  readonly selected = computed(() => {
    const value = this.value();
    // A tile without a value would otherwise match the group's initial `null` - every one of them.
    return value != null && this._group.value() === value;
  });

  protected readonly _errorState = computed(() => this._group._errorState());

  protected readonly _ariaDescribedBy = computed(() =>
    this._errorState() ? this._group._errorIds() : null,
  );

  /**
   * A custom header has no title/price slots to name the control, so its container stands in for
   * them. Otherwise the control is named by the title and, where there is one, the price - the two
   * together read out the same thing the header shows. The select button is described by the same.
   */
  readonly _headlineIds = computed(() => {
    if (this._projectedHeaderContent()) {
      return `${this._id}-header`;
    }
    return this._projectedPrice() ? `${this._id}-title ${this._id}-price` : `${this._id}-title`;
  });

  protected readonly _surface = computed<NxSurfaceType>(() => {
    const colorScheme = this.colorScheme();
    return colorScheme === 'plain' ? 'default' : colorScheme;
  });

  /** The surface the primary action sits on - the header's only when the action is inside it. */
  protected readonly _actionSurfaceType = computed<NxSurfaceType>(() =>
    this._buttonPosition() === 'top' ? this._surface() : 'default',
  );

  /**
   * The indicator scheme the header calls for. `attention` goes through `inverse` instead - the
   * scheme blocks come later in the indicator's stylesheet at equal specificity, so a scheme set
   * alongside `inverse` would discard it. `on-selection` is not among these: its selected ring is
   * the on-color of the *attention* selection surface, while a selected tile fills with the subtle
   * one, so the ring would vanish into the tile.
   */
  protected readonly _indicatorColorScheme = computed<NxRadioIndicatorColorScheme>(() =>
    this.colorScheme() === 'accent-attention' ? 'on-accent-attention' : 'default',
  );

  /**
   * The surfaces the slots sit on. A projected slot's element injector reaches this component but
   * never the `[nxSurface]` inside its template, so the slot directives republish them.
   */
  readonly _headerSurface: NxSurfaceContext = {
    resolved: computed(() => resolveSurface(this._surface(), this.accentColor())),
  };

  readonly _actionSurface: NxSurfaceContext = {
    resolved: computed(() =>
      this._buttonPosition() === 'top' ? this._headerSurface.resolved() : DEFAULT_SURFACE,
    ),
  };

  _toggleSelection(): void {
    if (this.value() == null || this.selected()) {
      return;
    }
    this.selectionChange.emit(this.value());
  }

  /**
   * Screen readers only announce a state change on the focused element, so a click beside the radio
   * moves focus onto it the way a `<label>` would - unless it landed on a control of its own.
   */
  protected _onHeaderClick(event: MouseEvent): void {
    this._toggleSelection();
    const input = this._input().nativeElement;
    const target = event.target as HTMLElement;
    if (target !== input && !target.closest('a, button, input, select, textarea, [tabindex]')) {
      input.focus();
    }
  }
}
