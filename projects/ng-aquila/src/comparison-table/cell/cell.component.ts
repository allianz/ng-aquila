import { Component, ViewChild, TemplateRef, Input, Optional, Output, EventEmitter } from '@angular/core';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';
import { NxToggleSectionBase } from '../toggle-section/toggle-section-base';
import { NxComparisonTableRowType } from '../comparison-table-row-base';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;
@Component({
  selector: 'nx-comparison-table-cell',
  styleUrls: ['./cell.component.scss'],
  templateUrl: './cell.component.html',
})
export class NxComparisonTableCell {

  @ViewChild('content', { static: true }) _content: TemplateRef<any>;

  private _index: number;

  /** @docs-private */
  @Input()
  set index(newValue: number) {
    if (this._index !== newValue) {
      if (this._disabledColumn) {
        this._table._removeDisabledColumn(this._index);
        this._table._addDisabledColumn(newValue);
      }

      this._index = newValue;
      this.indexChange.emit(this._index);
    }
  }
  get index(): number {
    return this._index;
  }

  private _disabledColumn: boolean = false;

  /** Sets all cells below a header cell to be disabled (disabled column).
   *  Important: this property can be set only on header cells.
   */
  @Input()
  set disabledColumn(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this._type === 'header' && newValue !== this.disabledColumn) {
      this._disabledColumn = newValue;
      if (this._disabledColumn) {
        this._table._addDisabledColumn(this._index);
      } else {
        this._table._removeDisabledColumn(this._index);
      }
    }
  }
  get disabledColumn(): boolean {
    return this._disabledColumn;
  }

  /** @docs-private */
  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();

  private _id = `nx-comparison-table-cell-${nextId++}`;

  /** Sets the Id of the cell. */
  @Input()
  set id(value: string) {
    if (this._id !== value) {
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }

  private _type: NxComparisonTableRowType = 'content';

  /** Sets the type of the cell. Default: 'content'. */
  @Input()
  set type(value: NxComparisonTableRowType) {
    if (this._type !== value) {
      this._type = value;
    }
  }
  get type(): NxComparisonTableRowType {
    return this._type;
  }

  constructor(
    public _table: NxComparisonTableBase,
    private _row: NxComparisonTableRowBase,
    @Optional() private _toggleSection: NxToggleSectionBase
  ) {
  }

  _isSelected(): boolean {
    return (this.index !== undefined && this.index === this._table.selectedIndex) ? true : false;
  }

  _selectCell() {
    this._table.selectedIndex = this.index;
  }

  get _isCellDisabled(): boolean {
    return this._table._disabledIndexes.indexOf(this.index) !== -1;
  }

  _getHeaderIds(): string {
    // product header cell + (toggle-section) + description-cell
    const headerCell = this._table._getHeaderCells().find(cell => cell.index === this.index);
    let headers = `${headerCell.id}`;

    if (this._row.descriptionCell) {
      headers += ` ${this._row.descriptionCell.id}`;
    }

    if (this._toggleSection) {
      headers += ` ${this._toggleSection.toggleSectionHeader.id}`;
    }

    return headers;
  }

  static ngAcceptInputType_disabledColumn: BooleanInput;
}
