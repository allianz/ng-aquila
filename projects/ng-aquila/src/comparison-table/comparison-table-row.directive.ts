import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ContentChild, ContentChildren, Directive, Input, OnDestroy, Optional, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableRowType } from './comparison-table.models';
import { NxComparisonTableRowBase } from './comparison-table-row-base';
import { NxComparisonTableRowGroupBase } from './comparison-table-row-group-base';
import { NxComparisonTableDescriptionCell } from './description-cell/description-cell.component';
import { NxComparisonTableIntersectionCell } from './intersection-cell/intersection-cell.component';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionBase } from './toggle-section/toggle-section-base';

@Directive({
    selector: '[nxComparisonTableRow]',
    providers: [
        { provide: NxTableContentElement, useExisting: NxComparisonTableRowDirective },
        { provide: NxComparisonTableRowBase, useExisting: NxComparisonTableRowDirective },
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

    readonly _requestCellClippingUpdate$ = new Subject<void>();

    /** Sets the type of the row. Default: 'content'. */
    @Input() set type(newValue: NxComparisonTableRowType) {
        if (newValue !== this._type) {
            this._type = newValue;
        }
    }
    get type(): NxComparisonTableRowType {
        return this._type;
    }
    private _type: NxComparisonTableRowType = 'content';

    @Input() set mayStick(newValue: BooleanInput) {
        if (newValue !== this._mayStick) {
            this._mayStick = coerceBooleanProperty(newValue);
            this._requestCellClippingUpdate$.next(undefined);
        }
    }
    get mayStick(): boolean {
        return this._type === 'header' && this._mayStick;
    }
    private _mayStick = true;

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Optional() private readonly _toggleSection: NxToggleSectionBase | null,
        @Optional() private readonly _rowGroup: NxComparisonTableRowGroupBase | null,
    ) {
        super();
    }

    ngAfterContentInit(): void {
        this._setCellIndexes();

        this.cells.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._setCellIndexes();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    _setCellIndexes(): void {
        this.cells.forEach((cell, index) => {
            cell.index = index;
        });
    }

    _isPartOfToggleSection(): boolean {
        return !!this._toggleSection;
    }

    _isPartOfRowGroup(): boolean {
        return !!this._rowGroup;
    }

    _isIntersectionRow(): boolean {
        return !!this.intersectionCell;
    }
}
