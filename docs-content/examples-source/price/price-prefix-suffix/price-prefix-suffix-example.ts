import { Component } from '@angular/core';
import { NxPriceComponent } from '@allianz/ng-aquila/price';

/**
 * @title Price with prefix and suffix
 */
@Component({
  selector: 'price-prefix-suffix-example',
  templateUrl: './price-prefix-suffix-example.html',
  styleUrls: ['./price-prefix-suffix-example.css'],
  imports: [NxPriceComponent],
})
export class PricePrefixSuffixExampleComponent {
  value = 29.99;
  currency = 'USD';
}
