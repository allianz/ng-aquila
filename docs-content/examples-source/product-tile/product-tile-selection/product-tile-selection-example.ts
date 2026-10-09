import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Selectable Product Tile Group Example
 */
@Component({
  selector: 'product-tile-selection-example',
  templateUrl: './product-tile-selection-example.html',
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileSelectionExampleComponent {
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
    {
      value: 'business',
      title: 'Business',
      price: 128,
      subline: 'For a fleet of up to ten',
      features: ['Third party liability', 'Full coverage', 'Fleet management'],
    },
    {
      value: 'business-plus',
      title: 'Business Plus',
      price: 184,
      subline: 'For a fleet of any size',
      features: [
        'Third party liability',
        'Full coverage',
        'Fleet management',
        'Named account manager',
      ],
    },
  ];

  // More tiles than fit, with one picked out of view: the track opens on it rather than at its start.
  selectedProduct: string | null = 'business';
}
