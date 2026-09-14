import { NX_HEADLINE_CONTEXT, NxHeadlineContext } from '@allianz/ng-aquila/headline';
import { NX_PRICE_CONTEXT, NxPriceContext } from '@allianz/ng-aquila/price';
import { Directive, forwardRef, inject } from '@angular/core';

import { NxComparisonTableCell } from './cell/cell.component';

/**
 * The slots are elements rather than attributes on the consumer's own markup for two reasons:
 * a forgotten import of an element fails the build (NG8001), where a forgotten attribute
 * directive is invisible — projection matches the attribute either way, so the cell would still
 * render correctly while the imposed sizes silently never arrive. And the imposed sizes are
 * provided here rather than on the cell, so they stop at the slot: a consumer who skips the slots
 * and writes their own header markup keeps ownership of every `nxHeadline` and `nx-price` in it,
 * at the price of no longer following our design updates automatically.
 */
@Directive({ selector: 'nx-comparison-table-header-top', standalone: true })
export class NxComparisonTableHeaderTop {}

@Directive({ selector: 'nx-comparison-table-header-eyebrow', standalone: true })
export class NxComparisonTableHeaderEyebrow {}

@Directive({
  selector: 'nx-comparison-table-header-title',
  providers: [
    { provide: NX_HEADLINE_CONTEXT, useExisting: forwardRef(() => NxComparisonTableHeaderTitle) },
  ],
  standalone: true,
})
export class NxComparisonTableHeaderTitle implements NxHeadlineContext {
  readonly headlineSize = inject(NxComparisonTableCell).headlineSize;
}

@Directive({
  selector: 'nx-comparison-table-header-price',
  providers: [
    { provide: NX_PRICE_CONTEXT, useExisting: forwardRef(() => NxComparisonTableHeaderPrice) },
  ],
  standalone: true,
})
export class NxComparisonTableHeaderPrice implements NxPriceContext {
  readonly priceSize = inject(NxComparisonTableCell).priceSize;
}
