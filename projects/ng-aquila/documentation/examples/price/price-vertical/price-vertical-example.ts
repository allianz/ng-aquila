import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/**
 * @title Vertical price
 */
@Component({
  selector: 'price-vertical-example',
  templateUrl: './price-vertical-example.html',
  styleUrls: ['./price-vertical-example.css'],
  imports: [NxPriceComponent],
})
export class PriceVerticalExampleComponent {
  value = 99.99;
  currency = 'USD';
}
