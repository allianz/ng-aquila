import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/**
 * @title Price with inverse style
 */
@Component({
  selector: 'price-inverse-example',
  templateUrl: './price-inverse-example.html',
  styleUrls: ['./price-inverse-example.css'],
  imports: [NxPriceComponent],
})
export class PriceInverseExampleComponent {
  value = 99.99;
  currency = 'USD';
}
