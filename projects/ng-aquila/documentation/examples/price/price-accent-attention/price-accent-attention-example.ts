import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/**
 * @title Price with on-accent-attention color scheme
 */
@Component({
  selector: 'price-accent-attention-example',
  templateUrl: './price-accent-attention-example.html',
  styleUrls: ['./price-accent-attention-example.css'],
  imports: [NxPriceComponent, NxHeadlineComponent],
})
export class PriceAccentAttentionExampleComponent {
  value = 42;
  currency = 'USD';
}
