import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Basic Product Tile Example
 */
@Component({
  selector: 'product-tile-basic-example',
  templateUrl: './product-tile-basic-example.html',
  styleUrls: ['./product-tile-basic-example.css'],
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPlainButtonComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileBasicExampleComponent {}
