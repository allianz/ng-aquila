import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile Promotion And Button Position Example
 */
@Component({
  selector: 'product-tile-promotion-example',
  templateUrl: './product-tile-promotion-example.html',
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTilePromotionExampleComponent {}
