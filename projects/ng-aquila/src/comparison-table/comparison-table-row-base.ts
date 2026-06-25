import { Directive, Signal } from '@angular/core';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableRowType } from './comparison-table.models';
import { NxComparisonTableDescriptionCell } from './description-cell/description-cell.component';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';

/** @docs-private */
@Directive({ standalone: true })
export abstract class NxComparisonTableRowBase {
  abstract readonly cells: Signal<readonly NxComparisonTableCell[]>;
  abstract readonly descriptionCell: Signal<NxComparisonTableDescriptionCell | undefined>;
  abstract readonly popularCell: Signal<NxComparisonTablePopularCell | undefined>;
  abstract type: NxComparisonTableRowType;
  abstract mayStick: boolean;
  abstract _isPartOfToggleSection(): boolean;
  abstract _isPartOfRowGroup(): boolean;
  abstract _isIntersectionRow(): boolean;
}
