import { NxProductTileComponent } from './product-tile.component';
import {
  NxProductTileEyebrowDirective,
  NxProductTileHeaderContentDirective,
  NxProductTilePriceDirective,
  NxProductTileSecondaryActionDirective,
  NxProductTileSublineDirective,
  NxProductTileTitleDirective,
} from './product-tile-content.directive';
import { NxProductTileGroupComponent } from './product-tile-group.component';
import { NxProductTileSelectButton } from './product-tile-select-button.component';

/** Everything a template needs to lay out product tiles, for a standalone component's `imports`. */
export const NX_PRODUCT_TILE_IMPORTS = [
  NxProductTileGroupComponent,
  NxProductTileComponent,
  NxProductTileHeaderContentDirective,
  NxProductTileEyebrowDirective,
  NxProductTileTitleDirective,
  NxProductTileSublineDirective,
  NxProductTilePriceDirective,
  NxProductTileSecondaryActionDirective,
  NxProductTileSelectButton,
] as const;
