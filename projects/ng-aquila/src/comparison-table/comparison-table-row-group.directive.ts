import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ContentChildren, Directive, EventEmitter, Inject, Input, Optional, Output, QueryList } from '@angular/core';

import { COMPARISON_TABLE_DEFAULT_OPTIONS, ComparisonTableDefaultOptions } from './comparison-table.models';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableRowGroupBase } from './comparison-table-row-group-base';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionBase } from './toggle-section/toggle-section-base';

@Directive({
    selector: '[nxComparisonTableRowGroup]',
    providers: [
        { provide: NxTableContentElement, useExisting: NxComparisonTableRowGroupDirective },
        { provide: NxComparisonTableRowGroupBase, useExisting: NxComparisonTableRowGroupDirective },
    ],
})
export class NxComparisonTableRowGroupDirective extends NxComparisonTableRowGroupBase implements NxTableContentElement {
    /** @docs-private */
    @ContentChildren(NxComparisonTableRowDirective) rows!: QueryList<NxComparisonTableRowDirective>;

    /**
     * Sets the label of the expandable area that is shown when the row group is collapsed.
     */
    @Input() set labelCollapsed(newValue: string) {
        if (newValue !== this._labelCollapsed) {
            this._labelCollapsed = newValue;
        }
    }
    get labelCollapsed(): string {
        return this._labelCollapsed;
    }
    private _labelCollapsed = 'More services';

    /** Sets the label of the expandable area that is shown when the row group is expanded. */
    @Input() set labelExpanded(newValue: string) {
        if (newValue !== this._labelExpanded) {
            this._labelExpanded = newValue;
        }
    }
    get labelExpanded(): string {
        return this._labelExpanded;
    }
    private _labelExpanded = 'Less services';

    /** Sets the number of rows that are visible when loading the component. Default: 5. */
    @Input() set visibleRows(value: NumberInput) {
        const newValue = coerceNumberProperty(value);
        if (newValue !== this._visibleRows) {
            this._visibleRows = newValue;
        }
    }
    get visibleRows(): number {
        return this._visibleRows;
    }
    private _visibleRows = 5;

    /** Sets the expanded state of the row group */
    @Input() set isExpanded(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._isExpanded) {
            this._isExpanded = newValue;
        }
    }
    get isExpanded(): boolean {
        return this._isExpanded;
    }
    private _isExpanded = false;

    /**
     * **Expert Option**.
     *
     * Sets if the expandable area uses the full width of the row or leaves out the first column.
     *
     * Default: `false`.
     */
    @Input() set useFullRowForExpandableArea(value: BooleanInput) {
        this._useFullRowForExpandableArea = coerceBooleanProperty(value);
    }
    get useFullRowForExpandableArea(): boolean {
        if (this._useFullRowForExpandableArea !== undefined) {
            return this._useFullRowForExpandableArea;
        }
        if (this._defaultOptions?.useFullRowForExpandableArea !== undefined) {
            return this._defaultOptions.useFullRowForExpandableArea;
        }
        return false;
    }
    private _useFullRowForExpandableArea?: boolean;

    /** An event emitted every time the expanded state of the group changes */
    @Output() readonly isExpandedChange = new EventEmitter<boolean>();

    constructor(
        @Optional() private readonly _toggleSection: NxToggleSectionBase | null,
        @Optional() @Inject(COMPARISON_TABLE_DEFAULT_OPTIONS) private readonly _defaultOptions: ComparisonTableDefaultOptions | null,
    ) {
        super();
    }

    _isPartOfToggleSection(): boolean {
        return !!this._toggleSection;
    }

    _handleIsExpandedChange(value: boolean) {
        this.isExpanded = value;
        this.isExpandedChange.emit(this.isExpanded);
    }
}
