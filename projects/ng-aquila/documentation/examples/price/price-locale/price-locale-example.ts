import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

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
