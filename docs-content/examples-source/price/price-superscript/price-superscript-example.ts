import { Component } from '@angular/core';
import { NxPriceComponent, NxPriceSize } from '@allianz/ng-aquila/price';

/**
 * @title Superscript formatting example
 */
@Component({
  selector: 'price-superscript-example',
  templateUrl: './price-superscript-example.html',
  styleUrls: ['./price-superscript-example.css'],
  imports: [NxPriceComponent],
})
export class PriceSuperscriptExampleComponent {
  readonly value = 2559.49;
  size: NxPriceSize = '3xl';
}
