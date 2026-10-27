import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/**
 * @title Price with info icon
 */
@Component({
  selector: 'price-info-icon-example',
  templateUrl: './price-info-icon-example.html',
  styleUrls: ['./price-info-icon-example.css'],
  imports: [NxPriceComponent, NxInfoIconComponent, NxHeadlineComponent],
})
export class PriceInfoIconExampleComponent {
  value = 29.99;
  currency = 'USD';
}
