import { ContentChild, ContentChildren, Directive, Input, QueryList } from '@angular/core';

import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxTableContentElement } from '../table-content-element.directive';
import { NxToggleSectionBase } from './toggle-section-base';
import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';

@Directive({
    selector: '[nxComparisonTableToggleSection]',
    providers: [
        { provide: NxTableContentElement, useExisting: NxToggleSectionDirective },
        { provide: NxToggleSectionBase, useExisting: NxToggleSectionDirective },
    ],
})
export class NxToggleSectionDirective extends NxToggleSectionBase implements NxTableContentElement {
    /** @docs-private */
    @ContentChild(NxToggleSectionHeaderComponent, { static: false }) toggleSectionHeader!: NxToggleSectionHeaderComponent;

    /** @docs-private */
    @ContentChildren(NxTableContentElement) rows!: QueryList<NxTableContentElement>;

    /** Whether the toggle section is expanded. Default: true. */
    @Input() set isExpanded(value: boolean) {
        if (this._isExpanded !== value) {
            this._isExpanded = value;
        }
    }
    get isExpanded(): boolean {
        return this._isExpanded;
    }
    private _isExpanded = true;

    _numberOfRows(): number {
        return this.rows.filter(row => row instanceof NxComparisonTableRowDirective).length;
    }
}
