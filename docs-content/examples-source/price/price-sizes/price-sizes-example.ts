import { NxPriceComponent, type NxPriceSize } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/**
 * @title Price size variants
 */
@Component({
  selector: 'price-sizes-example',
  templateUrl: './price-sizes-example.html',
  styleUrls: ['./price-sizes-example.css'],
  imports: [NxPriceComponent],
})
export class PriceSizesExampleComponent {
  value = 99.99;
  currency = 'USD';
  prefix = 'from';
  suffix = 'Monthly';
  sizes: NxPriceSize[] = [
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
  ];
}
