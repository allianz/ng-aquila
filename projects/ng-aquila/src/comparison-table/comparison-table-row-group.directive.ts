import { Directive, Input, QueryList, ContentChildren, Optional, EventEmitter, Output, Inject } from '@angular/core';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxTableContentElement } from './table-content-element.directive';
import { NxComparisonTableRowGroupBase } from './comparison-table-row-group-base';
import { NumberInput, coerceNumberProperty, coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { NxToggleSectionBase } from './toggle-section/toggle-section-base';
import { ComparisonTableDefaultOptions, COMPARISON_TABLE_DEFAULT_OPTIONS } from './comparison-table.models';

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

    private _labelCollapsed: string = 'More services';

    /**
     * Sets the label of the expandable area that is shown when the row group is collapsed.
     */
    @Input()
    set labelCollapsed(newValue: string) {
        if (newValue !== this._labelCollapsed) {
            this._labelCollapsed = newValue;
        }
    }
    get labelCollapsed(): string {
        return this._labelCollapsed;
    }

    private _labelExpanded: string = 'Less services';

    /** Sets the label of the expandable area that is shown when the row group is expanded. */
    @Input()
    set labelExpanded(newValue: string) {
        if (newValue !== this._labelExpanded) {
            this._labelExpanded = newValue;
        }
    }
    get labelExpanded(): string {
        return this._labelExpanded;
    }

    private _visibleRows: number = 5;

    /** Sets the number of rows that are visible when loading the component. Default: 5. */
    @Input()
    set visibleRows(value: number) {
        const newValue = coerceNumberProperty(value);
        if (newValue !== this._visibleRows) {
            this._visibleRows = newValue;
        }
    }
    get visibleRows(): number {
        return this._visibleRows;
    }

    private _isExpanded: boolean = false;

    /** Sets the expanded state of the row group */
    @Input()
    set isExpanded(value: boolean) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._isExpanded) {
            this._isExpanded = newValue;
        }
    }

    get isExpanded(): boolean {
        return this._isExpanded;
    }

    private _useFullRowForExpandableArea: boolean | undefined;

    /**
     * **Expert Option**
     *
     * Sets if the expandable area uses the full width of the row or leaves out the first column. Default: false.
     */
    @Input()
    set useFullRowForExpandableArea(value: boolean) {
        this._useFullRowForExpandableArea = coerceBooleanProperty(value);
    }
    get useFullRowForExpandableArea(): boolean {
        if (this._useFullRowForExpandableArea !== undefined) {
            return this._useFullRowForExpandableArea;
        }
        if (this._defaultOptions && this._defaultOptions.useFullRowForExpandableArea !== undefined) {
            return this._defaultOptions.useFullRowForExpandableArea;
        }
        return false;
    }

    /** An event emitted every time the expanded state of the group changes */
    @Output() isExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Optional() private _toggleSection: NxToggleSectionBase, @Optional() @Inject(COMPARISON_TABLE_DEFAULT_OPTIONS) private _defaultOptions: ComparisonTableDefaultOptions) {
        super();
    }

    _isPartOfToggleSection(): boolean {
        return this._toggleSection ? true : false;
    }

    _handleIsExpandedChange(value: boolean) {
        this.isExpanded = value;
        this.isExpandedChange.emit(this.isExpanded);
    }

    static ngAcceptInputType_visibleRows: NumberInput;
    static ngAcceptInputType_useFullRowForExpandableArea: BooleanInput;
    static ngAcceptInputType_isExpanded: BooleanInput;
}
