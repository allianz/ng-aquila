import {
  NX_PRICE_CONTEXT,
  NxPriceComponent,
  type NxPriceContext,
  type NxPriceSize,
} from '@allianz/ng-aquila/price';
import { Component, input, signal } from '@angular/core';

/**
 * @title Imposing a size via NX_PRICE_CONTEXT
 */

/** Wrapper that owns the size of any `nx-price` rendered inside it, e.g. for a card grid. */
@Component({
  selector: 'price-context-card-example',
  template: `
    <div class="example-card">
      <ng-content />
    </div>
  `,
  styleUrls: ['./price-context-example.css'],
  providers: [
    {
      provide: NX_PRICE_CONTEXT,
      useExisting: PriceContextCardExampleComponent,
    },
  ],
})
export class PriceContextCardExampleComponent implements NxPriceContext {
  readonly priceSize = input<NxPriceSize>('2xl');
}

@Component({
  selector: 'price-context-example',
  templateUrl: './price-context-example.html',
  styleUrls: ['./price-context-example.css'],
  imports: [NxPriceComponent, PriceContextCardExampleComponent],
})
export class PriceContextExampleComponent {
  readonly cardSize = signal<NxPriceSize>('2xl');
  readonly sizes: NxPriceSize[] = ['m', 'l', 'xl', '2xl', '3xl'];
}
