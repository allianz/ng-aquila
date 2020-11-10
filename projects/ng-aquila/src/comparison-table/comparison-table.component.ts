import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
} from '@angular/core';
import { NxViewportService } from '@aposin/ng-aquila/utils';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableBase } from './comparison-table-base';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionAnimations } from './toggle-section/toggle-section-animations';
import { NxToggleSectionDirective } from './toggle-section/toggle-section.directive';

@Component({
  selector: 'nx-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss'],
  animations: [NxToggleSectionAnimations.bodyExpansion],
  providers: [
    { provide: NxComparisonTableBase, useExisting: NxComparisonTableComponent }
  ]
})
export class NxComparisonTableComponent extends NxComparisonTableBase implements OnInit, OnDestroy {

  // Attention: this contains all rows and toggle sections, AND all rows contained in a toggle section!
  /** @docs-private */
  @ContentChildren(NxTableContentElement, { descendants: true }) elements: QueryList<NxTableContentElement>;

  private _selectedIndex: number;

  /** Sets which info column is selected. */
  @Input()
  set selectedIndex(value: number) {
    const newValue = coerceNumberProperty(value);
    if (this._selectedIndex !== newValue) {
      this._selectedIndex = newValue;
      this.selectedIndexChange.emit(this._selectedIndex);
    }
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  /** An event that is is dispatched each time selected index of the table has changed. */
  @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _element: ElementRef,
    private _platform: Platform,
    @Optional() private _dir: Directionality,
    /**docs-private */
    viewportService: NxViewportService,
    protected _cdRef: ChangeDetectorRef
  ) {
    super(viewportService, _cdRef);
  }

  @HostBinding('attr.dir') get dir() {
    return (this._dir && this._dir.value) || 'ltr';
  }

  ngOnInit() {
    window.addEventListener('scroll', this._scrollHandler, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this._scrollHandler, true);
  }

  private _scrollHandler = (event): void => {
    // showing the background color on the placeholder cell is buggy on safari,
    // therefore this is disabled for safari.
    if ((this.viewType === 'desktop' || this.viewType === 'tablet') && !this._platform.SAFARI) {
      const flexRows = this._element.nativeElement.getElementsByTagName('nx-comparison-table-flex-row');

      // only if flexRows are defined
      if (flexRows.length > 1) {
        const headerTop = flexRows[0].getBoundingClientRect().top;
        const headerBottom = flexRows[0].getBoundingClientRect().bottom;
        const secondRowTop = flexRows[1].getBoundingClientRect().top;
        const lastRowBottom = flexRows[flexRows.length - 1].getBoundingClientRect().bottom;

        if (secondRowTop < headerBottom && lastRowBottom > headerTop) {
          this._stickyPlaceholder = true;
        } else {
          this._stickyPlaceholder = false;
        }
        this._cdRef.markForCheck();
      }
    } else if (this.viewType === 'mobile') {
      const descriptionRowCells = this._element.nativeElement
        .getElementsByClassName('nx-comparison-table__description-row')[0]
        .getElementsByTagName('th');

      // only if rows are defined
      if (descriptionRowCells.length > 1) {
        const firstCellRight = descriptionRowCells[0].getBoundingClientRect().right;
        const secondCellLeft = descriptionRowCells[1].getBoundingClientRect().left;

        if (firstCellRight > secondCellLeft) {
          this._stickyPlaceholder = true;
        } else {
          this._stickyPlaceholder = false;
        }
        this._cdRef.markForCheck();
      }
    }
  }

  /** Whether the element is a row. */
  _isRow(element: NxTableContentElement): element is NxComparisonTableRowDirective {
    return element instanceof NxComparisonTableRowDirective;
  }

  /** Whether the element is a toggle section. */
  _isToggleSection(element: NxTableContentElement): element is NxToggleSectionDirective {
    return element instanceof NxToggleSectionDirective;
  }

  /** Whether the element is a row group. */
  _isRowGroup(element: NxTableContentElement): element is NxComparisonTableRowGroupDirective {
    return element instanceof NxComparisonTableRowGroupDirective;
  }

  /** Whether row is the first item in a new block of rows or a section. */
  _isFirstInfoOfBlock(rowIndex: number): boolean {
    const elements = this.elements.toArray();

    // if first row after header
    let firstRowAfterHeader = 1;
    while (!this._isRow(elements[firstRowAfterHeader])) {
      firstRowAfterHeader++;
    }
    if (rowIndex === firstRowAfterHeader) {
      return true;
    }

    // if first row: false
    if (rowIndex === 0) {
      return false;
    }

    // if toggle section
    if (this._isToggleSection(elements[rowIndex])) {
      return true;
    }

    // if first row after a section
    if (this._isRow(elements[rowIndex])
      && elements[rowIndex - 1] instanceof NxComparisonTableRowDirective
      && (elements[rowIndex - 1] as NxComparisonTableRowDirective)._isPartOfToggleSection()) {

      return true;
    }

    // if last row and the last row is a footer row: true
    if (rowIndex === elements.length - 1
      && this._isRow(elements[rowIndex]
        && (elements[rowIndex] as NxComparisonTableRowDirective).type === 'footer')) {
      return true;
    }

    return false;
  }

  _getHeaderCells(): NxComparisonTableCell[] {
    const row = this.elements.find(element =>
      this._isRow(element) && (element as NxComparisonTableRowDirective).type === 'header'
    );
    return (row as NxComparisonTableRowDirective).cells.toArray();
  }

  _getPopularCell(): NxComparisonTablePopularCell {
    const row = this.elements.find(element =>
      this._isRow(element) && (element as NxComparisonTableRowDirective).type === 'header'
    );
    return (row as NxComparisonTableRowDirective).popularCell;
  }

  _getFooterCells(): NxComparisonTableCell[] {
    const row = this.elements.find(element =>
      this._isRow(element) && (element as NxComparisonTableRowDirective).type === 'footer'
    );

    return row ? (row as NxComparisonTableRowDirective).cells.toArray() : [];
  }

  _containsToggleSection(): boolean {
    return this.elements.filter(element => this._isToggleSection(element)).length > 0;
  }

  _infoColumnCount(): number {
    return this._getHeaderCells().length;
  }

  _getMobileColumnCount() {
    return !!this._getFooterCells().length ? this.elements.length - 1 : this.elements.length;
  }

  _isMobileRowDisabled(i: number) {
    return this._getHeaderCells ? this._getHeaderCells()[i].disabledColumn : false;
  }

  _addDisabledColumn(disabledColumn: number) {
    if (this._disabledIndexes.indexOf(disabledColumn) === -1) {
      this._disabledIndexes.push(disabledColumn);
    }
  }

  _removeDisabledColumn(enabledColumn: number) {
    const indexOfElement = this._disabledIndexes.indexOf(enabledColumn);
    if (indexOfElement !== -1) {
      this._disabledIndexes.splice(indexOfElement, 1);
    }
  }

  static ngAcceptInputType_selectedIndex: NumberInput;
}
