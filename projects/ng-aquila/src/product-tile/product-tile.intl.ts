import { Injectable, signal } from '@angular/core';

/** Labels of the product tile carousel's controls. */
@Injectable({ providedIn: 'root' })
export class NxProductTileCarouselIntl {
  readonly previousLabel = signal('Previous products');
  readonly nextLabel = signal('Next products');
}

/**
 * Labels of every `nxProductTileSelectButton`, so that a group of tiles reads the same without
 * repeating the labels on each one. Provide it again on a component of your own to change the
 * labels for the tiles beneath it rather than for the whole application.
 */
@Injectable({ providedIn: 'root' })
export class NxProductTileSelectButtonIntl {
  /** Shown while the tile is not picked. Default: 'Select'. */
  readonly unselectedLabel = signal('Select');

  /** Shown while the tile is picked. Default: 'Selected'. */
  readonly selectedLabel = signal('Selected');
}
