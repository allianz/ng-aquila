import { Directive } from '@angular/core';

/** @docs-private */
@Directive({ standalone: true })
export abstract class NxComparisonTableRowGroupBase {
    abstract _isPartOfToggleSection(): boolean;
}
