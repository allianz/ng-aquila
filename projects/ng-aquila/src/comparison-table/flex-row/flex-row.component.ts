import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTableBase } from '../comparison-table-base';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * @docs-private
 *
 * Component that is only used internally for displaying a `nxComparisonTableRow`
 * (header, content and footer rows) in desktop and tablet view.
 */
@Component({
    selector: 'nx-comparison-table-flex-row',
    templateUrl: './flex-row.component.html',
    styleUrls: ['./flex-row.component.scss'],
    host: {
        '[class.is-header-row]': 'row.type === "header"',
        '[class.is-sticky-row]': 'row.type === "header" && row.mayStick',
        '[class.is-footer-row]': 'row.type === "footer"',
        '[class.is-content-row]': 'row.type === "content"',
        '[class.has-intersection]': 'row.intersectionCell',
    },
})
export class NxComparisonTableFlexRow implements OnDestroy {
    @Input() row!: NxComparisonTableRowDirective;

    constructor(public _table: NxComparisonTableBase, private _elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
        this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
            if (this.row.type !== 'header' && origin === 'keyboard') {
                this._table._scrollElementIntoView(this._elementRef);
            }
        });
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    get elementRef(): ElementRef {
        return this._elementRef;
    }
}
