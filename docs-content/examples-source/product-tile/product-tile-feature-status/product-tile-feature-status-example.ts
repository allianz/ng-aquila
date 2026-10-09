import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { NxBodyTextComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';

/**
 * @title Product Tile With Feature Status Example
 */
@Component({
  selector: 'product-tile-feature-status-example',
  templateUrl: './product-tile-feature-status-example.html',
  styleUrls: ['./product-tile-feature-status-example.css'],
  standalone: true,
  imports: [
    NxBodyTextComponent,
    NxIconComponent,
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileFeatureStatusExampleComponent {
  readonly features = [
    'Third party liability',
    'Partial coverage',
    'Full coverage',
    '24/7 breakdown service',
  ];

  readonly products = [
    {
      value: 'basic',
      title: 'Basic',
      price: 24,
      included: ['Third party liability'],
    },
    {
      value: 'comfort',
      title: 'Comfort',
      price: 42,
      included: ['Third party liability', 'Partial coverage'],
    },
    { value: 'premium', title: 'Premium', price: 68, included: this.features },
  ];

  selectedProduct: string | null = null;
}
