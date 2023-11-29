import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';

let nextId = 0;

@Component({
    selector: 'nx-comparison-table-description-cell',
    templateUrl: './description-cell.component.html',
})
export class NxComparisonTableDescriptionCell {
    @ViewChild('content', { static: true }) _content!: TemplateRef<any>;
    @ViewChild('mobileCell') _mobileCell!: ElementRef;

    /** Sets the Id of the description cell. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-comparison-table-description-cell-${nextId++}`;

    constructor(
        readonly _table: NxComparisonTableBase,
        readonly _row: NxComparisonTableRowBase,
    ) {
        if (this._row.type === 'header' || this._row.type === 'footer') {
            console.warn('`nxComparisonTableRow` should not contain a `nx-comparison-table-description-cell` for type === "header" or type === "footer".');
        }
    }

    _getMobileClipPathInset(): string {
        if (this._mobileCell) {
            const cellRect = this._mobileCell.nativeElement.getBoundingClientRect();
            return this._table._getMobileClipPathInset(cellRect);
        }
        return '0';
    }
}
