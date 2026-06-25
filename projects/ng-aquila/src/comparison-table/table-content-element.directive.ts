import { Directive } from '@angular/core';

export type TableContentElementKind = 'row' | 'toggleSection' | 'rowGroup';

/**
 * This is a base class for `NxToggleSectionDirective` and `NxComparisonTableRowDirective`.
 * @docs-private
 */
@Directive({ standalone: true })
export abstract class NxTableContentElement {
  abstract readonly kind: TableContentElementKind;
}
