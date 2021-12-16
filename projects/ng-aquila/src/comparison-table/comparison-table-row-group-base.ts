import { Directive } from '@angular/core';

/** @docs-private */
@Directive()
export abstract class NxComparisonTableRowGroupBase {
    abstract _isPartOfToggleSection(): boolean;
}
