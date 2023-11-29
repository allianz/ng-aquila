import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';

let nextId = 0;

@Component({
    selector: 'nx-comparison-table-popular-cell',
    styleUrls: ['./popular-cell.component.scss'],
    templateUrl: './popular-cell.component.html',
})
export class NxComparisonTablePopularCell {
    @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

    /** Sets the Id of the popular cell. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-comparison-table-popular-cell-${nextId++}`;

    /**
     * Sets the id of the column above which the popular cell should be displayed.
     *
     * Note: counting starts from 1. If set to 1 the popular cell will appear above the first header column of the table.
     */
    @Input() set forColumn(value: NumberInput) {
        const newValue = coerceNumberProperty(value);
        if (this._forColumn !== newValue) {
            this._forColumn = newValue;
        }
    }
    get forColumn(): number {
        return this._forColumn!;
    }
    private _forColumn?: number;

    constructor(
        readonly _table: NxComparisonTableBase,
        readonly _row: NxComparisonTableRowBase,
    ) {
        if (this._row.type !== 'header') {
            console.warn('A popular cell should be only in a header row.');
        }
    }
}
