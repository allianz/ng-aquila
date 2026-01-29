import { Component } from '@angular/core';
import { NxPriceComponent } from '@allianz/ng-aquila/price';

/**
 * @title Basic price example
 */
@Component({
  selector: 'price-basic-example',
  templateUrl: './price-basic-example.html',
  styleUrls: ['./price-basic-example.css'],
  imports: [NxPriceComponent],
})
export class PriceBasicExampleComponent {
  value = 99.99;
  currency = 'USD';
}
