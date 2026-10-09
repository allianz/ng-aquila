import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import {
  NX_PRICE_CONTEXT,
  NxPriceComponent,
  NxPriceContext,
  NxPriceSize,
} from '@allianz/ng-aquila/price';
import { NX_PRODUCT_TILE_IMPORTS } from '@allianz/ng-aquila/product-tile';
import { Component, Directive, forwardRef, input } from '@angular/core';

/**
 * The `nxProductTilePrice` slot imposes `2xl` through `NX_PRICE_CONTEXT`. Providing the token again
 * closer to the price replaces that: name a size to impose your own, or leave it unset to hand the
 * price's own `size` input back the decision.
 */
@Directive({
  selector: '[examplePriceSize]',
  standalone: true,
  providers: [
    {
      provide: NX_PRICE_CONTEXT,
      useExisting: forwardRef(() => ExamplePriceSizeDirective),
    },
  ],
})
export class ExamplePriceSizeDirective implements NxPriceContext {
  readonly priceSize = input<NxPriceSize | undefined>(undefined, {
    alias: 'examplePriceSize',
  });
}

/**
 * @title Overriding The Price Size In A Product Tile Example
 */
@Component({
  selector: 'product-tile-price-size-example',
  templateUrl: './product-tile-price-size-example.html',
  styleUrls: ['./product-tile-price-size-example.css'],
  standalone: true,
  imports: [
    ExamplePriceSizeDirective,
    NxListComponent,
    NxListIconComponent,
    NxPriceComponent,
    ...NX_PRODUCT_TILE_IMPORTS,
  ],
})
export class ProductTilePriceSizeExampleComponent {
  selectedProduct: string | null = 'comfort';
}
