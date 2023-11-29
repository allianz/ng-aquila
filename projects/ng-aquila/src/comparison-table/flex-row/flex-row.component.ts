import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';

/**
 *
 *Component that is only used internally for displaying a `nxComparisonTableRow`
 *(header, content and footer rows) in desktop and tablet view.
 * @docs-private
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

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly _table: NxComparisonTableBase,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor
            .monitor(this._elementRef, true)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
                if (this.row.type !== 'header' && origin === 'keyboard') {
                    this._table._scrollElementIntoView(this._elementRef);
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    get elementRef(): ElementRef {
        return this._elementRef;
    }
}
