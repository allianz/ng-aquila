import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { NxBodyTextComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';

/**
 * @title Product Tile With Rich Body Content Example
 */
@Component({
  selector: 'product-tile-body-content-example',
  templateUrl: './product-tile-body-content-example.html',
  styleUrls: ['./product-tile-body-content-example.css'],
  standalone: true,
  imports: [
    NxBodyTextComponent,
    NxLinkComponent,
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileBodyContentExampleComponent {
  selectedProduct: string | null = null;
}
