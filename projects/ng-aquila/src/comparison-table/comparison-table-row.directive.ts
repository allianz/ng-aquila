import { ContentChildren, QueryList, Directive, ContentChild, Input, Optional, AfterContentInit, OnDestroy } from '@angular/core';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableIntersectionCell } from './intersection-cell/intersection-cell.component';
import { NxComparisonTableDescriptionCell } from './description-cell/description-cell.component';
import { NxTableContentElement } from './table-content-element.directive';
import { NxComparisonTableRowBase } from './comparison-table-row-base';
import { NxToggleSectionBase } from './toggle-section/toggle-section-base';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NxComparisonTableRowGroupBase } from './comparison-table-row-group-base';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NxComparisonTableRowType } from './comparison-table.models';

@Directive({
  selector: '[nxComparisonTableRow]',
  providers: [
    { provide: NxTableContentElement, useExisting: NxComparisonTableRowDirective },
    { provide: NxComparisonTableRowBase, useExisting: NxComparisonTableRowDirective }
  ],
})
export class NxComparisonTableRowDirective extends NxComparisonTableRowBase implements AfterContentInit, OnDestroy, NxTableContentElement {

  /** @docs-private */
  @ContentChildren(NxComparisonTableCell) cells!: QueryList<NxComparisonTableCell>;

  /** @docs-private */
  @ContentChild(NxComparisonTableIntersectionCell, { static: false }) intersectionCell!: NxComparisonTableIntersectionCell;

  /** @docs-private */
  @ContentChild(NxComparisonTableDescriptionCell, { static: false }) descriptionCell!: NxComparisonTableDescriptionCell;

  /** @docs-private */
  @ContentChild(NxComparisonTablePopularCell, { static: false }) popularCell!: NxComparisonTablePopularCell;

  private _type: NxComparisonTableRowType = 'content';
  private _mayStick: boolean = true;

  private _destroyed = new Subject();

  /** Sets the type of the row. Default: 'content'. */
  @Input()
  set type(newValue: NxComparisonTableRowType) {
    if (newValue !== this._type) {
      this._type = newValue;
    }
  }
  get type(): NxComparisonTableRowType {
    return this._type;
  }

  @Input()
  set mayStick(newValue: boolean) {
    if (newValue !== this._mayStick) {
      this._mayStick = coerceBooleanProperty(newValue);
    }
  }
  get mayStick(): boolean {
    return this._type === 'header' && this._mayStick;
  }

  constructor(
    @Optional() private _toggleSection: NxToggleSectionBase,
    @Optional() private _rowGroup: NxComparisonTableRowGroupBase
  ) {
    super();
  }

  ngAfterContentInit() {
    this._setCellIndexes();

    this.cells.changes.pipe(
      takeUntil(this._destroyed)
    ).subscribe(() => {
      this._setCellIndexes();
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  _setCellIndexes(): void {
    this.cells.forEach((cell, index) => {
      cell.index = index;
    });
  }

  _isPartOfToggleSection(): boolean {
    return this._toggleSection ? true : false;
  }

  _isPartOfRowGroup(): boolean {
    return this._rowGroup ? true : false;
  }

  _isIntersectionRow(): boolean {
    return this.intersectionCell ? true : false;
  }

  static ngAcceptInputType_mayStick: BooleanInput;
}
