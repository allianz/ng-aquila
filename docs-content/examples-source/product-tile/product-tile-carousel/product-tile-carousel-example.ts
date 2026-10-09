import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component } from '@angular/core';

/**
 * @title Product Tile Carousel Example
 */
@Component({
  selector: 'product-tile-carousel-example',
  templateUrl: './product-tile-carousel-example.html',
  standalone: true,
  imports: [
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTileCarouselExampleComponent {
  // Sublines and feature lists of different lengths, to show the tiles sharing their rows: every
  // header, price and action lines up across the track however much content sits in the body.
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
      subline: 'Everything covered, all year round, wherever you drive',
      features: [
        'Third party liability',
        'Full coverage',
        '24/7 breakdown service',
        'Replacement car for 14 days',
      ],
    },
    {
      value: 'premium-plus',
      title: 'Premium Plus',
      price: 92,
      subline: 'Premium, and a second driver',
      features: [
        'Third party liability',
        'Full coverage',
        '24/7 breakdown service',
        'Replacement car for 30 days',
        'Second driver included',
        'No deductible',
      ],
    },
    {
      value: 'business',
      title: 'Business',
      price: 128,
      subline: 'For a fleet of up to ten',
      features: ['Third party liability', 'Full coverage', 'Fleet management'],
    },
  ];

  selectedProduct: string | null = null;
}
