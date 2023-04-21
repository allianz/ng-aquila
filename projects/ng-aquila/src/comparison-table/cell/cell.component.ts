import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Optional, Output, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableRowType } from '../comparison-table.models';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';
import { NxToggleSectionBase } from '../toggle-section/toggle-section-base';

let nextId = 0;

@Component({
    selector: 'nx-comparison-table-cell',
    styleUrls: ['./cell.component.scss'],
    templateUrl: './cell.component.html',
})
export class NxComparisonTableCell {
    @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

    /** @docs-private */
    @Input() set index(newValue: number) {
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
    private _index!: number;

    /**
     * Sets all cells below a header cell to be disabled (disabled column).
     *
     * **Important**: this property can be set only on header cells.
     */
    @Input() set disabledColumn(value: BooleanInput) {
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
    private _disabledColumn = false;

    /** @docs-private */
    @Output() readonly indexChange = new EventEmitter<number>();

    /** Sets the Id of the cell. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-comparison-table-cell-${nextId++}`;

    /** Sets the type of the cell. Default: 'content'. */
    @Input() set type(value: NxComparisonTableRowType) {
        if (this._type !== value) {
            this._type = value;
        }
    }
    get type(): NxComparisonTableRowType {
        return this._type;
    }
    private _type: NxComparisonTableRowType = 'content';

    get _isCellDisabled(): boolean {
        return this._table._disabledIndexes.includes(this.index);
    }

    constructor(
        readonly _table: NxComparisonTableBase,
        private readonly _row: NxComparisonTableRowBase,
        @Optional() private readonly _toggleSection: NxToggleSectionBase | null,
    ) {}

    _isSelected(): boolean {
        return this.index !== undefined && this.index === this._table.selectedIndex;
    }

    _isCellHidden(): boolean {
        return Array.isArray(this._table._hiddenIndexes) && this._table._hiddenIndexes.includes(this.index);
    }

    _selectCell() {
        this._table.selectedIndex = this.index;
    }

    _getHeaderIds(): string {
        // product header cell + (toggle-section) + description-cell
        const headerCell = this._table._getHeaderCells().find((cell: NxComparisonTableCell) => cell.index === this.index);
        let headers = headerCell ? `${headerCell.id}` : '';

        if (this._row.descriptionCell) {
            headers += ` ${this._row.descriptionCell.id}`;
        }

        if (this._toggleSection) {
            headers += ` ${this._toggleSection.toggleSectionHeader.id}`;
        }

        return headers;
    }

    _isFirst() {
        return this.index === 0;
    }

    _isLast() {
        return this.index + 1 === this._table._infoColumnCount();
    }
}
