import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import {
  NX_PRODUCT_TILE_IMPORTS,
  NxProductTileColorScheme,
} from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile Color Schemes Example
 */
@Component({
  selector: 'product-tile-color-schemes-example',
  templateUrl: './product-tile-color-schemes-example.html',
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileColorSchemesExampleComponent {
  readonly colorSchemes: NxProductTileColorScheme[] = [
    'attention',
    'plain',
    'emphasis',
    'accent-attention',
  ];
}
