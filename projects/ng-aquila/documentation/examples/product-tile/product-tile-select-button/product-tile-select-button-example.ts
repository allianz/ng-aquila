import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile Select Button Example
 */
@Component({
  selector: 'product-tile-select-button-example',
  templateUrl: './product-tile-select-button-example.html',
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileSelectButtonExampleComponent {
  selectedProduct: string | null = null;
}
