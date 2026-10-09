import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile Group Labelled By A Headline Example
 */
@Component({
  selector: 'product-tile-labelled-by-example',
  templateUrl: './product-tile-labelled-by-example.html',
  standalone: true,
  imports: [
    NxHeadlineComponent,
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileLabelledByExampleComponent {
  readonly products = [
    {
      value: 'basic',
      title: 'Basic',
      price: 24,
      subline: 'Third party only',
      features: ['Third party liability'],
    },
    {
      value: 'comfort',
      title: 'Comfort',
      price: 42,
      subline: 'Everyday cover for your car',
      features: ['Third party liability', 'Partial coverage'],
    },
    {
      value: 'premium',
      title: 'Premium',
      price: 68,
      subline: 'Everything covered, all year',
      features: [
        'Third party liability',
        'Full coverage',
        '24/7 breakdown service',
      ],
    },
  ];

  selectedProduct: string | null = null;
}
