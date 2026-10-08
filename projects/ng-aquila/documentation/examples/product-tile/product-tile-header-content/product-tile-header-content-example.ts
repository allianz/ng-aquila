import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile With A Custom Header Example
 */
@Component({
  selector: 'product-tile-header-content-example',
  templateUrl: './product-tile-header-content-example.html',
  styleUrls: ['./product-tile-header-content-example.css'],
  standalone: true,
  imports: [
    NxEyebrowComponent,
    NxHeadlineComponent,
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileHeaderContentExampleComponent {
  selectedProduct: string | null = null;
}
