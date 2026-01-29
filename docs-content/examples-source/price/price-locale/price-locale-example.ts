import { Component } from '@angular/core';
import { NxPriceComponent } from '@allianz/ng-aquila/price';

/**
 * @title Price with different locales
 */
@Component({
  selector: 'price-locale-example',
  templateUrl: './price-locale-example.html',
  styleUrls: ['./price-locale-example.css'],
  imports: [NxPriceComponent],
})
export class PriceLocaleExampleComponent {
  value = 1234.56;
}
