import { Directive, QueryList } from '@angular/core';
import { NxComparisonTableDescriptionCell } from './description-cell/description-cell.component';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { NxComparisonTableRowType } from './comparison-table.models';

/** @docs-private */
@Directive()
export abstract class NxComparisonTableRowBase {
  cells!: QueryList<NxComparisonTableCell>;
  descriptionCell!: NxComparisonTableDescriptionCell;
  popularCell?: NxComparisonTablePopularCell;
  abstract type: NxComparisonTableRowType;
  abstract mayStick: boolean;
  abstract _isPartOfToggleSection(): boolean;
  abstract _isPartOfRowGroup(): boolean;
  abstract _isIntersectionRow(): boolean;
}
