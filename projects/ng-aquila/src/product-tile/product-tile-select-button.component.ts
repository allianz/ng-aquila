import { NxButtonBase } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';

import { NxProductTileButtonPosition, NxProductTileComponent } from './product-tile.component';
import { NxProductTileSelectButtonIntl } from './product-tile.intl';
import { provideSlotSurface } from './product-tile-content.directive';

/**
 * The tile's call to action, as a button that says what picking it does and shows that it is picked
 * - a check mark and the selected label.
 */
@Component({
  selector: 'button[nxProductTileSelectButton]',
  templateUrl: './product-tile-select-button.component.html',
  styleUrls: ['../button/button.scss', './product-tile-select-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconModule],
  providers: [provideSlotSurface('_actionSurface')],
  host: {
    class: 'nx-product-tile__select-button nx-button',
    '[attr.aria-pressed]': '_selected()',
    '[attr.aria-describedby]': '_tile?._headlineIds() ?? null',
    '(click)': '_tile?._toggleSelection()',
  },
})
export class NxProductTileSelectButton extends NxButtonBase {
  protected readonly _tile = inject(NxProductTileComponent, { optional: true });
  private readonly _intl = inject(NxProductTileSelectButtonIntl);

  /** Whether the button sits below the tile's content or in the header, next to the price. Default: `'bottom'`. */
  readonly position = input<NxProductTileButtonPosition>('bottom');

  /** Overrides the intl's label for the unpicked state. */
  readonly unselectedLabel = input<string>();

  /** Overrides the intl's label for the picked state. */
  readonly selectedLabel = input<string>();

  /**
   * The `nxButton` classNames of the unpicked button. Secondary by default: a filled button
   * competes with the surface a painted header already carries. Default: `'secondary'`.
   */
  readonly unselectedClassNames = input('secondary');

  /** The `nxButton` classNames of the picked button. Default: `'primary'`. */
  readonly selectedClassNames = input('primary');

  protected readonly _selected = computed(() => this._tile?.selected() ?? false);

  protected readonly _label = computed(() =>
    this._selected()
      ? (this.selectedLabel() ?? this._intl.selectedLabel())
      : (this.unselectedLabel() ?? this._intl.unselectedLabel()),
  );

  constructor() {
    super();

    // `classNames` is what NxButtonBase parses its appearance out of, and it is a plain setter
    // rather than an input here, so the selection has to be written into it.
    effect(() => {
      this.classNames = this._selected() ? this.selectedClassNames() : this.unselectedClassNames();
    });
  }
}
